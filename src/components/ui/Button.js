'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;

  font-size: ${({ $size }) => ($size === 'lg' ? '13.5px' : '12px')};
  padding: ${({ $size }) => ($size === 'lg' ? '16px 30px' : '12px 22px')};

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? css`
          color: ${theme.colors.text};
          background: transparent;
          border-color: ${theme.colors.borderStrong};
          &:hover {
            border-color: ${theme.colors.accentDeep};
            background: ${theme.colors.tintAccentFaint};
          }
        `
      : css`
          color: ${theme.colors.onAccent};
          background: ${theme.colors.accent};
          &:hover {
            background: ${theme.colors.accentBright};
            box-shadow: 0 0 26px rgba(185, 140, 255, 0.45);
          }
        `}
`;

export const Button = styled.button`
  ${base}
`;

export const ButtonLink = styled(Link)`
  ${base}
`;
