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
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.accentBright};
  }

  button {
    font-family: inherit;
  }

  input::placeholder {
    color: #55596A;
  }

  ::selection {
    background: rgba(157, 107, 255, 0.28);
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
