'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Container, Mono } from '@/components/ui/primitives';
import { siteStats } from '@/lib/data';
import { formatRev } from '@/lib/format';

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Build my PC', href: '/build' },
      { label: 'Builds', href: '/builds' },
      { label: 'Components', href: '/components' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing methodology', href: '/how-it-works#pricing' },
      { label: 'Data & benchmarks', href: '/how-it-works#benchmarks' },
    ],
  },
];

const Wrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 64px;
`;

const Top = styled(Container)`
  display: grid;
  grid-template-columns: 1.3fr repeat(2, 1fr);
  gap: 32px;
  padding-block: 40px 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const Mark = styled.span`
  width: 9px;
  height: 18px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.accent};
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 15px;
`;

const Blurb = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textFaint};
  max-width: 300px;
  margin-top: 14px;
`;

const ColHeading = styled(Mono)`
  color: ${({ theme }) => theme.colors.textFaint};
`;

const ColLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 14px;
`;

const ColLink = styled(Link)`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.motion.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Bottom = styled(Container)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-block: 20px 28px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textGhost};
`;

export default function Footer() {
  return (
    <Wrap>
      <Top>
        <div>
          <Brand>
            <Mark />
            <Wordmark>PC Builder</Wordmark>
          </Brand>
          <Blurb>
            No AI, no live pricing feed — just checked data, fixed rules, and
            one build that fits.
          </Blurb>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <ColHeading>{col.heading}</ColHeading>
            <ColLinks>
              {col.links.map((l) => (
                <ColLink key={l.href} href={l.href}>
                  {l.label}
                </ColLink>
              ))}
            </ColLinks>
          </div>
        ))}
      </Top>
      <Bottom>
        <span>Reference pricing only.</span>
        <span>Benchmark data rev. {formatRev(siteStats.indexRev)}.</span>
      </Bottom>
    </Wrap>
  );
}
