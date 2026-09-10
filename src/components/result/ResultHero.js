'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Container, Mono, glassCard } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';
import { toQuery } from '@/lib/build-params';

const Section = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled(Container)`
  padding-block: 44px 40px;
  animation: dc-rise 0.35s ease both;
`;

const Title = styled.h1`
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-weight: 600;
  margin: 12px 0 0;
`;

const Chips = styled.div`
  ${glassCard}
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  overflow: hidden;
`;

const Chip = styled.div`
  flex: 1;
  min-width: 150px;
  padding: 14px 18px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: 0;
  }

  b {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.015em;
    margin-top: 5px;
    color: ${({ theme, $ok }) =>
      $ok === false ? theme.colors.warn : theme.colors.text};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 22px;
`;

const BudgetNote = styled(Mono)`
  display: block;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.warn};
`;

export default function ResultHero({ result }) {
  const router = useRouter();
  const { summary, input } = result;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', window.location.href);
    }
  };

  return (
    <Section>
      <Inner>
        <Mono $tone="muted">Build {result.build.code}</Mono>
        <Title>Your recommended PC</Title>

        <Chips>
          <Chip>
            <Mono>Resolution</Mono>
            <b>{summary.resolutionId}</b>
          </Chip>
          <Chip>
            <Mono>Target</Mono>
            <b>{summary.fpsLabel}</b>
          </Chip>
          <Chip>
            <Mono>Budget</Mono>
            <b>{summary.budgetLabel}</b>
          </Chip>
          <Chip $ok={summary.compatOk}>
            <Mono>Compatibility</Mono>
            <b>{summary.compatOk ? '6 of 6 pass' : '6 pass, 1 note'}</b>
          </Chip>
        </Chips>

        <Actions>
          <Button onClick={() => router.push(`/build?${toQuery(input)}`)}>
            Adjust requirements
          </Button>
          <Button $variant="ghost" onClick={copyLink}>
            {copied ? 'Link copied' : 'Copy link to this build'}
          </Button>
        </Actions>

        {summary.budgetNote && <BudgetNote>{summary.budgetNote}</BudgetNote>}
      </Inner>
    </Section>
  );
}
