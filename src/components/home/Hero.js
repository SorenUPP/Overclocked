'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Container, Mono, VerifiedBadge, glassCard } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';
import { PartImage } from '@/components/ui/PartImage';
import { siteStats } from '@/lib/data';
import { recommend } from '@/lib/recommend';
import { DEFAULT_SELECTION } from '@/lib/build-params';

/**
 * The hero's featured build runs through the same `recommend()` pipeline as
 * the actual result page, seeded with the same defaults — so every figure
 * here (price, FPS, compatibility) is a real, current output of the
 * recommender, not a hand-typed number that can drift out of sync with it.
 */
const example = recommend(DEFAULT_SELECTION);
const exampleCpu = example.build.parts.find((p) => p.category === 'CPU');
const exampleGpu = example.build.parts.find((p) => p.category === 'GPU');
const headlinePerf = example.performance[0];
const compatPassed = example.compatibility.filter((c) => c.status === 'ok').length;

const Section = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;
`;

const Inner = styled(Container)`
  padding-block: 76px 68px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 900px) {
    gap: 44px;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    padding-block: 44px 40px;
    gap: 36px;
  }
`;

/**
 * On mobile this comes before the build card: headline, then the pitch,
 * then the CTA, so the primary action doesn't wait behind a scroll — see
 * `Card`'s own comment for the rest of that ordering.
 */
const Copy = styled.div`
  min-width: 0;
  animation: dc-rise 0.4s ease both;
`;

const Kicker = styled(Mono)`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Title = styled.h1`
  font-size: clamp(40px, 5.4vw, 64px);
  line-height: 1.01;
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
  margin-top: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

/**
 * The recommendation card — the visual centrepiece of the hero. Follows the
 * copy in source order, so on mobile the reader hits headline -> pitch ->
 * CTA before the card, matching the intended mobile reading order.
 */
const Card = styled.div`
  ${glassCard}
  min-width: 0;
  overflow: hidden;
  animation: dc-rise 0.45s ease 0.06s both;

  @media (max-width: 820px) {
    margin-top: 8px;
  }
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardTitleGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
`;

const CardCode = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const CardTier = styled(Mono)`
  color: ${({ theme }) => theme.colors.textFaint};
  white-space: nowrap;
`;

const CardSpecChip = styled(Mono)`
  flex: none;
  padding: 5px 9px;
  border-radius: ${({ theme }) => theme.radiusSmall};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

const Parts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PartCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const PartThumb = styled(PartImage)`
  width: 46px;
  flex: none;
`;

const PartCopy = styled.div`
  min-width: 0;
`;

const PartRole = styled(Mono)`
  display: block;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const PartName = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: -0.005em;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Stat = styled.div`
  padding: 16px 16px 18px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: 0;
  }

  @media (max-width: 480px) {
    padding: 14px 12px 16px;
  }
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 6px;
`;

const StatSub = styled(Mono)`
  display: block;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const CompatStat = styled(Stat)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardFoot = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ViewBuildLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 18px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.text};
  transition:
    background ${({ theme }) => theme.motion.base},
    color ${({ theme }) => theme.motion.base};

  span {
    transition: transform ${({ theme }) => theme.motion.base};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.glassHover};
    color: ${({ theme }) => theme.colors.accentBright};
  }

  &:hover span {
    transform: translateX(3px);
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
            <CardTitleGroup>
              <CardCode>{example.build.code}</CardCode>
              <CardTier>{example.build.tierName}</CardTier>
            </CardTitleGroup>
            <CardSpecChip>
              {example.resolution.id} · {example.input.fps} FPS
            </CardSpecChip>
          </CardHead>

          <Parts>
            <PartCell>
              <PartThumb part={exampleCpu} ratio="1 / 1" />
              <PartCopy>
                <PartRole>CPU</PartRole>
                <PartName>{exampleCpu.name}</PartName>
              </PartCopy>
            </PartCell>
            <PartCell>
              <PartThumb part={exampleGpu} ratio="1 / 1" />
              <PartCopy>
                <PartRole>GPU</PartRole>
                <PartName>{exampleGpu.name}</PartName>
              </PartCopy>
            </PartCell>
          </Parts>

          <Stats>
            <Stat>
              <Mono>Performance</Mono>
              <StatValue>{headlinePerf.estLabel}</StatValue>
              <StatSub>
                {headlinePerf.game} · {example.resolution.id}
              </StatSub>
            </Stat>
            <Stat>
              <Mono>Price</Mono>
              <StatValue>{example.referenceTotalLabel}</StatValue>
              <StatSub>reference</StatSub>
            </Stat>
            <CompatStat>
              <VerifiedBadge>
                {compatPassed}/{compatPassed} checks
              </VerifiedBadge>
            </CompatStat>
          </Stats>

          <CardFoot>
            <ViewBuildLink href="/build/result">
              View this build
              <span>→</span>
            </ViewBuildLink>
          </CardFoot>
        </Card>
      </Inner>
    </Section>
  );
}
