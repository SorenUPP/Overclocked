'use client';

import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';

const Section = styled(Container)`
  padding-block: 56px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  align-items: start;
`;

const Card = styled.div`
  border: 1px solid
    ${({ $accent, theme }) =>
      $accent ? theme.colors.borderAccent : theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const CardHead = styled.div`
  padding: 20px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BuildName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 8px;
`;

const Blurb = styled.div`
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
  margin-top: 8px;
`;

const PartList = styled.div`
  padding: 6px 22px 18px;
`;

const PartRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);

  span:first-child {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 10.5px;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.colors.textFaint};
    text-transform: uppercase;
    flex: none;
    width: 88px;
  }

  span:last-child {
    font-size: 14.5px;
    text-align: right;
    line-height: 1.4;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 18px 0 4px;

  b {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
`;

const PerfHead = styled.div`
  padding: 20px 22px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  div {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 8px 0 14px;
  }
`;

const PerfBody = styled.div`
  padding: 18px 22px 20px;
`;

const PerfRow = styled.div`
  padding: 11px 0 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
`;

const PerfTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;

  span:first-child {
    font-size: 14.5px;
  }

  span:last-child {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: ${({ theme, $ok }) => ($ok ? theme.colors.ok : theme.colors.warn)};
  }
`;

const Track = styled.div`
  position: relative;
  height: 6px;
  margin-top: 9px;
  background: rgba(255, 255, 255, 0.055);
`;

const Fill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transform-origin: left;
  animation: dc-bar-in 0.5s ease both;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme, $ok }) =>
    $ok ? theme.colors.accent : theme.colors.warn};
`;

const Marker = styled.div`
  position: absolute;
  top: -3px;
  bottom: -3px;
  width: 1px;
  background: rgba(255, 255, 255, 0.55);
  left: ${({ $pct }) => $pct}%;
`;

const Legend = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 14px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textFaint};

  span {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`;

const Swatch = styled.span`
  width: 14px;
  height: 5px;
  background: ${({ theme }) => theme.colors.accent};
`;

const MarkerKey = styled.span`
  width: 1px;
  height: 11px;
  background: rgba(255, 255, 255, 0.6);
`;

const Disclaimer = styled.p`
  font-size: 12.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textFaint};
  margin: 16px 0 0;
`;

export default function BuildOverview({ result }) {
  const { build, performance, referenceTotalLabel, input, resolution } = result;

  return (
    <Section as="section">
      <Grid>
        <Card $accent>
          <CardHead>
            <Mono $tone="accent">Recommended build</Mono>
            <BuildName>{build.name}</BuildName>
            <Blurb>{build.blurb}</Blurb>
          </CardHead>
          <PartList>
            {build.parts.map((p) => (
              <PartRow key={p.category}>
                <span>{p.category}</span>
                <span>{p.name}</span>
              </PartRow>
            ))}
            <TotalRow>
              <Mono>Reference total</Mono>
              <b>{referenceTotalLabel}</b>
            </TotalRow>
            <Mono>Reference prices, not a live quote</Mono>
          </PartList>
        </Card>

        <Card>
          <PerfHead>
            <Mono>Expected performance</Mono>
            <div>
              {resolution.id}, target {input.fps} fps
            </div>
          </PerfHead>
          <PerfBody>
            {performance.map((p) => (
              <PerfRow key={p.game}>
                <PerfTop $ok={p.meetsTarget}>
                  <span>{p.game}</span>
                  <span>{p.estLabel}</span>
                </PerfTop>
                <Track>
                  <Fill $pct={p.estPct.toFixed(1)} $ok={p.meetsTarget} />
                  <Marker $pct={p.targetPct.toFixed(1)} />
                </Track>
              </PerfRow>
            ))}
            <Legend>
              <span>
                <Swatch />
                Estimated
              </span>
              <span>
                <MarkerKey />
                Target {input.fps} fps
              </span>
            </Legend>
            <Disclaimer>
              These numbers come from curated benchmark data. Treat them as
              estimates. Real performance shifts with settings, drivers, game
              version and the rest of your system.
            </Disclaimer>
          </PerfBody>
        </Card>
      </Grid>
    </Section>
  );
}
