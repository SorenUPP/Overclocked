'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Every price in the dataset is authored in euros (see src/data/README.md).
 * This app has no live pricing API and no paid APIs — so, consistent with
 * that, currency conversion uses static hand-set rates instead of a live feed.
 * They're approximate and go stale the same way part prices do; refresh them
 * the same way (see the data README's price-drift note) rather than wiring
 * up a rates API.
 */
export const CURRENCIES = {
  EUR: { label: 'EUR', symbol: '€', rate: 1, locale: 'en-US' },
  USD: { label: 'USD', symbol: '$', rate: 1.08, locale: 'en-US' },
  SEK: { label: 'SEK', symbol: 'kr', rate: 11.4, locale: 'sv-SE' },
};

export const CURRENCY_IDS = Object.keys(CURRENCIES);

const DEFAULT_CURRENCY = 'EUR';
const STORAGE_KEY = 'overclocked:currency';

const CurrencyContext = createContext(null);

function readStoredCurrency() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && CURRENCIES[stored] ? stored : null;
  } catch {
    // Private browsing or blocked storage — fall back to the default silently.
    return null;
  }
}

/** Format a number that is already denominated in `currencyId` — no rate
 *  conversion applied. Use this for amounts you've already converted, or for
 *  a plain figure (like a per-100 unit label) that was never in euros. */
export function formatAmount(amount, currencyId = DEFAULT_CURRENCY) {
  const { symbol, locale } = CURRENCIES[currencyId] || CURRENCIES[DEFAULT_CURRENCY];
  const digits = Math.round(amount).toLocaleString(locale);
  return currencyId === 'SEK' ? `${digits} ${symbol}` : `${symbol}${digits}`;
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);

  // Read the saved preference after mount — localStorage isn't available
  // during server rendering, so the first render always shows EUR.
  useEffect(() => {
    const stored = readStoredCurrency();
    if (stored) setCurrencyState(stored);
  }, []);

  const setCurrency = (id) => {
    if (!CURRENCIES[id]) return;
    setCurrencyState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Choice just won't persist across visits.
    }
  };

  const value = useMemo(() => {
    const convert = (eur) => eur * CURRENCIES[currency].rate;
    const format = (eur) => formatAmount(convert(eur), currency);
    return {
      currency,
      setCurrency,
      symbol: CURRENCIES[currency].symbol,
      convert,
      format,
      formatAmount: (amount) => formatAmount(amount, currency),
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
}
