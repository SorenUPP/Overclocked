'use client';

import styled, { css } from 'styled-components';

/** Max-width page gutter. 16px minimum side padding at every width. */
export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding-inline: 24px;

  @media (max-width: 480px) {
    padding-inline: 16px;
  }
`;

/**
 * Small caption for labels, metadata and figures. Monospaced for alignment,
 * but not shouty — sentence case, tight tracking.
 */
export const Mono = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ $size }) => $size || '11px'};
  letter-spacing: 0.01em;
  line-height: 1.45;
  color: ${({ theme, $tone }) =>
    $tone === 'accent'
      ? theme.colors.accent
      : $tone === 'ok'
        ? theme.colors.ok
        : $tone === 'warn'
          ? theme.colors.warn
          : $tone === 'muted'
            ? theme.colors.textMuted
            : theme.colors.textFaint};
`;

/**
 * The default panel: flat matte fill, a crisp hairline border, sharp corners,
 * a contained shadow for depth. No blur, no glass — a subtle white tint over
 * the matte-black ground reads as a distinct surface without ever looking
 * like a solid light-coloured box.
 * (Named `glassCard` from an earlier "liquid glass" pass; the look is matte
 * hardware modernism now, but renaming every consumer wasn't worth the
 * churn — see theme.js.)
 */
export const glassCard = css`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadow};
`;

/**
 * A panel that reacts to the pointer: brightens its fill, sharpens its
 * border and lifts slightly on hover, then settles flat and fast on press.
 * Use for anything clickable.
 */
export const glassCardInteractive = css`
  ${glassCard}
  transition:
    transform ${({ theme }) => theme.motion.base},
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base};
  will-change: transform;

  &:hover {
    background: ${({ theme }) => theme.colors.glassHover};
    border-color: ${({ theme }) => theme.colors.glassBorderStrong};
    box-shadow: ${({ theme }) => theme.shadowLift};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    transition-duration: 90ms;
  }
`;

/** Matte panel. */
export const Panel = styled.div`
  ${glassCard}
  ${({ $bg }) => $bg && css`background: ${$bg};`}
`;

/**
 * Near-opaque chrome for surfaces that float over scrolling content — sticky
 * bars and overlays. Solid enough that text scrolling underneath disappears
 * cleanly rather than showing blurred through it.
 */
export const glass = css`
  background: ${({ theme }) => theme.colors.glassChrome};
  border-color: ${({ theme }) => theme.colors.glassBorder};
`;

/** Neutral stand-in for a product image we have not sourced yet. */
export const Placeholder = styled.div`
  background: ${({ theme }) => theme.colors.surfaceRaised};
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.textGhost};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.01em;
  text-align: center;
`;

export const SectionHeading = styled.h2`
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin: 0;
`;

export const riseIn = css`
  animation: dc-rise 0.4s ease both;
`;
