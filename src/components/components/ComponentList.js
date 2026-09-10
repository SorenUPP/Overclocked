'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { allComponents } from '@/lib/data';
import { money } from '@/lib/recommend';

const CATEGORY_ORDER = [
  'CPU',
  'GPU',
  'Motherboard',
  'Memory',
  'Storage',
  'Power Supply',
  'Case',
];

const TIER_LABEL = {
  entry: 'Entry',
  value: 'Value',
  mid: 'Mid',
  high: 'High',
  flagship: 'Flagship',
  listed: 'In a build',
};

const TIER_RANK = { entry: 0, value: 1, mid: 2, high: 3, flagship: 4, listed: 5 };

function group(list) {
  const byCategory = new Map();
  for (const part of list) {
    if (!byCategory.has(part.category)) byCategory.set(part.category, []);
    byCategory.get(part.category).push(part);
  }
  return CATEGORY_ORDER.filter((c) => byCategory.has(c)).map((category) => ({
    category,
    parts: byCategory
      .get(category)
      .slice()
      .sort(
        (a, b) =>
          (TIER_RANK[a.tier] ?? 9) - (TIER_RANK[b.tier] ?? 9) ||
          a.price - b.price,
      ),
  }));
}

const Section = styled(Container)`
  padding-block: 28px 8px;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 28px;
`;

const Filter = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.01em;
  padding: 7px 12px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid
    ${({ theme, $on }) =>
      $on ? theme.colors.glassBorderStrong : theme.colors.border};
  background: ${({ theme, $on }) =>
    $on ? theme.colors.glassActive : 'transparent'};
  color: ${({ theme, $on }) =>
    $on ? theme.colors.text : theme.colors.textMuted};
  transition:
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base},
    color ${({ theme }) => theme.motion.base},
    transform ${({ theme }) => theme.motion.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.glassBorder};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Group = styled.div`
  margin-bottom: 30px;
`;

const GroupHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
  padding-bottom: 9px;
  margin-bottom: 2px;
`;

const GroupName = styled.h2`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 4px 18px;
  align-items: start;
  padding: 12px;
  margin: 0 -12px;
  border-radius: ${({ theme }) => theme.radiusSmall};
  border: 1px solid transparent;
  transition:
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base},
    transform ${({ theme }) => theme.motion.base};

  &:not(:last-child) {
    box-shadow: 0 1px 0 ${({ theme }) => theme.colors.border};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    border-color: ${({ theme }) => theme.colors.glassBorder};
    transform: translateX(2px);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr auto;

    & > span:first-child {
      grid-column: 1 / -1;
    }
  }
`;

const TierTag = styled.span`
  align-self: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};

  @media (max-width: 520px) {
    align-self: start;
    margin-bottom: 2px;
  }
`;

const Name = styled.div`
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.3;
`;

const Specs = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 4px;
  line-height: 1.5;
`;

const Price = styled.div`
  align-self: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: right;
  white-space: nowrap;
`;

export default function ComponentList() {
  const [active, setActive] = useState('All');

  const groups = useMemo(() => group(allComponents), []);
  const shown = active === 'All' ? groups : groups.filter((g) => g.category === active);
  const total = allComponents.length;

  return (
    <Section as="section">
      <Toolbar>
        <Filter $on={active === 'All'} onClick={() => setActive('All')}>
          All · {total}
        </Filter>
        {groups.map((g) => (
          <Filter
            key={g.category}
            $on={active === g.category}
            onClick={() => setActive(g.category)}
          >
            {g.category} · {g.parts.length}
          </Filter>
        ))}
      </Toolbar>

      {shown.map((groupItem) => (
        <Group key={groupItem.category}>
          <GroupHead>
            <GroupName>{groupItem.category}</GroupName>
            <Mono>{groupItem.parts.length} tracked</Mono>
          </GroupHead>
          {groupItem.parts.map((p) => (
            <Row key={`${p.category}-${p.name}`}>
              <TierTag>{TIER_LABEL[p.tier] || p.tier}</TierTag>
              <div>
                <Name>
                  {p.brand} {p.name}
                </Name>
                <Specs>{p.specs}</Specs>
              </div>
              <Price>{money(p.price)}</Price>
            </Row>
          ))}
        </Group>
      ))}
    </Section>
  );
}
