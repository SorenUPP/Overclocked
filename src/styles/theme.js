/**
 * Design tokens for the PC Builder UI.
 * "Matte hardware modernism": a matte-black ground, flat opaque panels — no
 * blur, no frosted glass. Sharp near-0 corners, crisp high-contrast hairline
 * borders, and a single tasteful white glow reserved for primary actions and
 * active states (think ASUS ROG / Corsair / NZXT product pages, not iOS
 * glass). Monochrome — the only "accent" is a near-white used sparingly.
 * Motion is one precise, quick ease-out curve so every transition feels the
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

    border: 'rgba(255,255,255,0.14)',
    borderStrong: 'rgba(255,255,255,0.26)',
    borderAccent: 'rgba(255,255,255,0.5)',

    tintAccent: 'rgba(255,255,255,0.08)',
    tintAccentFaint: 'rgba(255,255,255,0.05)',
    tintOk: 'rgba(147,185,169,0.10)',
    tintWarn: 'rgba(198,164,119,0.11)',

    // Flat panel fills — a subtle white tint over the matte-black ground, no
    // blur. `glass` is the resting fill; hover/active brighten it slightly.
    // `glassChrome` is dimmer/near-opaque, for sticky bars and overlays.
    // (Kept the historical "glass" name for these tokens/helpers — the look
    // is matte now, but renaming ~20 files of consumers wasn't worth the
    // churn for a naming-only change.)
    glass: 'rgba(255,255,255,0.05)',
    glassHover: 'rgba(255,255,255,0.09)',
    glassActive: 'rgba(255,255,255,0.14)',
    glassChrome: 'rgba(10,10,12,0.94)',
    glassBorder: 'rgba(255,255,255,0.16)',
    glassBorderStrong: 'rgba(255,255,255,0.36)',

    focusRing: 'rgba(255,255,255,0.28)',
  },

  fonts: {
    heading: 'var(--font-archivo), "Archivo", system-ui, sans-serif',
    body: 'var(--font-barlow), "Barlow", system-ui, sans-serif',
    mono: 'var(--font-plex-mono), "IBM Plex Mono", ui-monospace, monospace',
  },

  radius: '2px',
  radiusSmall: '0px',

  // Contained, defined shadows — depth without a soft glassy spread.
  shadow: '0 1px 2px rgba(0,0,0,0.5), 0 6px 18px rgba(0,0,0,0.32)',
  shadowLift: '0 2px 4px rgba(0,0,0,0.55), 0 14px 30px rgba(0,0,0,0.4)',
  // A crisp white glow — reserved for primary actions and active states.
  glow: '0 0 0 1px rgba(255,255,255,0.1), 0 0 28px rgba(255,255,255,0.12)',

  // One easing curve everywhere — a quick, precise ease-out.
  motion: {
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fast: '120ms cubic-bezier(0.16, 1, 0.3, 1)',
    base: '190ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '340ms cubic-bezier(0.16, 1, 0.3, 1)',
  },

  maxWidth: '1200px',

  z: {
    header: 50,
    footerBar: 45,
    overlay: 90,
  },
};
