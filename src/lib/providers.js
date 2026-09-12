'use client';

import { ThemeProvider } from 'styled-components';
import StyledComponentsRegistry from './registry';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { CurrencyProvider } from '@/lib/currency';

export default function Providers({ children }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CurrencyProvider>{children}</CurrencyProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
