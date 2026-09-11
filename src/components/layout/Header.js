'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Container, glass } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/Button';

/**
 * "Build my PC" is deliberately not in this list — it's the primary action
 * and lives in its own `Cta` button so it never reads as just another link.
 */
const NAV = [
  { label: 'Builds', href: '/builds' },
  { label: 'Components', href: '/components' },
  { label: 'How it works', href: '/how-it-works' },
];

/** Below this, the inline nav collapses into the hamburger menu. */
const NAV_BREAK = '760px';

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
  border-radius: 2px;
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
  font-size: 14px;

  @media (max-width: ${NAV_BREAK}) {
    display: none;
  }
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

  @media (max-width: ${NAV_BREAK}) {
    display: none;
  }
`;

/** Hamburger / close toggle. Three bars morph into an X when open. */
const MenuToggle = styled.button`
  display: none;
  position: relative;
  flex: none;
  width: 40px;
  height: 40px;
  margin-block: auto;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusSmall};
  background: transparent;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base};

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
    border-color: ${({ theme }) => theme.colors.glassBorderStrong};
  }

  span {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 1.5px;
    background: ${({ theme }) => theme.colors.text};
    transition: transform ${({ theme }) => theme.motion.base},
      opacity ${({ theme }) => theme.motion.base},
      top ${({ theme }) => theme.motion.base};
  }

  span:nth-child(1) {
    top: ${({ $open }) => ($open ? '19.5px' : '14px')};
    transform: rotate(${({ $open }) => ($open ? '45deg' : '0')});
  }
  span:nth-child(2) {
    top: 19.5px;
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  span:nth-child(3) {
    top: ${({ $open }) => ($open ? '19.5px' : '25px')};
    transform: rotate(${({ $open }) => ($open ? '-45deg' : '0')});
  }

  @media (max-width: ${NAV_BREAK}) {
    display: block;
  }
`;

const MobilePanel = styled.div`
  display: none;

  @media (max-width: ${NAV_BREAK}) {
    display: block;
    overflow: hidden;
    max-height: ${({ $open }) => ($open ? '420px' : '0')};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transition:
      max-height ${({ theme }) => theme.motion.slow},
      opacity ${({ theme }) => theme.motion.base};
    ${glass}
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 6px 20px 14px;
`;

const MobileNavItem = styled(Link)`
  padding: 13px 4px;
  font-size: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  transition: color ${({ theme }) => theme.motion.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const MobileCta = styled(ButtonLink)`
  margin-top: 14px;
  width: 100%;
`;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === '/build'
      ? pathname === '/build' || pathname.startsWith('/build/')
      : pathname === href;

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

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
        <MenuToggle
          type="button"
          $open={open}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </MenuToggle>
      </Row>
      <MobilePanel $open={open} id="mobile-nav">
        <MobileNav aria-hidden={!open}>
          {NAV.map((item) => (
            <MobileNavItem
              key={item.href}
              href={item.href}
              $active={isActive(item.href)}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </MobileNavItem>
          ))}
          <MobileCta href="/build" tabIndex={open ? 0 : -1}>
            Build my PC
          </MobileCta>
        </MobileNav>
      </MobilePanel>
    </Bar>
  );
}
