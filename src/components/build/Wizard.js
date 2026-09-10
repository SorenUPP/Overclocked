'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';
import { money } from '@/lib/recommend';
import { parseSelection, toQuery } from '@/lib/build-params';
import GamesStep from '@/components/build/steps/GamesStep';
import ResolutionStep from '@/components/build/steps/ResolutionStep';
import FpsStep from '@/components/build/steps/FpsStep';
import BudgetStep from '@/components/build/steps/BudgetStep';
import PreferencesStep from '@/components/build/steps/PreferencesStep';

const STEPS = [
  {
    n: '01',
    label: 'Games',
    title: 'What do you want to play?',
    sub: 'Pick the titles that matter to you. Frame-rate estimates are calculated per game from benchmark records, so this drives the whole recommendation.',
    Component: GamesStep,
  },
  {
    n: '02',
    label: 'Resolution',
    title: 'What resolution will you play at?',
    sub: 'Resolution moves GPU load more than any setting. Match it to the monitor you own or plan to buy.',
    Component: ResolutionStep,
  },
  {
    n: '03',
    label: 'FPS',
    title: 'What frame rate are you aiming for?',
    sub: 'A target, not a promise. We select parts that have held this range in curated benchmarks at your resolution.',
    Component: FpsStep,
  },
  {
    n: '04',
    label: 'Budget',
    title: 'What are you willing to spend?',
    sub: 'Total for the tower — no monitor, keyboard or OS licence included in the reference figure.',
    Component: BudgetStep,
  },
  {
    n: '05',
    label: 'Preferences',
    title: 'Any preferences or constraints?',
    sub: 'Optional. These narrow part choices inside your budget; leave them all off and we pick the balanced default.',
    Component: PreferencesStep,
  },
];

const GEN_LINES = [
  'Filtering by budget band…',
  'Applying compatibility rules…',
  'Resolving benchmark records…',
];

const Main = styled(Container)`
  padding-block: 34px 140px;
  max-width: 1120px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 42px;
`;

const Chip = styled.button`
  flex: 1;
  min-width: 130px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  cursor: pointer;
  background: ${({ theme, $state }) =>
    $state === 'active' ? theme.colors.tintAccent : 'transparent'};
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 2px solid
    ${({ theme, $state }) =>
      $state === 'active'
        ? theme.colors.accentDeep
        : $state === 'done'
          ? 'rgba(157,107,255,.35)'
          : 'transparent'};
  transition: all 0.18s ease;

  &:last-child {
    border-right: 0;
  }
`;

const ChipNum = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  color: ${({ theme, $state }) =>
    $state === 'active' ? theme.colors.accent : theme.colors.textGhost};
`;

const ChipLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $state }) =>
    $state === 'active'
      ? theme.colors.text
      : $state === 'done'
        ? theme.colors.textMuted
        : theme.colors.textFaint};
`;

const StepBody = styled.div`
  animation: dc-rise 0.3s ease both;
`;

const StepTitle = styled.h2`
  font-size: clamp(30px, 3.6vw, 44px);
  line-height: 1.04;
  letter-spacing: -0.032em;
  font-weight: 700;
  margin: 12px 0 10px;
`;

const StepSub = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 32px;
  max-width: 620px;
  line-height: 1.58;
`;

const FooterBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.z.footerBar};
  backdrop-filter: blur(16px);
  background: rgba(6, 6, 10, 0.9);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterInner = styled(Container)`
  max-width: 1120px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding-block: 14px;
`;

const FooterSummary = styled(Mono)`
  margin-right: auto;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.overlay};
  background: rgba(6, 6, 10, 0.95);
  display: grid;
  place-items: center;
  text-align: center;
`;

const Spinner = styled.div`
  width: 34px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  margin: 0 auto 22px;
  animation: dc-spin 0.8s linear infinite;
`;

const OverlayTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export default function Wizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selection, setSelection] = useState(() =>
    parseSelection(searchParams),
  );
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [genLine, setGenLine] = useState('Reading hardware index…');

  const set = useCallback((key, val) => {
    setSelection((prev) => ({ ...prev, [key]: val }));
  }, []);

  const toggle = useCallback((key, val) => {
    setSelection((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(val)
          ? list.filter((x) => x !== val)
          : list.concat(val),
      };
    });
  }, []);

  const generate = useCallback(() => {
    setGenerating(true);
    setGenLine('Reading hardware index…');
    GEN_LINES.forEach((line, i) => {
      setTimeout(() => setGenLine(line), 320 * (i + 1));
    });
    setTimeout(() => {
      router.push(`/build/result?${toQuery(selection)}`);
    }, 1450);
  }, [router, selection]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const footerSummary = useMemo(
    () =>
      `${selection.games.length} games · ${selection.resolution} · ${selection.fps} fps · ${money(
        selection.budget,
      )}`,
    [selection],
  );

  const StepComponent = current.Component;

  return (
    <Main as="main">
      <Chips>
        {STEPS.map((s, i) => {
          const state = i === step ? 'active' : i < step ? 'done' : 'todo';
          return (
            <Chip key={s.n} $state={state} onClick={() => setStep(i)}>
              <ChipNum $state={state}>{s.n}</ChipNum>
              <ChipLabel $state={state}>{s.label}</ChipLabel>
            </Chip>
          );
        })}
      </Chips>

      <StepBody key={step}>
        <Mono $tone="accent" $size="11px">
          Step {current.n} / 05
        </Mono>
        <StepTitle>{current.title}</StepTitle>
        <StepSub>{current.sub}</StepSub>
        <StepComponent value={selection} set={set} toggle={toggle} />
      </StepBody>

      <FooterBar>
        <FooterInner>
          <Button
            $variant="ghost"
            onClick={() =>
              step === 0 ? router.push('/') : setStep((s) => s - 1)
            }
          >
            Back
          </Button>
          <FooterSummary>{footerSummary}</FooterSummary>
          <Button onClick={() => (isLast ? generate() : setStep((s) => s + 1))}>
            {isLast ? 'Generate build →' : 'Continue →'}
          </Button>
        </FooterInner>
      </FooterBar>

      {generating && (
        <Overlay role="status" aria-live="polite">
          <div>
            <Spinner />
            <OverlayTitle>Matching curated builds</OverlayTitle>
            <Mono style={{ marginTop: 12 }}>{genLine}</Mono>
          </div>
        </Overlay>
      )}
    </Main>
  );
}
