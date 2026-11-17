import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export const ArrowRight = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
    <path d="M4 12h15M13 5.5 19.5 12 13 18.5" strokeLinecap="square" />
  </svg>
);

export const ArrowUp = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
    <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" strokeLinecap="square" />
  </svg>
);

export const ArrowDown = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
    <path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" strokeLinecap="square" />
  </svg>
);

export const Close = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
    <path d="M5 5l14 14M19 5 5 19" strokeLinecap="square" />
  </svg>
);

export const Info = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.2" strokeLinecap="round" />
    <circle cx="12" cy="7.9" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const BatIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 34" fill="none" aria-hidden {...props}>
    <rect x="9.5" y="1" width="5" height="12" rx="2.4" fill="currentColor" />
    <path
      d="M7.2 12.4h9.6c1.3 0 2.3 1 2.3 2.3v14.6c0 2.1-1.7 3.7-3.7 3.7h-6.8c-2 0-3.7-1.6-3.7-3.7V14.7c0-1.3 1-2.3 2.3-2.3Z"
      fill="currentColor"
    />
    <circle cx="12" cy="23.4" r="2.1" fill="var(--accent)" />
    <circle cx="12" cy="23.4" r="4" fill="var(--accent)" opacity="0.16" />
  </svg>
);

export const XSocial = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.6 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.7 6.1H1.7l7.5-8.5L1.3 3h6.6l4.5 5.6L17.6 3Zm-1.1 16.1h1.8L7.6 4.8H5.7l10.8 14.3Z" />
  </svg>
);

export const Instagram = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const YouTube = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden {...props}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const GitHub = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.3-.4-1.2.1-2.4 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.2.2 2.1.1 2.4.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />
  </svg>
);
