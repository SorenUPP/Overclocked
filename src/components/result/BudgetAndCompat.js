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
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $gpu }) =>
    $gpu ? theme.colors.accent : theme.colors.textDim};
`;

const AllocMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textDim};
`;

const Bar = styled.div`
  height: 8px;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.05);
`;

const BarFill = styled.div`
  height: 100%;
  transform-origin: left;
  animation: dc-bar-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $gpu }) =>
    $gpu ? 'linear-gradient(90deg,#6D28D9,#B98CFF)' : 'rgba(255,255,255,.20)'};
`;

const Comment = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textFaint};
  margin: 16px 0 0;
  letter-spacing: 0.02em;
  line-height: 1.6;
`;

const CheckRow = styled.div`
  display: flex;
  gap: 13px;
  padding: 13px 14px;
  margin-bottom: 8px;
  border: 1px solid
    ${({ theme, $warn }) =>
      $warn ? 'rgba(224,163,62,.24)' : 'rgba(74,222,128,.18)'};
  background: ${({ theme, $warn }) =>
    $warn ? theme.colors.tintWarn : theme.colors.tintOk};
`;

const CheckIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  line-height: 1.2;
  flex: none;
  color: ${({ theme, $warn }) => ($warn ? theme.colors.warn : theme.colors.ok)};
`;

const CheckTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13.5px;
  font-weight: 500;
`;

const CheckDetail = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 5px;
  line-height: 1.5;
  letter-spacing: 0.02em;
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
            {'// '}GPU carries the largest share — it sets frame rate at your
            resolution more than any other part.
          </Comment>
        </div>

        <div>
          <Head>
            <SectionHeading>Compatibility</SectionHeading>
            <Mono $tone={summary.compatOk ? 'ok' : 'warn'}>
              {summary.compatOk ? 'All checks pass' : '6 pass · 1 note'}
            </Mono>
          </Head>
          {compatibility.map((c) => {
            const warn = c.status === 'warn';
            return (
              <CheckRow key={c.title} $warn={warn}>
                <CheckIcon $warn={warn}>{warn ? '!' : '✓'}</CheckIcon>
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
