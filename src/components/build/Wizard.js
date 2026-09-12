'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { Container, Mono, glass, glassCard } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';
import { parseSelection, toQuery } from '@/lib/build-params';
import { useCurrency } from '@/lib/currency';
import GamesStep from '@/components/build/steps/GamesStep';
import ResolutionStep from '@/components/build/steps/ResolutionStep';
import FpsStep from '@/components/build/steps/FpsStep';
import BudgetStep from '@/components/build/steps/BudgetStep';
import PreferencesStep from '@/components/build/steps/PreferencesStep';

const STEPS = [
  {
    n: '1',
    label: 'Games',
    key: 'games',
    title: 'What do you want to play?',
    sub: 'Pick the titles that matter to you. Frame-rate estimates are worked out per game from benchmark records, so this drives the whole result.',
    Component: GamesStep,
  },
  {
    n: '2',
    label: 'Resolution',
    title: 'What resolution will you play at?',
    sub: 'Resolution changes GPU load more than any other setting. Match it to the monitor you have or plan to buy.',
    Component: ResolutionStep,
  },
  {
    n: '3',
    label: 'Frame rate',
    title: 'What frame rate are you aiming for?',
    sub: 'A target, not a promise. We pick parts that have held this range in curated benchmarks at your resolution.',
    Component: FpsStep,
  },
  {
    n: '4',
    label: 'Budget',
    title: 'What are you willing to spend?',
    sub: 'Total for the tower. No monitor, keyboard or operating system in the reference figure.',
    Component: BudgetStep,
  },
  {
    n: '5',
    label: 'Preferences',
    title: 'Any preferences or constraints?',
    sub: 'Optional. Each one swaps a specific part, or gets flagged if this build cannot meet it. Leave them off for the balanced default.',
    Component: PreferencesStep,
  },
];

const GEN_LINES = [
  'Filtering by budget',
  'Checking compatibility',
  'Reading benchmark records',
];

const Main = styled(Container)`
  padding-block: 34px 140px;
  max-width: 1120px;
`;

const Chips = styled.div`
  ${glassCard}
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 40px;
`;

const Chip = styled.button`
  flex: 1;
  min-width: 130px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 15px;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 2px solid
    ${({ theme, $state }) =>
      $state === 'active' ? theme.colors.accent : 'transparent'};
  transition:
    border-color ${({ theme }) => theme.motion.base},
    background ${({ theme }) => theme.motion.base};

  &:last-child {
    border-right: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
  }
`;

const ChipNum = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme, $state }) =>
    $state === 'active' ? theme.colors.accent : theme.colors.textGhost};
`;

const ChipLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme, $state }) =>
    $state === 'active'
      ? theme.colors.text
      : $state === 'done'
        ? theme.colors.textMuted
        : theme.colors.textFaint};
`;

/**
 * Games starts pre-populated with the app's own 4 default titles — visually
 * identical to a deliberate pick. This flags a step whose value the user
 * hasn't actually touched yet, so "See the build" can't get run against an
 * unreviewed default without at least one visible signal first.
 */
const NotReviewed = styled.span`
  flex: none;
  width: 6px;
  height: 6px;
  margin-left: -2px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.warn};
`;

const StepBody = styled.div`
  animation: dc-rise 0.3s ease both;
`;

const StepTitle = styled.h2`
  font-size: clamp(26px, 3.4vw, 36px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 10px 0 10px;
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
  ${glass}
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterInner = styled(Container)`
  max-width: 1120px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding-block: 14px;

  @media (max-width: 560px) {
    padding-block: 10px 12px;
  }
