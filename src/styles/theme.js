export const theme = {
  colors: {
    background: '#0d0f12',
    surface: '#161a1f',
    border: '#262c34',
    text: '#e8ebef',
    textMuted: '#9aa4b0',
    accent: '#3ba0ff',
    success: '#3ecf8e',
    warning: '#f5a623',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  spacing: (n) => `${n * 4}px`,
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};
