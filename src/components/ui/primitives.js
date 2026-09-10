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

/** Uppercase mono caption used for technical labels and metadata. */
export const Mono = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ $size }) => $size || '10.5px'};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.4;
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

/** Hairline-bordered dark surface. */
export const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $bg }) => $bg || theme.colors.surface};
`;

/** Diagonal-hatch placeholder standing in for a product image. */
export const Hatch = styled.div`
  background: ${({ theme }) => theme.patterns.hatch};
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.textGhost};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: center;
`;

/** Section heading in the industrial uppercase style. */
export const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin: 0;
`;

export const riseIn = css`
  animation: dc-rise 0.5s ease both;
`;

/** Decorative purple glow + vertical grid lines behind hero sections. */
export const GlowBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      760px 520px at 78% -6%,
      rgba(157, 107, 255, 0.2),
      transparent 68%
    ),
    radial-gradient(
      600px 400px at 8% 108%,
      rgba(109, 40, 217, 0.14),
      transparent 70%
    );
`;
