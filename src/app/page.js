'use client';

import styled from 'styled-components';

const Main = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(6)};
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 3.5rem);
  letter-spacing: -0.02em;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 42ch;
`;

export default function HomePage() {
  return (
    <Main>
      <Title>Overclocked</Title>
      <Tagline>
        Budget in, games in, target FPS in. A matching PC build out. Foundation is
        set up — features come next.
      </Tagline>
    </Main>
  );
}
