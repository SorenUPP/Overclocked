'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';

const PROPS = [
  {
    n: '01',
    title: 'Target a frame rate',
    body: 'Pick the performance you want. The build works back from that, not from a spec sheet you have to decode.',
  },
  {
    n: '02',
    title: 'Spend where it counts',
    body: 'The GPU sets frame rate at your resolution, so it gets the largest share. Nothing else is left underpowered.',
  },
  {
    n: '03',
    title: 'Parts that fit together',
    body: 'Socket, memory support, GPU clearance and power draw are all checked before the build reaches you.',
  },
  {
    n: '04',
    title: 'A short, curated list',
    body: 'Around 40 parts we track and re-price by hand. Every build was put together by a person.',
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div`
  padding: 26px 26px 30px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
