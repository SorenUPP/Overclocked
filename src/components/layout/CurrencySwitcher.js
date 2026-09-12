'use client';

import styled from 'styled-components';
import { CURRENCIES, CURRENCY_IDS, useCurrency } from '@/lib/currency';

/**
 * A three-way toggle for the currency every price on the site is displayed
 * in. Prices are always authored in euros (src/data/README.md) and converted
 * at render time — see src/lib/currency.js.
 */
const Group = styled.div`
  display: flex;
  align-items: stretch;
  flex: none;
  margin: auto 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusSmall};
  overflow: hidden;
`;

const Option = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.02em;
  padding: 7px 9px;
  cursor: pointer;
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $on }) => ($on ? theme.colors.glassActive : 'transparent')};
  color: ${({ theme, $on }) => ($on ? theme.colors.text : theme.colors.textMuted)};
  transition:
    background ${({ theme }) => theme.motion.base},
    color ${({ theme }) => theme.motion.base};

  &:last-child {
    border-right: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme, $on }) => ($on ? theme.colors.glassActive : theme.colors.glass)};
  }
`;

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <Group role="radiogroup" aria-label="Currency">
      {CURRENCY_IDS.map((id) => (
        <Option
          key={id}
          type="button"
          role="radio"
          aria-checked={currency === id}
          $on={currency === id}
          onClick={() => setCurrency(id)}
        >
          {CURRENCIES[id].symbol}
        </Option>
      ))}
    </Group>
  );
}
