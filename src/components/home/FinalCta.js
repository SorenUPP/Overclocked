'use client';

import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';

/**
 * The hero's CTA repeated at the bottom of the page, so the primary action
 * is still one click away for anyone who scrolled through the rest of the
 * pitch without converting.
 */
const Section = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Inner = styled(Container)`
  padding-block: 64px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: clamp(24px, 3.4vw, 34px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 12px 0 0;
  max-width: 560px;
  text-wrap: balance;
`;

export default function FinalCta() {
  return (
    <Section>
      <Inner>
        <Mono $tone="muted">Ready when you are</Mono>
        <Heading>Answer four questions. Get one build that fits together.</Heading>
        <ButtonLink href="/build" $size="lg" style={{ marginTop: 28 }}>
          Build my PC
        </ButtonLink>
      </Inner>
    </Section>
  );
}
