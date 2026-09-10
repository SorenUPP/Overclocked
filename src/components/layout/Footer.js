'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { siteStats } from '@/lib/data';

const Wrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Row = styled(Container)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  padding-block: 30px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Grow = styled.span`
  margin-right: auto;
`;

export default function Footer() {
  return (
    <Wrap>
      <Row>
        <Grow>PC Builder · curated hardware index</Grow>
        <span>Reference pricing only</span>
        <span>Benchmark data rev. {siteStats.indexRev}</span>
      </Row>
    </Wrap>
  );
}
