import { motion, useReducedMotion } from 'framer-motion';
import { CharReveal } from './Motion';
import type { ReactNode } from 'react';

export default function PageHead({
  number,
  module,
  title,
  lede,
  note,
  tags,
  children,
}: {
  number: string;
  module: string;
  title: string;
  lede: ReactNode;
  note?: ReactNode;
  tags?: string[];
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const enter = reduced ? 0 : 0.1;

  return (
    <header className="page-head wrap">
      <div className="page-head__top">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: enter }}
        >
          <i className="dot" />
          {module}
        </motion.span>
        <motion.div
          className="page-head__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: enter + 0.1 }}
        >
          <span className="tag">Chapter {number} / 22</span>
          {tags?.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="page-head__title">
        <motion.span
          className="page-head__num"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: enter + 0.15 }}
        >
          {number}
        </motion.span>
        <h1>
          <CharReveal text={title} delay={enter + 0.2} />
        </h1>
      </div>

      <div className="page-head__lede">
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: enter + 0.45 }}
        >
          {lede}
        </motion.p>
        <motion.div
          className="page-head__note"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: enter + 0.55 }}
        >
          {note}
        </motion.div>
      </div>

      {children}
    </header>
  );
}
