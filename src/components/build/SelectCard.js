'use client';

import styled from 'styled-components';
import { glassCardInteractive } from '@/components/ui/primitives';

/**
 * Selectable option card. A matte panel that lifts on hover and locks to a
 * brighter fill with a near-white border and a soft glow when `$selected` —
 * no colour, just light. `$strong` is accepted for API compatibility but
 * doesn't change anything on its own.
 */
export const SelectCard = styled.div`
  ${glassCardInteractive}
  cursor: pointer;
  border-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.borderAccent : theme.colors.glassBorder};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.glassActive : theme.colors.glass};
  box-shadow: ${({ theme, $selected }) =>
    $selected ? theme.glow : theme.shadow};

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.glassActive : theme.colors.glassHover};
    border-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.borderAccent : theme.colors.glassBorderStrong};
    box-shadow: ${({ theme, $selected }) =>
      $selected ? theme.glow : theme.shadowLift};
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
