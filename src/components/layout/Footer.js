'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { siteStats } from '@/lib/data';

const Wrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 64px;
`;

const Row = styled(Container)`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
  padding-block: 28px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textFaint};

  a {
    color: ${({ theme }) => theme.colors.textMuted};
  }
  a:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Links = styled.nav`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
`;

const Grow = styled.span`
  margin-right: auto;
`;

export default function Footer() {
  return (
    <Wrap>
      <Row>
        <Grow>PC Builder</Grow>
        <Links>
          <Link href="/builds">Builds</Link>
          <Link href="/components">Components</Link>
          <Link href="/how-it-works">How it works</Link>
        </Links>
        <span>
          Reference pricing only. Benchmark data rev. {siteStats.indexRev}.
        </span>
      </Row>
    </Wrap>
  );
}
