/**
 * Design tokens for the PC Builder UI.
 * "Liquid glass": a near-black ground with a faint ambient wash, every surface a
 * translucent frosted panel. Crisp hairline borders, tight radii, layered
 * transparency for depth. Monochrome — the only "accent" is a near-white used
 * sparingly. Motion is a single smooth ease-out curve so every hover feels the
 * same.
 */
export const theme = {
  colors: {
    bg: '#08080A',

    surface: '#141417',
    surfaceRaised: '#1C1C20',

    text: '#F3F3F6',
    textMuted: '#9E9EA6',
    textDim: '#88888F',
    textFaint: '#6C6C74',
    textGhost: '#4A4A52',

    accent: '#EDEDF2',
    accentBright: '#FFFFFF',
    accentDeep: '#C4C4CC',
    accentDeeper: '#8A8A92',

    ok: '#93B9A9',
    warn: '#C6A477',
    warnText: '#C9AE8E',

    onAccent: '#0A0A0C',

    border: 'rgba(255,255,255,0.12)',
    borderStrong: 'rgba(255,255,255,0.22)',
    borderAccent: 'rgba(255,255,255,0.46)',

    tintAccent: 'rgba(255,255,255,0.08)',
    tintAccentFaint: 'rgba(255,255,255,0.05)',
    tintOk: 'rgba(147,185,169,0.10)',
    tintWarn: 'rgba(198,164,119,0.11)',

    // Frosted glass. `glass` is the resting panel fill; hover/active lift it.
    // `glassChrome` is dimmer, for sticky bars and overlays.
    glass: 'rgba(255,255,255,0.055)',
    glassHover: 'rgba(255,255,255,0.10)',
    glassActive: 'rgba(255,255,255,0.15)',
    glassChrome: 'rgba(12,12,15,0.6)',
    glassBorder: 'rgba(255,255,255,0.16)',
    glassBorderStrong: 'rgba(255,255,255,0.32)',
    glassHighlight: 'rgba(255,255,255,0.12)',

    focusRing: 'rgba(255,255,255,0.28)',
  },

  fonts: {
    heading: 'var(--font-archivo), "Archivo", system-ui, sans-serif',
    body: 'var(--font-barlow), "Barlow", system-ui, sans-serif',
    mono: 'var(--font-plex-mono), "IBM Plex Mono", ui-monospace, monospace',
  },

  radius: '6px',
  radiusSmall: '3px',
  blur: 'blur(20px) saturate(180%)',
  blurHeavy: 'blur(30px) saturate(180%)',
  shadow: '0 1px 2px rgba(0,0,0,0.36), 0 8px 28px rgba(0,0,0,0.3)',
  shadowLift: '0 2px 6px rgba(0,0,0,0.4), 0 18px 44px rgba(0,0,0,0.42)',

  // One easing curve everywhere — a smooth, slightly weighted ease-out.
  motion: {
    ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
    fast: '130ms cubic-bezier(0.32, 0.72, 0, 1)',
    base: '200ms cubic-bezier(0.32, 0.72, 0, 1)',
    slow: '360ms cubic-bezier(0.32, 0.72, 0, 1)',
    spring: '440ms cubic-bezier(0.22, 1.15, 0.4, 1)',
  },

  maxWidth: '1200px',

  z: {
    header: 50,
    footerBar: 45,
    overlay: 90,
  },
};
