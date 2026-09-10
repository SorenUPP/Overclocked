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

/** Hairline-bordered dark surface. */
export const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $bg }) => $bg || theme.colors.surface};
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