`;

const FooterSummary = styled(Mono)`
  margin-right: auto;

  @media (max-width: 560px) {
    order: 1;
    flex: 1 0 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/**
 * Zero games would otherwise continue silently and get swapped for 4 unrelated
 * default titles once the URL round-trips through the result page (no `games`
 * param serializes for an empty list, so `parseSelection` backfills its own
 * defaults) — see designmanual.md. Blocking it here means that swap can never
 * happen without the user seeing why.
 */
const FooterWarning = styled(Container)`
  max-width: 1120px;
  padding-top: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.warn};
`;

/* Below 560px the summary takes its own row (order 1) and these two share
   a full-width row underneath it, instead of Continue orphaning onto its
   own line. Desktop keeps the original Back ... summary Continue layout. */
const FooterBack = styled(Button)`
  @media (max-width: 560px) {
    order: 2;
    flex: 1;
  }
`;

const FooterNext = styled(Button)`
  @media (max-width: 560px) {
    order: 3;
    flex: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.overlay};
  background: rgba(8, 8, 10, 0.88);
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
  font-size: 15px;
  font-weight: 600;
`;

export default function Wizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { format } = useCurrency();

  const [selection, setSelection] = useState(() =>
    parseSelection(searchParams),
  );
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [genLine, setGenLine] = useState('Reading the hardware list');
  /** Which selection keys the user has actively changed this session — see `NotReviewed`. */
  const [touched, setTouched] = useState({});

  const set = useCallback((key, val) => {
    setSelection((prev) => ({ ...prev, [key]: val }));
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
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
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  const generate = useCallback(() => {
    setGenerating(true);
    setGenLine('Reading the hardware list');
    GEN_LINES.forEach((line, i) => {
      setTimeout(() => setGenLine(line), 320 * (i + 1));
    });
    setTimeout(() => {
      router.push(`/build/result?${toQuery(selection)}`);
    }, 1450);
  }, [router, selection]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  /**
   * Checked against the selection, not the current step — the wizard's step
   * chips let you jump anywhere, so a zero-game state reached on step 1 has
   * to keep blocking "Continue"/"See the build" on every later step too, not
   * just while step 1 happens to be on screen.
   */
  const blocked = selection.games.length === 0;

  const footerSummary = useMemo(
    () =>
      `${selection.games.length} games, ${selection.resolution}, ${selection.fps} fps, ${format(
        selection.budget,
      )}`,
    [selection, format],
  );

  const StepComponent = current.Component;

  return (
    <Main as="main">
      <Chips>
        {STEPS.map((s, i) => {
          const state = i === step ? 'active' : i < step ? 'done' : 'todo';
          const unreviewed = s.key && !touched[s.key];
          return (
            <Chip key={s.n} $state={state} onClick={() => setStep(i)}>
              <ChipNum $state={state}>{s.n}</ChipNum>
              <ChipLabel $state={state}>{s.label}</ChipLabel>
              {unreviewed && (
                <NotReviewed
                  aria-label="Still showing the starting default — not yet reviewed"
                  title="Still showing the starting default — not yet reviewed"
                />
              )}
            </Chip>
          );
        })}
      </Chips>

      <StepBody key={step}>
        <Mono $tone="muted">Step {current.n} of 5</Mono>
        <StepTitle>{current.title}</StepTitle>
        <StepSub>{current.sub}</StepSub>
        {current.key && !touched[current.key] && (
          <Mono $tone="warn" style={{ display: 'block', marginBottom: 24 }}>
            Showing the starting default, not a pick you&rsquo;ve made yet —
            change something below to make it yours.
          </Mono>
        )}
        <StepComponent value={selection} set={set} toggle={toggle} />
      </StepBody>

      <FooterBar>
        {blocked && (
          <FooterWarning as="p">
            Select at least one game on step 1 to continue — the
            build&rsquo;s frame-rate estimates come from these titles.
          </FooterWarning>
        )}
        <FooterInner>
          <FooterBack
            $variant="ghost"
            onClick={() =>
              step === 0 ? router.push('/') : setStep((s) => s - 1)
            }
          >
            Back
          </FooterBack>
          <FooterSummary>{footerSummary}</FooterSummary>
          <FooterNext
            disabled={blocked}
            aria-disabled={blocked}
            onClick={() => (isLast ? generate() : setStep((s) => s + 1))}
          >
            {isLast ? 'See the build' : 'Continue'}
          </FooterNext>
        </FooterInner>
      </FooterBar>

      {generating && (
        <Overlay role="status" aria-live="polite">
          <div>
            <Spinner />
            <OverlayTitle>Matching a build</OverlayTitle>
            <Mono style={{ marginTop: 12 }}>{genLine}</Mono>
          </div>
        </Overlay>
      )}
    </Main>
  );
}
