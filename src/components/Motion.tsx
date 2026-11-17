import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Reveal — fades up as it enters the viewport                                */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  style,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stagger — container + children for grids                                   */
/* -------------------------------------------------------------------------- */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Stagger({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-6% 0px -6% 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div className={className} style={style} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* CharReveal — headline letters arrive one by one                            */
/* -------------------------------------------------------------------------- */

export function CharReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const chars = Array.from(text);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              paddingBottom: '0.02em',
              marginBottom: '-0.02em',
            }}
          >
            <motion.span
              style={{ display: 'inline-block', willChange: 'transform' }}
              initial={reduced ? { opacity: 0 } : { y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: reduced ? 0.2 : 0.95,
                delay: reduced ? 0 : delay + index * 0.035,
                ease: EASE,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Counter — counts up from zero when scrolled into view                      */
/* -------------------------------------------------------------------------- */

export function Counter({
  value,
  duration = 1.9,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value.toLocaleString('en-IN'));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        setDisplay(Math.round(latest).toLocaleString('en-IN'));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* ImageReveal — curtain wipe + slow scale                                    */
/* -------------------------------------------------------------------------- */

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  objectPosition,
  priority = false,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal-img ${className ?? ''}`}
      initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={
        reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }
      }
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      <motion.div
        className="reveal-img__inner"
        initial={reduced ? {} : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-6% 0px' }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={imgClassName}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* StatBar — a 2px line that draws itself                                     */
/* -------------------------------------------------------------------------- */

export function StatBar({
  value,
  label,
  amount,
  suffix,
  delay = 0,
}: {
  value: string;
  label: string;
  amount: number;
  suffix?: string;
  delay?: number;
}) {
  return (
    <div className="bar-row">
      <div className="bar-row__top">
        <span className="bar-row__label">{label}</span>
        <span className="bar-row__value num">
          {value}
          {suffix ? <em>{suffix}</em> : null}
        </span>
      </div>
      <div className="bar-row__track">
        <motion.i
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: Math.max(0.02, Math.min(1, amount)) }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, delay, ease: EASE }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Marquee — slow, infinite, minimal ticker                                   */
/* -------------------------------------------------------------------------- */

export function Marquee({
  items,
  seconds = 46,
  className = '',
  ariaLabel,
}: {
  items: string[];
  seconds?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const reduced = useReducedMotion();
  const group = (
    <div className="marquee__group" aria-hidden="true">
      {items.map((item, index) => (
        <span className="marquee__item" key={`${item}-${index}`}>
          {item}
          <i />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${className}`}
      role="marquee"
      aria-label={ariaLabel ?? items.join(' ')}
    >
      <div
        className="marquee__track"
        style={
          reduced
            ? { animation: 'none', transform: 'none' }
            : { animationDuration: `${seconds}s` }
        }
      >
        {group}
        {group}
      </div>
    </div>
  );
}
