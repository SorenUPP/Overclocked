'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Container, Mono, glassCardInteractive } from '@/components/ui/primitives';
import { PartImage, ImageLightbox, useImagePreview } from '@/components/ui/PartImage';
import { allComponents } from '@/lib/data';
import { retailerSearchUrl } from '@/lib/retailer';
import { useCurrency } from '@/lib/currency';

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

const SORTS = {
  tier: {
    label: 'Tier',
    compare: (a, b) =>
      (TIER_RANK[a.tier] ?? 9) - (TIER_RANK[b.tier] ?? 9) || a.price - b.price,
  },
  'price-asc': { label: 'Price ↑', compare: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price ↓', compare: (a, b) => b.price - a.price },
  name: {
    label: 'Name',
    compare: (a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`),
  },
};

function group(list, sortKey) {
  const compare = (SORTS[sortKey] || SORTS.tier).compare;
  const byCategory = new Map();
  for (const part of list) {
    if (!byCategory.has(part.category)) byCategory.set(part.category, []);
    byCategory.get(part.category).push(part);
  }
  return CATEGORY_ORDER.filter((c) => byCategory.has(c)).map((category) => ({
    category,
    parts: byCategory.get(category).slice().sort(compare),
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
  justify-content: space-between;
  margin-bottom: 28px;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SortRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const SortLabel = styled(Mono)`
  color: ${({ theme }) => theme.colors.textFaint};
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
  margin-bottom: 34px;
`;

const GroupHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
  padding-bottom: 9px;
  margin-bottom: 18px;
`;

const GroupName = styled.h2`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

/** Balanced image-card grid — replaces the old dense text row list. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
`;

const Card = styled.div`
  ${glassCardInteractive}
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const TierTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  margin-top: 2px;
`;

const Specs = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.textDim};
  line-height: 1.5;
  flex: 1;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-top: 4px;
`;

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;

  &::after {
    content: 'ref.';
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 9.5px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.textFaint};
    margin-left: 5px;
  }
`;

const CheckPrice = styled.a`
  flex: none;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textFaint};
  transition: color ${({ theme }) => theme.motion.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export default function ComponentList() {
  const [active, setActive] = useState('All');
  const [sortKey, setSortKey] = useState('tier');
  const { previewed, open, close } = useImagePreview();
  const { format } = useCurrency();

  const groups = useMemo(() => group(allComponents, sortKey), [sortKey]);
  const shown = active === 'All' ? groups : groups.filter((g) => g.category === active);
  const total = allComponents.length;

  return (
    <Section as="section">
      <Toolbar>
        <FilterRow>
          <Filter
            $on={active === 'All'}
            aria-pressed={active === 'All'}
            onClick={() => setActive('All')}
          >
            All · {total}
          </Filter>
          {groups.map((g) => (
            <Filter
              key={g.category}
              $on={active === g.category}
              aria-pressed={active === g.category}
              onClick={() => setActive(g.category)}
            >
              {g.category} · {g.parts.length}
            </Filter>
          ))}
        </FilterRow>
        <SortRow>
          <SortLabel>Sort</SortLabel>
          {Object.entries(SORTS).map(([key, { label }]) => (
            <Filter
              key={key}
              $on={sortKey === key}
              aria-pressed={sortKey === key}
              onClick={() => setSortKey(key)}
            >
              {label}
            </Filter>
          ))}
        </SortRow>
      </Toolbar>

      {shown.map((groupItem) => (
        <Group key={groupItem.category}>
          <GroupHead>
            <GroupName>{groupItem.category}</GroupName>
            <Mono>{groupItem.parts.length} tracked</Mono>
          </GroupHead>
          <Grid>
            {groupItem.parts.map((p) => (
              <Card key={`${p.category}-${p.name}`}>
                <PartImage part={p} ratio="1 / 1" flush onOpen={open} />
                <CardBody>
                  <TierTag>{TIER_LABEL[p.tier] || p.tier}</TierTag>
                  <Name>
                    {p.brand} {p.name}
                  </Name>
                  <Specs>{p.specs}</Specs>
                  <PriceRow>
                    <Price>{format(p.price)}</Price>
                    <CheckPrice
                      href={retailerSearchUrl(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Check price for ${p.brand} ${p.name}`}
                    >
                      Check price ↗
                    </CheckPrice>
                  </PriceRow>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Group>
      ))}

      <ImageLightbox part={previewed} onClose={close} />
    </Section>
  );
}
