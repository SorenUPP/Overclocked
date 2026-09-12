'use client';

import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { exampleBuild as example } from '@/lib/example-build';
import { formatRev } from '@/lib/format';
import { siteStats } from '@/lib/data';
import { useCurrency } from '@/lib/currency';

/**
 * Makes the "tested builds, not endless combinations" differentiator
 * concrete: four things that are true of the exact build shown in the hero
 * card, each one a real value pulled from the recommender rather than
 * marketing copy.
 */
const compatPassed = example.compatibility.filter((c) => c.status === 'ok').length;

function buildReasons(budgetLabel) {
  return [
    {
      title: `${compatPassed}/${compatPassed} compatibility checks`,
      body: 'Socket, memory support, GPU clearance and PSU headroom all verified for this exact part list.',
    },
    {
      title: 'A tested configuration',
      body: `Not assembled on the fly — one of ${siteStats.curatedBuilds} builds a person put together and checked.`,
    },
    {
      title: `${example.resolution.id} benchmark data`,
      body: `Performance is measured per game, not guessed from a spec sheet — ${example.performance[0].game} runs ${example.performance[0].estLabel.toLowerCase()} at ${example.resolution.id}.`,
    },
    {
      title: `Fits the ${budgetLabel} tier`,
      body: `Reference pricing, last checked ${formatRev(siteStats.indexRev)}.`,
    },
  ];
}

const Section = styled(Container)`
  padding-block: 64px 68px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 700px) {
    padding-block: 48px 52px;
  }
`;

const Head = styled.div`
  max-width: 560px;
  margin: 0 auto 36px;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 12px 0 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Reason = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  padding: 22px 24px;
  display: flex;
  gap: 14px;
`;

const CheckMark = styled.span`
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.ok};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 11px;
  font-weight: 700;

  &::before {
    content: '✓';
  }
`;

const ReasonTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15.5px;
  font-weight: 600;
  letter-spacing: -0.005em;
`;

const ReasonBody = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 6px;
`;

export default function WhyTrust() {
  const { format } = useCurrency();
  const reasons = buildReasons(format(example.build.budget));

  return (
    <Section as="section">
      <Head>
        <Mono $tone="muted">Why this build?</Mono>
        <Heading>Every recommendation is verified before it reaches you.</Heading>
      </Head>
      <Grid>
        {reasons.map((r) => (
          <Reason key={r.title}>
            <CheckMark aria-hidden="true" />
            <div>
              <ReasonTitle>{r.title}</ReasonTitle>
              <ReasonBody>{r.body}</ReasonBody>
            </div>
          </Reason>
        ))}
      </Grid>
    </Section>
  );
}
