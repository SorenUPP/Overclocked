'use client';

import styled from 'styled-components';
import { builds } from '@/lib/data';
import { money } from '@/lib/recommend';
import { SelectCard } from '@/components/build/SelectCard';

const Head = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const Amount = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(48px, 7vw, 76px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 0.9;
`;

const TierName = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Card = styled(SelectCard)`
  flex: 1;
  min-width: 112px;
  padding: 20px 16px;
  text-align: center;
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.025em;
`;

const Tag = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9.5px;
  color: ${({ theme }) => theme.colors.textFaint};
  letter-spacing: 0.1em;
  margin-top: 7px;
  text-transform: uppercase;
`;

const Comment = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textFaint};
  margin: 22px 0 0;
  letter-spacing: 0.02em;
  max-width: 620px;
`;

export default function BudgetStep({ value, set }) {
  const current = builds.find((b) => b.budget === value.budget) || builds[2];

  return (
    <div>
      <Head>
        <Amount>{money(value.budget)}</Amount>
        <TierName>{current.tierName}</TierName>
      </Head>
      <Row>
        {builds.map((b) => (
          <Card
            key={b.budget}
            $selected={value.budget === b.budget}
            $strong
            role="radio"
            aria-checked={value.budget === b.budget}
            tabIndex={0}
            onClick={() => set('budget', b.budget)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                set('budget', b.budget);
              }
            }}
          >
            <Label>{b.budgetLabel}</Label>
            <Tag>{b.tierTag}</Tag>
          </Card>
        ))}
      </Row>
      <Comment>
        {'// '}The matcher selects from curated builds within ±8% of your figure.
        It does not attempt millions of component combinations.
      </Comment>
    </div>
  );
}
