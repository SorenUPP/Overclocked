'use client';

import styled from 'styled-components';
import { Container, Mono, GlowBackdrop, Hatch } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';
import { siteStats } from '@/lib/data';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: ${({ theme }) => theme.maxWidth};
  transform: translateX(-50%);
  pointer-events: none;
  opacity: 0.6;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.045) 0 1px,
    transparent 1px 100%
  );
  background-size: 160px 100%;
`;

const Inner = styled(Container)`
  position: relative;
  padding-block: 96px 84px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 60px;
  align-items: center;

  @media (max-width: 700px) {
    padding-block: 64px 56px;
    gap: 44px;
  }
`;

const Copy = styled.div`
  animation: dc-rise 0.5s ease both;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.tintAccentFaint};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};
`;

const Pulse = styled.span`
  width: 5px;
  height: 5px;
  background: ${({ theme }) => theme.colors.ok};
  box-shadow: 0 0 9px rgba(74, 222, 128, 0.9);
  animation: dc-sweep 2.6s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: clamp(42px, 5.8vw, 74px);
  line-height: 0.96;
  letter-spacing: -0.035em;
  font-weight: 700;
  margin: 24px 0 0;
  text-wrap: balance;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Lead = styled.p`
  font-size: 17.5px;
  line-height: 1.62;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 510px;
  margin: 22px 0 0;
  text-wrap: pretty;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 34px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 44px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textFaint};

  span {
    padding: 14px 22px 0 0;
  }
`;

const PreviewWrap = styled.div`
  position: relative;
  animation: dc-rise 0.6s ease both;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      150deg,
      rgba(185, 140, 255, 0.5),
      transparent 42%
    );
  }
`;

const PreviewCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const PreviewHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};

  span:last-child {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const PreviewImage = styled(Hatch)`
  aspect-ratio: 4 / 3;
`;

const Diamond = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  margin: 0 auto 14px;
  transform: rotate(45deg);
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Stat = styled.div`
  padding: 14px 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: 0;
  }

  b {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 21px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-top: 4px;
    color: ${({ theme, $tone }) =>
      $tone === 'ok' ? theme.colors.ok : theme.colors.text};
  }
`;

export default function Hero() {
  return (
    <Section>
      <GlowBackdrop />
      <GridLines />
      <Inner>
        <Copy>
          <Badge>
            <Pulse />
            {siteStats.curatedBuilds} curated builds · index rev.{' '}
            {siteStats.indexRev}
          </Badge>
          <Title>
            Build the PC you
            <br />
            <span>actually</span> need.
          </Title>
          <Lead>
            Name your games, resolution, frame-rate target and budget. We resolve
            them against a curated hardware index, benchmark records and{' '}
            {siteStats.compatibilityRules} compatibility rules — and return one
            build that holds together.
          </Lead>
          <Actions>
            <ButtonLink href="/build" $size="lg">
              Build My PC
            </ButtonLink>
            <ButtonLink href="/build" $size="lg" $variant="ghost">
              Explore Builds
            </ButtonLink>
          </Actions>
          <MetaRow>
            <span>No account</span>
            <span>Deterministic matching</span>
            <span>Human-reviewed parts</span>
          </MetaRow>
        </Copy>

        <PreviewWrap>
          <PreviewCard>
            <PreviewHead>
              <span>BUILD-1440-144 / REV C</span>
              <span>Live preview</span>
            </PreviewHead>
            <PreviewImage>
              <div>
                <Diamond />
                hero product shot
                <br />
                mid-tower + gpu · 4:3
              </div>
            </PreviewImage>
            <Stats>
              <Stat>
                <Mono>Est. FPS</Mono>
                <b>112</b>
              </Stat>
              <Stat>
                <Mono>Reference</Mono>
                <b>$1,187</b>
              </Stat>
              <Stat $tone="ok">
                <Mono>Compat</Mono>
                <b>6/6</b>
              </Stat>
            </Stats>
          </PreviewCard>
        </PreviewWrap>
      </Inner>
    </Section>
  );
}
