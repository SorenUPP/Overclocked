'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';

const NAV = [
  { label: 'Build a PC', href: '/build' },
  { label: 'Builds', href: '/build' },
  { label: 'Components', href: '/build' },
  { label: 'How It Works', href: '/#how-it-works' },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.z.header};
  backdrop-filter: blur(16px);
  background: rgba(6, 6, 10, 0.86);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Row = styled(Container)`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-right: auto;
  padding: 16px 26px 16px 0;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Mark = styled.span`
  width: 12px;
  height: 22px;
  background: linear-gradient(180deg, #b98cff, #6d28d9);
  transform: skewX(-14deg);
  box-shadow: 0 0 16px rgba(157, 107, 255, 0.55);
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const NavItem = styled(Link)`
  padding: 16px 18px;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  border-bottom: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.accentDeep : 'transparent'};
  transition: all 0.16s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-bottom-color: rgba(157, 107, 255, 0.5);
  }
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 20px;
`;

export default function Header() {
  const pathname = usePathname();

  return (
    <Bar>
      <Row>
        <Brand href="/">
          <Mark />
          <Wordmark>PC Builder</Wordmark>
        </Brand>
        <Nav>
          {NAV.map((item, i) => (
            <NavItem
              key={item.label}
              href={item.href}
              $active={i === 0 && pathname.startsWith('/build')}
            >
              {item.label}
            </NavItem>
          ))}
        </Nav>
        <Cta>
          <ButtonLink href="/build">Build My PC</ButtonLink>
        </Cta>
      </Row>
    </Bar>
  );
}
