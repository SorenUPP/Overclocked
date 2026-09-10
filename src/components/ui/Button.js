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
  transition:
    background 0.14s ease,
    border-color 0.14s ease;
  white-space: nowrap;

  font-size: ${({ $size }) => ($size === 'lg' ? '15px' : '13px')};
  padding: ${({ $size }) => ($size === 'lg' ? '13px 24px' : '10px 18px')};

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
            border-color: ${theme.colors.text};
          }
        `
      : css`
          color: ${theme.colors.onAccent};
          background: ${theme.colors.accent};
          &:hover {
            background: ${theme.colors.accentBright};
          }
        `}
`;

export const Button = styled.button`
  ${base}
`;

export const ButtonLink = styled(Link)`
  ${base}
`;
