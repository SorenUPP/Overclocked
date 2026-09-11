'use client';

import styled from 'styled-components';
import { Container, Mono, glassCard } from '@/components/ui/primitives';

/** Same stroke-based icon language as PartImage's category glyphs — line
 * geometry on a 32x32 grid, no fills, so a new icon here reads as part of
 * the same system instead of a mismatched pictogram set. */
function StepIcon({ id }) {
  switch (id) {
    case 'target':
      return (
        <g>
          <path d="M5 22a11 11 0 1 1 22 0" />
          <circle cx="16" cy="22" r="1.4" style={{ fill: 'currentColor', stroke: 'none' }} />
          <line x1="16" y1="22" x2="22" y2="14" />
          <line x1="16" y1="6" x2="16" y2="9" />
        </g>
      );
    case 'spend':
      return (
        <g>
          <line x1="5" y1="26" x2="27" y2="26" />
          <rect x="7" y="18" width="5" height="8" />
          <rect x="14.5" y="12" width="5" height="14" />
          <rect x="22" y="6" width="5" height="20" />
        </g>
      );
    case 'fit':
      return (
        <g>
          <rect x="4" y="10" width="12" height="12" rx="1.5" />
          <rect x="16" y="10" width="12" height="12" rx="1.5" />
          <line x1="16" y1="14" x2="16" y2="18" />
        </g>
      );
    case 'catalogue':
    default:
      return (
        <g>
          {[6, 14, 22].map((y) => (
            <g key={y}>
              <rect x="4" y={y - 2.5} width="5" height="5" rx="0.75" />
              <line x1="13" y1={y} x2="28" y2={y} />
            </g>
          ))}
        </g>
      );
  }
}

const PROPS = [
  {
    n: '01',
    icon: 'target',
    title: 'Target a frame rate',
    body: 'Pick the performance you want. The build works back from that, not from a spec sheet you have to decode.',
  },
  {
    n: '02',
    icon: 'spend',
    title: 'Spend where it counts',
    body: 'The GPU sets frame rate at your resolution, so it gets the largest share. Nothing else is left underpowered.',
  },
  {
    n: '03',
    icon: 'fit',
    title: 'Parts that fit together',
    body: 'Socket, memory support, GPU clearance and power draw are all checked before the build reaches you.',
  },
  {
    n: '04',
    icon: 'catalogue',
    title: 'A curated catalogue',
    body: 'Roughly 90 components we track and re-price by hand, each build assembled and checked by a person.',
  },
];

const Section = styled(Container)`
  padding-block: 64px 68px;

  @media (max-width: 700px) {
    padding-block: 48px 52px;
  }
`;

const Head = styled.div`
  margin-bottom: 28px;
`;

const Heading = styled.h2`
  font-size: clamp(22px, 2.6vw, 28px);
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 10px 0 0;
`;

const Grid = styled.div`
  ${glassCard}
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: hidden;

  @media (min-width: 901px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div`
  position: relative;
  padding: 26px 26px 30px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    background ${({ theme }) => theme.motion.base},
    transform ${({ theme }) => theme.motion.base};

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    transform: translateY(-2px);
  }

  @media (min-width: 901px) {
    /* Single row of four: no second row, so no cell needs a bottom border,
       and only the last cell should be flush on the right. */
    border-bottom: 0;

    &:last-child {
      border-right: 0;
    }

    /* The connecting arrow that gives the row a sense of progression —
       skipped on the last step, and only shown once cells sit in one row. */
    &:not(:last-child)::after {
      content: '→';
      position: absolute;
      top: 50%;
      right: -11px;
      transform: translate(-50%, -50%);
      z-index: 1;
      display: grid;
      place-items: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.bg};
      border: 1px solid ${({ theme }) => theme.colors.border};
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: 11px;
      color: ${({ theme }) => theme.colors.textFaint};
    }
  }

  @media (max-width: 640px) {
    border-right: 0;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const IconWrap = styled.div`
  width: 34px;
  height: 34px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.textDim};

  svg {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.15;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Name = styled.h3`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 10px 0 8px;
`;

const Body = styled.p`
  font-size: 14.5px;
  line-height: 1.58;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function ValueProps() {
  return (
    <Section as="section">
      <Head>
        <Mono $tone="muted">How it works</Mono>
        <Heading>Four inputs. One build that fits.</Heading>
      </Head>
      <Grid>
        {PROPS.map((p) => (
          <Cell key={p.n}>
            <IconWrap>
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <StepIcon id={p.icon} />
              </svg>
            </IconWrap>
            <Num>{p.n}</Num>
            <Name>{p.title}</Name>
            <Body>{p.body}</Body>
          </Cell>
        ))}
      </Grid>
    </Section>
  );
}
