import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { chapterList, modules } from '../data/chapters';
import { useSettings } from '../lib/settings';
import { ArrowRight, Close, GitHub, Instagram, XSocial, YouTube } from './Icons';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const reduced = useReducedMotion();
  const { theme, trail, toggleTheme, toggleTrail } = useSettings();

  const current = chapterList.find((c) => c.slug === location.pathname);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav__bar">
          <Link to="/" className="brand" aria-label="Ishan Kishan archive — home">
            <span className="brand__mark">
              IK<em>.</em>
            </span>
            <span className="brand__by">by Arjun</span>
          </Link>

          <div className="nav__right">
            <span className="nav__index">
              {current ? `Chapter ${current.no} / 22` : 'Fan archive'}
            </span>
            <button
              type="button"
              className="menu-btn"
              ref={triggerRef}
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open the chapter index"
            >
              <span className="menu-btn__label">Index</span>
              <span className="menu-btn__lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={
              reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }
            }
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.85, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Chapter index"
          >
            <div className="menu__head">
              <Link to="/" className="brand" onClick={() => setOpen(false)}>
                <span className="brand__mark">
                  IK<em>.</em>
                </span>
                <span className="brand__by">by Arjun</span>
              </Link>
              <button
                type="button"
                className="menu__close"
                ref={closeRef}
                onClick={() => setOpen(false)}
              >
                Close
                <Close />
              </button>
            </div>

            <div className="menu__body">
              <nav className="menu__modules" aria-label="All chapters">
                {modules.map((module) => (
                  <div key={module.no}>
                    <span className="menu__module-title">
                      {module.no} — {module.name}
                    </span>
                    <ul>
                      {chapterList
                        .filter((chapter) => chapter.module === module.moduleNo)
                        .map((chapter, index) => (
                          <motion.li
                            key={chapter.slug}
                            initial={
                              reduced ? { opacity: 0 } : { opacity: 0, y: 18 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.16 + index * 0.025 + (module.moduleNo - 1) * 0.04,
                              ease: EASE,
                            }}
                          >
                            <Link
                              to={chapter.slug}
                              className="menu__link"
                              data-active={
                                location.pathname === chapter.slug ? 'true' : 'false'
                              }
                              aria-current={
                                location.pathname === chapter.slug ? 'page' : undefined
                              }
                              onClick={() => setOpen(false)}
                            >
                              <span>{chapter.no}</span>
                              <span>{chapter.navTitle}</span>
                              {!chapter.built && (
                                <span className="tag" style={{ marginLeft: 'auto' }}>
                                  Soon
                                </span>
                              )}
                            </Link>
                          </motion.li>
                        ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <aside className="menu__aside">
                <div>
                  <h3>Preferences</h3>
                  <div className="pref-row">
                    <span>Dark mode</span>
                    <button
                      type="button"
                      className="switch"
                      data-on={theme === 'dark'}
                      onClick={toggleTheme}
                      aria-pressed={theme === 'dark'}
                      aria-label="Toggle dark mode"
                    >
                      <i />
                    </button>
                  </div>
                  <div className="pref-row">
                    <span>Cursor trail</span>
                    <button
                      type="button"
                      className="switch"
                      data-on={trail}
                      onClick={toggleTrail}
                      aria-pressed={trail}
                      aria-label="Toggle cursor trail"
                    >
                      <i />
                    </button>
                  </div>
                </div>

                <div>
                  <h3>The archive</h3>
                  <p className="menu__note">
                    Twenty-two chapters on Ishan Kishan — story, data and image.
                    Made by a fan. Not affiliated with BCCI, the ICC or the player.
                  </p>
                </div>

                <div>
                  <h3>Elsewhere</h3>
                  <div className="menu__socials">
                    <a
                      className="icon-btn"
                      href="https://www.instagram.com/ishankishan23/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Ishan Kishan on Instagram"
                    >
                      <Instagram />
                    </a>
                    <a
                      className="icon-btn"
                      href="https://x.com/BCCI"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="BCCI on X"
                    >
                      <XSocial />
                    </a>
                    <a
                      className="icon-btn"
                      href="https://www.youtube.com/@BCCI"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="BCCI on YouTube"
                    >
                      <YouTube />
                    </a>
                    <a
                      className="icon-btn"
                      href="https://github.com/arjunbajla1-ops"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Arjun on GitHub"
                    >
                      <GitHub />
                    </a>
                  </div>
                </div>

                <Link to="/fan-zone" className="btn btn--ghost" onClick={() => setOpen(false)}>
                  Arjun’s fan zone
                  <ArrowRight />
                </Link>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
