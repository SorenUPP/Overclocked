'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Container, glass } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';

const NAV = [
  { label: 'Build a PC', href: '/build' },
  { label: 'Builds', href: '/builds' },
  { label: 'Components', href: '/components' },
  { label: 'How it works', href: '/how-it-works' },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.z.header};
  ${glass}
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
  gap: 10px;
  margin-right: auto;
  padding: 15px 24px 15px 0;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Mark = styled.span`
  width: 9px;
  height: 18px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.accent};
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01em;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
`;

const NavItem = styled(Link)`
  position: relative;
  padding: 16px 16px;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  transition: color ${({ theme }) => theme.motion.base};

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform ${({ theme }) => theme.motion.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 0 9px 18px;
`;

export default function Header() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === '/build'
      ? pathname === '/build' || pathname.startsWith('/build/')
      : pathname === href;

  return (
    <Bar>
      <Row>
        <Brand href="/">
          <Mark />
          <Wordmark>PC Builder</Wordmark>
        </Brand>
        <Nav>
          {NAV.map((item) => (
            <NavItem key={item.href} href={item.href} $active={isActive(item.href)}>
              {item.label}
            </NavItem>
          ))}
        </Nav>
        <Cta>
          <ButtonLink href="/build">Build my PC</ButtonLink>
        </Cta>
      </Row>
    </Bar>
  );
}
