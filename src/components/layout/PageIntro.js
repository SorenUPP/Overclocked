'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';

const Wrap = styled(Container)`
  padding-block: 48px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  font-size: clamp(28px, 3.6vw, 40px);
  font-weight: 600;
  letter-spacing: -0.025em;
  margin: 0;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 620px;
  margin: 12px 0 0;
`;

export default function PageIntro({ title, children }) {
  return (
    <Wrap as="header">
      <Title>{title}</Title>
      {children && <Text>{children}</Text>}
    </Wrap>
  );
}
