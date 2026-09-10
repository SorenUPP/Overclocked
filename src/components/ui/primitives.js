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
 * The default box: a translucent frosted panel. Blurs whatever sits behind it,
 * with a crisp hairline border, a top inset highlight and a soft drop shadow.
 * Never a solid fill — text stays readable because the tint is light over a
 * dark ground, not a light background.
 */
export const glassCard = css`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radius};
  backdrop-filter: ${({ theme }) => theme.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.blur};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.glassHighlight},
    ${({ theme }) => theme.shadow};
`;

/**
 * A glass panel that reacts to the pointer: it lifts a little, brightens its
 * fill and sharpens its border on hover, and settles back on press. Use for
 * anything clickable.
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
    box-shadow:
      inset 0 1px 0 ${({ theme }) => theme.colors.glassHighlight},
      ${({ theme }) => theme.shadowLift};
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
    transition-duration: 90ms;
  }
`;

/** Frosted panel. */
export const Panel = styled.div`
  ${glassCard}
  ${({ $bg }) => $bg && css`background: ${$bg};`}
`;

/**
 * Darker frost for chrome that floats over scrolling content — sticky bars and
 * overlays. Heavier blur, dimmer fill, so text behind it stays legible.
 */
export const glass = css`
  background: ${({ theme }) => theme.colors.glassChrome};
  border-color: ${({ theme }) => theme.colors.glassBorder};
  backdrop-filter: ${({ theme }) => theme.blurHeavy};
  -webkit-backdrop-filter: ${({ theme }) => theme.blurHeavy};
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
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin: 0;
`;

export const riseIn = css`
  animation: dc-rise 0.4s ease both;
`;
