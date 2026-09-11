'use client';

import styled from 'styled-components';
import { glassCardInteractive } from '@/components/ui/primitives';

/**
 * Selectable option card. A frosted glass panel that lifts on hover and locks
 * to a brighter fill with a near-white border when `$selected` — no colour.
 * `$strong` is accepted for API compatibility but no longer adds a glow.
 */
export const SelectCard = styled.div`
  ${glassCardInteractive}
  cursor: pointer;
  border-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.borderAccent : theme.colors.glassBorder};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.glassActive : theme.colors.glass};

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.glassActive : theme.colors.glassHover};
    border-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.borderAccent : theme.colors.glassBorderStrong};
  }
`;

export const Tick = styled.span`
  display: grid;
  place-items: center;
  flex: none;
  border-radius: ${({ theme }) => theme.radiusSmall};
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onAccent};
  border: 1px solid
    ${({ theme, $on }) => ($on ? theme.colors.accent : theme.colors.borderStrong)};
  background: ${({ theme, $on }) => ($on ? theme.colors.accent : 'transparent')};
`;
