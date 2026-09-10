'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Container, Mono, GlowBackdrop } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';
import { toQuery } from '@/lib/build-params';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled(Container)`
  position: relative;
  padding-block: 52px 44px;
  animation: dc-rise 0.4s ease both;
`;

const Title = styled.h1`
  font-size: clamp(34px, 4.6vw, 58px);
  line-height: 1;
  letter-spacing: -0.038em;
  font-weight: 700;
  margin: 16px 0 0;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 26px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Chip = styled.div`
  flex: 1;
  min-width: 150px;
  padding: 16px 20px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: 0;
  }

  b {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-top: 5px;
    color: ${({ theme, $ok }) =>
      $ok === false ? theme.colors.warn : theme.colors.text};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
`;

export default function ResultHero({ result }) {
  const router = useRouter();
  const { build, summary, input } = result;

  return (
    <Section>
      <GlowBackdrop />
      <Inner>
        <Mono $tone="accent" $size="11px">
          Match complete · {build.code}
        </Mono>
        <Title>Your recommended PC</Title>

        <Chips>
          <Chip>
            <Mono>Resolution</Mono>
            <b>{summary.resolutionId}</b>
          </Chip>
          <Chip>
            <Mono>Target FPS</Mono>
            <b>{summary.fpsLabel}</b>
          </Chip>
          <Chip>
            <Mono>Budget</Mono>
            <b>{summary.budgetLabel}</b>
          </Chip>
          <Chip $ok={summary.compatOk}>
            <Mono>Compatibility</Mono>
            <b>{summary.compatOk ? '6 / 6 pass' : '6 pass · 1 note'}</b>
          </Chip>
        </Chips>

        <Actions>
          <Button onClick={() => router.push(`/build?${toQuery(input)}`)}>
            Adjust requirements
          </Button>
          <Button $variant="ghost" onClick={() => window.print()}>
            Save parts list
          </Button>
        </Actions>
      </Inner>
    </Section>
  );
}
