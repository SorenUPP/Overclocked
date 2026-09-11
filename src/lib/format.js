const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "2026.09" -> "Sep 2026". Falls back to the raw string if it doesn't parse. */
export function formatRev(rev) {
  const [year, month] = String(rev).split('.').map(Number);
  const name = MONTHS[month - 1];
  return name ? `${name} ${year}` : String(rev);
}

/** 24800 -> "24.8k". Leaves smaller numbers as plain integers. */
export function formatCompact(n) {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k % 1 === 0 ? k : k.toFixed(1)}k`;
}
