'use client';

import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { builds } from '@/lib/data';
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

/** Unique parts across every build and its alternates, grouped by category. */
function collectParts() {
  const byCategory = new Map();

  const add = (part) => {
    if (!byCategory.has(part.category)) byCategory.set(part.category, new Map());
    const bucket = byCategory.get(part.category);
    if (!bucket.has(part.name)) {
      bucket.set(part.name, {
        brand: part.brand,
        name: part.name,
        specs: part.specs,
        price: part.price,
        tiers: new Set(),
      });
    }
  };

  for (const build of builds) {
    for (const part of build.parts) {
      add(part);
      byCategory.get(part.category).get(part.name).tiers.add(build.budgetLabel);
      for (const alt of part.alternatives || []) {
        add({ ...alt, category: part.category });
      }
    }
  }

  return CATEGORY_ORDER.filter((c) => byCategory.has(c)).map((category) => ({
    category,
    parts: [...byCategory.get(category).values()].sort(
      (a, b) => a.price - b.price,
    ),
  }));
}

const Section = styled(Container)`
  padding-block: 32px 8px;
`;

const Group = styled.div`
  margin-bottom: 36px;
`;

const GroupHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 10px;
  margin-bottom: 4px;
`;

const GroupName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Name = styled.div`
  font-size: 14.5px;
  font-weight: 500;
`;

const Specs = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 3px;
`;

const Price = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15px;
  font-weight: 600;
  text-align: right;
`;

export default function ComponentList() {
  const groups = collectParts();

  return (
    <Section as="section">
      {groups.map((group) => (
        <Group key={group.category}>
          <GroupHead>
            <GroupName>{group.category}</GroupName>
            <Mono>{group.parts.length} tracked</Mono>
          </GroupHead>
          {group.parts.map((p) => (
            <Row key={p.name}>
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
