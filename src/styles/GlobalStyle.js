'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    max-width: 100vw;
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.bg};
  }

  body {
    background:
      radial-gradient(
        1100px 620px at 12% -8%,
        rgba(255, 255, 255, 0.06),
        transparent 60%
      ),
      radial-gradient(
        1000px 700px at 100% 0%,
        rgba(255, 255, 255, 0.04),
        transparent 55%
      ),
      radial-gradient(
        900px 900px at 50% 120%,
        rgba(255, 255, 255, 0.03),
        transparent 60%
      ),
      ${({ theme }) => theme.colors.bg};
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.accentBright};
  }

  /* Inline links inside body copy get an underline so they read as links. */
  p a {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.borderStrong};
    text-underline-offset: 3px;
  }
  p a:hover {
    text-decoration-color: ${({ theme }) => theme.colors.text};
  }

  button {
    font-family: inherit;
  }

  :focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.bg},
      0 0 0 4px ${({ theme }) => theme.colors.focusRing};
    border-radius: ${({ theme }) => theme.radiusSmall};
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.textFaint};
  }

  ::selection {
    background: rgba(255, 255, 255, 0.18);
  }

  @keyframes dc-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes dc-rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }
  @keyframes dc-bar-in {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
