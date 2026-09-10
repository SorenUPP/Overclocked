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
  backdrop-filter: ${({ theme }) => theme.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.blur};
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

  ${({ $variant, theme }) =>
    $variant === 'ghost'
      ? css`
          color: ${theme.colors.textMuted};
          background: transparent;
          border-color: ${theme.colors.border};
          &:hover {
            color: ${theme.colors.text};
            background: ${theme.colors.glass};
            border-color: ${theme.colors.glassBorderStrong};
          }
        `
      : css`
          color: ${theme.colors.text};
          background: ${theme.colors.glassActive};
          border-color: ${theme.colors.glassBorderStrong};
          box-shadow:
            inset 0 1px 0 ${theme.colors.glassHighlight},
            0 6px 20px rgba(0, 0, 0, 0.28);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: ${theme.colors.borderStrong};
            box-shadow:
              inset 0 1px 0 ${theme.colors.glassHighlight},
              0 12px 30px rgba(0, 0, 0, 0.36);
          }
        `}
`;

export const Button = styled.button`
  ${base}
`;

export const ButtonLink = styled(Link)`
  ${base}
`;
