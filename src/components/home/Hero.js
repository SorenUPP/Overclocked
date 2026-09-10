'use client';

import styled from 'styled-components';
import { Container, Mono, glassCard } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';
import { builds, siteStats } from '@/lib/data';
import { money, partsTotal } from '@/lib/recommend';

const example = builds.find((b) => b.id === 'core-07') || builds[0];
const exampleCpu = example.parts.find((p) => p.category === 'CPU');
const exampleGpu = example.parts.find((p) => p.category === 'GPU');

const Section = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled(Container)`
  padding-block: 72px 64px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    padding-block: 52px 48px;
    gap: 40px;
  }
`;

const Copy = styled.div`
  min-width: 0;
  animation: dc-rise 0.4s ease both;
`;

const Kicker = styled(Mono)`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Title = styled.h1`
  font-size: clamp(38px, 5vw, 60px);
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 600;
  margin: 14px 0 0;
  text-wrap: balance;
`;

const Lead = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 520px;
  margin: 20px 0 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Card = styled.div`
  ${glassCard}
  min-width: 0;
  overflow: hidden;
  animation: dc-rise 0.4s ease 0.05s both;
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardName = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15px;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 4px 16px 8px;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;

  &:last-child {
    border-bottom: 0;
  }

  span:first-child {
    flex: none;
    color: ${({ theme }) => theme.colors.textFaint};
  }

  span:last-child {
    text-align: right;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Stat = styled.div`
  padding: 12px 14px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: 0;
  }

  b {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 18px;
    font-weight: 600;
    margin-top: 3px;
    color: ${({ theme, $tone }) =>
      $tone === 'ok' ? theme.colors.ok : theme.colors.text};
  }
`;

export default function Hero() {
  return (
    <Section>
      <Inner>
        <Copy>
          <Kicker>
            {siteStats.curatedBuilds} curated builds, updated {siteStats.indexRev}
          </Kicker>
          <Title>Build the PC you actually need.</Title>
          <Lead>
            Tell us your games, the resolution you play at, a frame-rate target
            and a budget. We match that against a curated hardware list,
            benchmark records and {siteStats.compatibilityRules} compatibility
            rules, then hand back one build that fits together.
          </Lead>
          <Actions>
            <ButtonLink href="/build" $size="lg">
              Build my PC
            </ButtonLink>
            <ButtonLink href="/builds" $size="lg" $variant="ghost">
              Browse the builds
            </ButtonLink>
          </Actions>
        </Copy>

        <Card>
          <CardHead>
            <CardName>{example.name}</CardName>
            <Mono>{example.code}</Mono>
          </CardHead>
          <CardBody>
            <Line>
              <span>CPU</span>
              <span>{exampleCpu.name}</span>
            </Line>
            <Line>
              <span>GPU</span>
              <span>{exampleGpu.name}</span>
            </Line>
          </CardBody>
          <Stats>
            <Stat>
              <Mono>Est. 1440p</Mono>
              <b>112 fps</b>
            </Stat>
            <Stat>
              <Mono>Reference</Mono>
              <b>{money(partsTotal(example.parts))}</b>
            </Stat>
            <Stat $tone="ok">
              <Mono>Checks</Mono>
              <b>6 / 6</b>
            </Stat>
          </Stats>
        </Card>
      </Inner>
    </Section>
  );
}
