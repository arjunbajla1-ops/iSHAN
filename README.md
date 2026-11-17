# IK. — Ishan Kishan, a fan archive by Arjun

A 22-chapter, minimalist fan archive dedicated to Indian cricketer **Ishan Kishan**.
Paper-white editorial design, one accent colour, a custom cricket-bat cursor, and
motion that behaves like a printed book — slow, weighted, quiet.

> Fan-made. Not affiliated with BCCI, the ICC, or the player.

---

## Status

| Batch | Chapters | State |
| --- | --- | --- |
| 01 | Design system · shell · **Home (01)**, **Biography (02)**, **The 210 (06)** | **Live** |
| 02 | U-19, Team India, ODI Analytics, T20I Hub, Test Archive | Queued |
| 03 | IPL, Domestic, Scorecard Vault, Top 10, Wagon Wheel | Queued |
| 04 | Head-to-Head, Keeping, Records, Gallery | Queued |
| 05 | Off-Field, Video Zone, Wallpapers, Quotes, Fan Zone | Queued |

Every unbuilt route resolves to a designed chapter-placeholder that states its
real chapter number, module and neighbours — nothing 404s.

## Stack

- **React 19 + TypeScript + Vite 7**
- **Framer Motion 12** — page transitions, reveals, counters, chart draw
- **React Router 7**
- **@fontsource** — Bebas Neue, Archivo (variable), Inter (variable), Instrument Serif (self-hosted, no third-party font CDN)
- Hand-written CSS design tokens. No CSS framework, no component library.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run typecheck
```

## Design system

| Token | Value |
| --- | --- |
| Paper | `#FAFAF8` (dark: `#0E0E0E`) |
| Ink | `#1A1A1A` (dark: `#F2F2EF`) |
| Accent — India Blue | `#1E5EFF` |
| Muted | `#8A8A8A` |
| Rule | 1px `rgba(26,26,26,.10)` |
| Container | 1200px max, `clamp(20px,4.2vw,52px)` gutter |
| Section rhythm | `clamp(84px, 11vw, 148px)` |
| Easing | `cubic-bezier(.16,1,.3,1)` |
| Motion | 0.4s–0.8s, staggered 0.1s in grids |

Display type is Bebas Neue; section headings Archivo at weight 200; body Inter
300. Instrument Serif is reserved for pull-quotes.

## The cricket-bat cursor

`src/components/BatCursor.tsx`

- One `requestAnimationFrame` loop writing `translate3d` — no React re-render per frame.
- States via a `data-state` attribute: `default` (45° bob), `link` (tilt + 1.2× + accent ring), `text` (collapses to a dot over inputs), `drag` (horizontal).
- Click → 60° swing animation plus a ball that flies off and fades.
- Optional four-dot trail (toggle in the menu, persisted in `localStorage`).
- Auto-disabled for coarse pointers and `prefers-reduced-motion`, restoring the native cursor.
- `window` event `ik:swing` lets any button (e.g. back-to-top) trigger the swing.

## Motion

`src/components/Motion.tsx` — `Reveal`, `Stagger`/`StaggerItem`, `CharReveal`,
`Counter`, `ImageReveal` (clip-path curtain + scale), `StatBar`, `Marquee`.
All respect `prefers-reduced-motion`, all reveal once.

## Content accuracy

Career figures are checked against ESPNcricinfo and Wikipedia, current to
**1 November 2026**:

- Test 2 matches · 78 runs @ 78.00 · 1 fifty · 5 catches
- ODI 32 matches · 1,107 runs @ 42.57 · 2 hundreds · 7 fifties · HS 210
- T20I 69 matches · 2,016 runs @ 31.01 · 1 hundred · 14 fifties · HS 103
- First-class 67 matches · 4,302 runs @ 42.17 · 10 hundreds · HS 273

The 210 innings (Chattogram, 10 December 2022) is documented from the verified
milestone splits — 50 off 49, 100 off 85, 150 off 103, 200 off 126, out for 210
off 131 — with the scoring curve explicitly labelled a reconstruction. The
fastest-double-century record is presented as *held until 2026*, because Shubman
Gill and Harry Brook have since gone past 126 balls.

Photographs are gathered from public editorial sources for non-commercial fan
use; rights remain with their photographers and publishers.

## Structure

```
src/
  App.tsx               routes, page transitions, scroll progress, titles
  components/           BatCursor, Loader, Navbar, Footer, Motion, PageHead,
                        ProgressionChart, Icons
  data/chapters.ts      the 22-chapter registry that drives nav + routes
  data/content.ts       verified profile, timeline, knock data, records
  pages/                Home, Biography, The210, ChapterStub, NotFound
  styles/global.css     design tokens, layout, components, responsive
public/images/          three clean editorial frames (hero, nets, SRH)
```
