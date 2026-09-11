/**
 * There's no live pricing feed (see ProjectInstructions.md) — reference prices
 * in the data are kept by hand and drift from the market between updates.
 * Rather than presenting a stale figure as current, every price in the UI
 * pairs with a link to an actual, live price search.
 */
export function retailerSearchUrl(part) {
  const q = encodeURIComponent(`${part.brand} ${part.name}`.trim());
  return `https://www.google.com/search?q=${q}+price`;
}
