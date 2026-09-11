'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base},
    color ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base},
    transform ${({ theme }) => theme.motion.base};

  font-size: ${({ $size }) => ($size === 'lg' ? '15px' : '13px')};
  padding: ${({ $size }) => ($size === 'lg' ? '13px 24px' : '10px 18px')};

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    transition-duration: 90ms;
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  /**
   * \`&&\` doubles this component's own class in the generated selector
   * (".btn.btn" instead of ".btn"), which is the whole point here: ButtonLink
   * renders an <a>, and GlobalStyle carries generic \`a\`, \`a:hover\` and
   * \`a:visited\` colour rules for body copy. A single-class rule only ties
   * with those on specificity, so which one wins depends on stylesheet
   * insertion order — order that shifts between server/client render, hot
   * reload and browser visited-link history (which JS can't even read back
   * to double check). Doubling the class makes this rule unconditionally
   * win instead of gambling on order every time.
   */
  ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? css`
          && {
            color: ${theme.colors.textMuted};
            background: transparent;
            border-color: ${theme.colors.border};
          }
          &&:hover {
            color: ${theme.colors.text};
            background: ${theme.colors.glass};
            border-color: ${theme.colors.glassBorderStrong};
          }
        `
      : /**
         * Primary — the one solid fill on the site. Reserved for the single
         * action we want the eye to land on first (Build my PC, rerun the
         * wizard); every other action stays ghost or a plain link so this
         * doesn't get diluted by repetition.
         */
        css`
          && {
            color: ${theme.colors.onAccent};
            background: ${theme.colors.accent};
            border-color: ${theme.colors.accent};
            box-shadow: ${theme.shadow};
          }
          &&:hover {
            color: ${theme.colors.onAccent};
            background: ${theme.colors.accentBright};
            border-color: ${theme.colors.accentBright};
            box-shadow: ${theme.glow};
          }
        `}
`;

export const Button = styled.button`
  ${base}
`;

export const ButtonLink = styled(Link)`
  ${base}
`;
