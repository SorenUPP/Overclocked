'use client';

import styled from 'styled-components';

/**
 * Selectable option card. `$selected` gets an accent border and a faint tint;
 * `$strong` is accepted for API compatibility but no longer adds a glow.
 */
export const SelectCard = styled.div`
  cursor: pointer;
  transition:
    border-color 0.14s ease,
    background 0.14s ease;
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.tintAccentFaint : theme.colors.surface};

  &:hover {
    border-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : theme.colors.borderStrong};
  }
`;

export const Tick = styled.span`
  display: grid;
  place-items: center;
  flex: none;
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onAccent};
  border: 1px solid
    ${({ theme, $on }) => ($on ? theme.colors.accent : theme.colors.borderStrong)};
  background: ${({ theme, $on }) => ($on ? theme.colors.accent : 'transparent')};
`;
