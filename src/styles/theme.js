/**
 * Design tokens for the PC Builder UI.
 * Dark, near-black surface with a restrained violet accent. Sharp corners,
 * hairline borders, flat fills — no decorative glows or gradients.
 */
export const theme = {
  colors: {
    bg: '#06060A',
    surface: '#0B0A11',
    surfaceRaised: '#121019',

    text: '#EDEBF2',
    textMuted: '#9095A6',
    textDim: '#8B90A0',
    textFaint: '#6A6F7E',
    textGhost: '#565B6B',

    accent: '#B98CFF',
    accentBright: '#D3B8FF',
    accentDeep: '#9D6BFF',
    accentDeeper: '#6D28D9',

    ok: '#4ADE80',
    warn: '#E0A33E',
    warnText: '#C7AB78',

    onAccent: '#0A0812',

    border: 'rgba(255,255,255,0.07)',
    borderStrong: 'rgba(255,255,255,0.14)',
    borderAccent: 'rgba(157,107,255,0.45)',

    tintAccent: 'rgba(157,107,255,0.10)',
    tintAccentFaint: 'rgba(157,107,255,0.045)',
    tintOk: 'rgba(74,222,128,0.045)',
    tintWarn: 'rgba(224,163,62,0.06)',
  },

  fonts: {
    heading: 'var(--font-archivo), "Archivo", system-ui, sans-serif',
    body: 'var(--font-barlow), "Barlow", system-ui, sans-serif',
    mono: 'var(--font-plex-mono), "IBM Plex Mono", ui-monospace, monospace',
  },

  radius: '2px',
  maxWidth: '1200px',

  z: {
    header: 50,
    footerBar: 45,
    overlay: 90,
  },
};
