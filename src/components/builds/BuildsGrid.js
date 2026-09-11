'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Container, Mono, glassCardInteractive } from '@/components/ui/primitives';
import { PartImage } from '@/components/ui/PartImage';
import { builds } from '@/lib/data';
import { money, partsTotal } from '@/lib/recommend';

const Section = styled(Container)`
  padding-block: 32px 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
`;

const Card = styled(Link)`
  ${glassCardInteractive}
  display: block;
  overflow: hidden;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const Thumbs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > *:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const Body = styled.div`
  padding: 14px 18px 18px;
`;

const Name = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
`;

const Blurb = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 6px 0 14px;
`;

const Part = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;

  span:first-child {
    color: ${({ theme }) => theme.colors.textFaint};
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textFaint};
`;

export default function BuildsGrid() {
  return (
    <Section as="section">
      <Grid>
        {builds.map((b) => {
          const cpu = b.parts.find((p) => p.category === 'CPU');
          const gpu = b.parts.find((p) => p.category === 'GPU');
          return (
            <Card key={b.id} href={`/build/result?budget=${b.budget}`}>
              <Thumbs>
                <PartImage part={cpu} ratio="1 / 1" flush />
                <PartImage part={gpu} ratio="1 / 1" flush />
              </Thumbs>
              <Head>
                <Mono>{b.tierName}</Mono>
                <Price>{b.budgetLabel}</Price>
              </Head>
              <Body>
                <Name>{b.name}</Name>
                <Blurb>{b.blurb}</Blurb>
                <Part>
                  <span>CPU</span>
                  <span>{cpu.name}</span>
                </Part>
                <Part>
                  <span>GPU</span>
                  <span>{gpu.name}</span>
                </Part>
                <Total>
                  <span>Reference total</span>
                  <span>{money(partsTotal(b.parts))} · see prices inside</span>
                </Total>
              </Body>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}
