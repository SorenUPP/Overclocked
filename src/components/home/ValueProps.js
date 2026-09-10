'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';

const PROPS = [
  {
    n: '01',
    title: 'Target FPS',
    body: 'Build around the performance you actually want, not a spec sheet you have to interpret.',
  },
  {
    n: '02',
    title: 'Your budget',
    body: 'Money goes where frames come from. The GPU gets priority; nothing else is starved.',
  },
  {
    n: '03',
    title: 'Verified compatibility',
    body: 'Socket, memory QVL, GPU clearance and wattage are checked before a build reaches you.',
  },
  {
    n: '04',
    title: 'Curated hardware',
    body: 'A maintained shortlist of parts we track and re-price — reviewed by a human, not generated.',
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

const Cell = styled.div`
  padding: 30px 26px 34px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.tintAccentFaint};
  }
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.accentDeep};
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 14px 0 10px;
`;

const Body = styled.p`
  font-size: 14.5px;
  line-height: 1.58;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function ValueProps() {
  return (
    <Container as="section">
      <Grid>
        {PROPS.map((p) => (
          <Cell key={p.n}>
            <Num>{p.n}</Num>
            <Name>{p.title}</Name>
            <Body>{p.body}</Body>
          </Cell>
        ))}
      </Grid>
    </Container>
  );
}
