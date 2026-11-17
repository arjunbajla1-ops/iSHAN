import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve('dist');
const PORT = Number(process.env.PORT || 5173);
const HOST = '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const COMPRESSIBLE = /^(text\/|application\/json|image\/svg|font\/woff)/;
const cache = new Map();

function compress(file, body) {
  const hit = cache.get(file);
  if (hit && hit.length === body.length) return hit;
  const entry = {
    length: body.length,
    br: zlib.brotliCompressSync(body, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: body.length,
      },
    }),
    gzip: zlib.gzipSync(body, { level: 9 }),
  };
  cache.set(file, entry);
  return entry;
}

function contentType(file) {
  return TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

async function respond(req, res, file, status = 200, info = null) {
  const body = await readFile(file);
  const type = contentType(file);
  const stats = info || (await stat(file));
  const etag = `"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
  const immutable =
    file.includes(`${path.sep}assets${path.sep}`) ||
    file.includes(`${path.sep}fonts${path.sep}`) ||
    file.includes(`${path.sep}images${path.sep}`);

  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader(
    'Cache-Control',
    immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('ETag', etag);
  res.setHeader('Vary', 'Accept-Encoding');

  if (req.headers['if-none-match'] === etag) {
    res.statusCode = 304;
    res.end();
    return;
  }

  if (COMPRESSIBLE.test(type) && body.length > 1024 && req.method !== 'HEAD') {
    const accept = String(req.headers['accept-encoding'] || '');
    const entry = compress(file, body);
    if (/\bbr\b/.test(accept)) {
      res.setHeader('Content-Encoding', 'br');
      res.setHeader('Vary', 'Accept-Encoding');
      res.setHeader('Content-Length', entry.br.length);
      res.end(entry.br);
      return;
    }
    if (/\bgzip\b/.test(accept)) {
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Vary', 'Accept-Encoding');
      res.setHeader('Content-Length', entry.gzip.length);
      res.end(entry.gzip);
      return;
    }
  }

  res.setHeader('Content-Length', body.length);
  res.end(req.method === 'HEAD' ? undefined : body);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';

    let file = path.join(ROOT, path.normalize(pathname));
    if (!file.startsWith(ROOT)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    try {
      const info = await stat(file);
      if (info.isDirectory()) file = path.join(file, 'index.html');
      await respond(req, res, file, 200, info);
      return;
    } catch {
      // SPA fallback for client-side routes
      if (path.extname(pathname)) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Not found');
        return;
      }
      await respond(req, res, path.join(ROOT, 'index.html'));
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Server error');
    console.error(error);
  }
});

// warm the compression cache for the big initial payloads
async function warm() {
  const files = ['dist/index.html'];
  const assets = await import('node:fs/promises').then((fs) => fs.readdir(path.join(ROOT, 'assets')).catch(() => []));
  for (const asset of assets) files.push(path.join('dist/assets', asset));
  for (const file of files) {
    try {
      const body = await readFile(file);
      if (COMPRESSIBLE.test(contentType(file)) && body.length > 1024) compress(file, body);
    } catch {
      /* ignore */
    }
  }
}

await warm();
server.listen(PORT, HOST, () => {
  console.log(`IK. archive served from dist on http://${HOST}:${PORT}`);
});
