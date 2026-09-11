'use client';

import styled from 'styled-components';
import { Container, Mono, SectionHeading } from '@/components/ui/primitives';

const Section = styled(Container)`
  padding-block: 56px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  align-items: start;
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 14px;
  margin-bottom: 18px;
`;

const HeadValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const AllocRow = styled.div`
  padding: 10px 0 12px;
`;

const AllocTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

const AllocLabel = styled.span`
  font-size: 13px;
  color: ${({ theme, $gpu }) =>
    $gpu ? theme.colors.accent : theme.colors.textMuted};
`;

const AllocMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDim};
`;

const Bar = styled.div`
  height: 6px;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.06);
`;

const BarFill = styled.div`
  height: 100%;
  transform-origin: left;
  animation: dc-bar-in 0.5s ease both;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme, $gpu }) =>
    $gpu ? theme.colors.accent : 'rgba(255,255,255,.22)'};
`;

const Comment = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textFaint};
  margin: 16px 0 0;
  line-height: 1.6;
`;

const CheckRow = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  margin-bottom: 6px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-left: 2px solid
    ${({ theme, $warn }) => ($warn ? theme.colors.warn : theme.colors.ok)};
  border-radius: ${({ theme }) => theme.radiusSmall};
`;

const CheckIcon = styled.span`
  flex: none;
  width: 7px;
  height: 7px;
  margin-top: 5px;
  background: ${({ theme, $warn }) => ($warn ? theme.colors.warn : theme.colors.ok)};
`;

const CheckTitle = styled.div`
  font-size: 13.5px;
  font-weight: 500;
`;

const CheckDetail = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 5px;
  line-height: 1.5;
`;

export default function BudgetAndCompat({ result }) {
  const { allocation, compatibility, referenceTotalLabel, summary } = result;

  return (
    <Section as="section">
      <Grid>
        <div>
          <Head>
            <SectionHeading>Budget allocation</SectionHeading>
            <HeadValue>{referenceTotalLabel}</HeadValue>
          </Head>
          {allocation.map((a) => (
            <AllocRow key={a.category}>
              <AllocTop>
                <AllocLabel $gpu={a.isGpu}>{a.category}</AllocLabel>
                <AllocMeta>
                  {a.priceLabel} · {a.pctOfTotal}%
                </AllocMeta>
              </AllocTop>
              <Bar>
                <BarFill $pct={a.pctOfMax.toFixed(1)} $gpu={a.isGpu} />
              </Bar>
            </AllocRow>
          ))}
          <Comment>
            The GPU takes the largest share. It sets frame rate at your
            resolution more than any other part.
          </Comment>
        </div>

        <div>
          <Head>
            <SectionHeading>Compatibility</SectionHeading>
            <Mono $tone={summary.compatOk ? 'ok' : 'warn'}>
              {summary.compatOk ? 'All checks pass' : '6 pass, 1 note'}
            </Mono>
          </Head>
          {compatibility.map((c) => {
            const warn = c.status === 'warn';
            return (
              <CheckRow key={c.title} $warn={warn}>
                <CheckIcon $warn={warn} />
                <div>
                  <CheckTitle>{c.title}</CheckTitle>
                  <CheckDetail>{c.detail}</CheckDetail>
                </div>
              </CheckRow>
            );
          })}
        </div>
      </Grid>
    </Section>
  );
}
