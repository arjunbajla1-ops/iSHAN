import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * A short, once-per-session intro: ball, line, mark. The archive never waits
 * on it — the page beneath is already painted.
 */
export default function Loader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem('ik-loaded') !== 'true';
  });

  useEffect(() => {
    if (!visible) return;
    const duration = reduced ? 250 : 700;
    const timer = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem('ik-loaded', 'true');
    }, duration);
    return () => window.clearTimeout(timer);
  }, [visible, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className="loader__inner">
            <div className="loader__stage">
              <span className="loader__ball" />
            </div>
            <span className="loader__line" />
            <span className="loader__mark">
              IK <span>|</span> by Arjun
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
