// Design tokens
export const COLORS = {
  primary: {
    background: '#1D1D1D',
    text: '#FFFFFF',
    hover: '#333333',
    active: '#187BF0',
    border: '#333333',
  },
  secondary: {
    text: '#909090',
    hover: '#777777',
    border: '#777777',
  },
  accent: '#187BF0',
} as const;

export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
} as const;

export const SIZES = {
  sidebar: {
    expanded: '20rem',   // 320px
    collapsed: '5rem',   // 80px
  },
  icon: {
    sm: '1rem',         // 16px
    md: '1.25rem',      // 20px
    lg: '1.5rem',       // 24px
  },
  button: {
    height: '2.5rem',   // 40px
  },
} as const;

export const TRANSITIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 400,
  },
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const TYPOGRAPHY = {
  fontFamily: 'Inter, system-ui, sans-serif',
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
  },
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
} as const;