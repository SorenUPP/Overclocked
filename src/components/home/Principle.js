'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { siteStats } from '@/lib/data';
import { formatCompact } from '@/lib/format';

const Section = styled(Container)`
  padding-block: 64px 72px;

  @media (max-width: 700px) {
    padding-block: 48px 56px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 40px;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 12px 0 0;
  text-wrap: pretty;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 14px 0 0;
  max-width: 500px;
`;

const Rows = styled.div`
  display: grid;
`;

/**
 * Big number on top, label underneath — these are the strongest trust
 * signals on the page (item count, benchmark volume, rule count), so they
 * read like headline figures rather than footer metadata.
 */
const Line = styled.div`
  padding: 20px 2px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const LineValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(30px, 3.6vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
`;

const LineLabel = styled(Mono)`
  display: block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function Principle() {
  const rows = [
    { label: 'Components tracked', value: siteStats.trackedComponents },
    {
      label: 'Benchmark data points',
      value: formatCompact(siteStats.benchmarkDataPoints),
    },
    { label: 'Compatibility checks', value: siteStats.compatibilityRules },
  ];

  return (
    <Section as="section">
      <Grid>
        <div>
          <Mono $tone="muted">How this stays honest</Mono>
          <Heading>
            A short list of tested builds, not endless combinations.
          </Heading>
          <Text>
            The app picks from a handful of builds that were each put together
            and checked by a person. It never assembles parts from a 60,000-item
            catalogue on the fly, so there is nothing untested to go wrong.
          </Text>
          <Text style={{ marginTop: 12 }}>
            <Link href="/how-it-works">Read how it works</Link>
          </Text>
        </div>
        <Rows>
          {rows.map((r) => (
            <Line key={r.label}>
              <LineValue>{r.value}</LineValue>
              <LineLabel>{r.label}</LineLabel>
            </Line>
          ))}
        </Rows>
      </Grid>
    </Section>
  );
}
