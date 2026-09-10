'use client';

import styled from 'styled-components';

/**
 * Selectable option card. `$strong` adds the lifted glow used for
 * single-choice steps (resolution, FPS, budget).
 */
export const SelectCard = styled.div`
  cursor: pointer;
  transition: all 0.16s ease;
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.accentDeep : theme.colors.border};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.tintAccent : 'rgba(255, 255, 255, 0.015)'};
  box-shadow: ${({ $selected, $strong }) =>
    !$selected
      ? 'none'
      : $strong
        ? '0 0 0 1px rgba(157,107,255,.45), 0 10px 34px rgba(109,40,217,.28)'
        : '0 0 0 1px rgba(157,107,255,.35)'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderAccent};
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
