'use client';

import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { siteStats } from '@/lib/data';

const Section = styled(Container)`
  padding-block: 76px 110px;

  @media (max-width: 700px) {
    padding-block: 56px 72px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 44px;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;
  margin: 14px 0 0;
  text-wrap: pretty;
`;

const Text = styled.p`
  font-size: 16.5px;
  line-height: 1.62;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 16px 0 0;
  max-width: 500px;
`;

const Rows = styled.div`
  display: grid;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 18px 2px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  span:first-child {
    font-size: 14.5px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span:last-child {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
`;

export default function Principle() {
  const rows = [
    { label: 'Tracked components', value: siteStats.trackedComponents },
    {
      label: 'Benchmark data points',
      value: siteStats.benchmarkDataPoints.toLocaleString('en-US'),
    },
    { label: 'Compatibility rules', value: siteStats.compatibilityRules },
  ];

  return (
    <Section as="section" id="how-it-works">
      <Grid>
        <div>
          <Mono>The principle</Mono>
          <Heading>
            No thousand random
            <br />
            permutations.
          </Heading>
          <Text>
            A small set of carefully curated, tested builds — matched to your
            requirements. Every part list you see was reviewed by a human before
            it entered the index.
          </Text>
        </div>
        <Rows>
          {rows.map((r) => (
            <Line key={r.label}>
              <span>{r.label}</span>
              <span>{r.value}</span>
            </Line>
          ))}
        </Rows>
      </Grid>
    </Section>
  );
}
