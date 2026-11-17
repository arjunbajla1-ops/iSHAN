import { useEffect, useRef } from 'react';
import { useSettings } from '../lib/settings';
import { BatIcon } from './Icons';

const SWING_MS = 480;

/**
 * Custom cricket bat cursor.
 * — one rAF loop, direct transform writes (no React re-render per frame)
 * — precise tracking with a whisper of easing, weighted trail behind it
 * — states: default / link / text / drag, plus a swing on click
 * — fully disabled for touch pointers and reduced-motion users
 */
export default function BatCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { trail } = useSettings();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const body = document.body;

    const trailEls = Array.from(
      root.querySelectorAll<HTMLElement>('.bat-cursor__trail'),
    );
    const trailPos = trailEls.map(() => ({ x: 0, y: 0 }));

    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
    };

    let raf = 0;
    let running = false;
    let swingTimer = 0;

    const frame = () => {
      pos.x += (pos.tx - pos.x) * 0.62;
      pos.y += (pos.ty - pos.y) * 0.62;
      root.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;

      trailPos.forEach((p, i) => {
        const factor = 0.24 - i * 0.045;
        p.x += (pos.x - p.x) * factor;
        p.y += (pos.y - p.y) * factor;
        trailEls[i].style.transform = `translate3d(${(p.x - pos.x).toFixed(2)}px, ${(p.y - pos.y).toFixed(2)}px, 0)`;
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      pos.x = pos.tx;
      pos.y = pos.ty;
      trailPos.forEach((p) => {
        p.x = pos.tx;
        p.y = pos.ty;
      });
      root.style.opacity = '0';
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const spawnBall = () => {
      const ball = document.createElement('span');
      ball.className = 'bat-cursor__ball';
      const angle = Math.random() * Math.PI * 2;
      const distance = 52 + Math.random() * 80;
      ball.style.setProperty('--bx', `${(Math.cos(angle) * distance).toFixed(1)}px`);
      ball.style.setProperty(
        '--by',
        `${(Math.sin(angle) * distance - 26).toFixed(1)}px`,
      );
      root.appendChild(ball);
      ball.addEventListener('animationend', () => ball.remove(), { once: true });
      window.setTimeout(() => ball.remove(), 1200);
    };

    const swing = () => {
      root.dataset.swing = 'true';
      window.clearTimeout(swingTimer);
      swingTimer = window.setTimeout(() => {
        delete root.dataset.swing;
      }, SWING_MS);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pos.tx = event.clientX;
      pos.ty = event.clientY;
      if (root.style.opacity !== '1') root.style.opacity = '1';
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target || !(target instanceof Element)) return;
      const text = target.closest(
        'input, textarea, select, [contenteditable="true"], [data-cursor="text"]',
      );
      const drag = target.closest('[data-cursor="drag"]');
      const link = target.closest(
        'a, button, [role="button"], label, summary, [data-cursor="link"]',
      );
      root.dataset.state = text ? 'text' : drag ? 'drag' : link ? 'link' : 'default';
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      swing();
      spawnBall();
    };

    const onLeave = () => {
      root.style.opacity = '0';
    };
    const onEnter = () => {
      root.style.opacity = '1';
    };

    const onSwingRequest = () => {
      swing();
      spawnBall();
    };

    const apply = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      body.classList.toggle('has-bat-cursor', enabled);
      root.hidden = !enabled;
      if (enabled) {
        start();
        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onOver, { passive: true });
        document.addEventListener('pointerdown', onDown, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        window.addEventListener('ik:swing', onSwingRequest);
      } else {
        stop();
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerover', onOver);
        document.removeEventListener('pointerdown', onDown);
        document.removeEventListener('mouseleave', onLeave);
        document.removeEventListener('mouseenter', onEnter);
        window.removeEventListener('ik:swing', onSwingRequest);
      }
    };

    apply();
    finePointer.addEventListener('change', apply);
    reducedMotion.addEventListener('change', apply);

    return () => {
      stop();
      window.clearTimeout(swingTimer);
      body.classList.remove('has-bat-cursor');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('ik:swing', onSwingRequest);
      finePointer.removeEventListener('change', apply);
      reducedMotion.removeEventListener('change', apply);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="bat-cursor"
      data-state="default"
      data-trail={trail ? 'on' : 'off'}
      aria-hidden="true"
    >
      <span className="bat-cursor__ring" />
      <span className="bat-cursor__trail" />
      <span className="bat-cursor__trail" />
      <span className="bat-cursor__trail" />
      <span className="bat-cursor__trail" />
      <span className="bat-cursor__bat">
        <span className="bat-cursor__bob">
          <BatIcon />
        </span>
      </span>
      <span className="bat-cursor__dot" />
    </div>
  );
}
