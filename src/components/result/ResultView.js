'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { parseSelection } from '@/lib/build-params';
import { recommend } from '@/lib/recommend';
import ResultHero from '@/components/result/ResultHero';
import BuildOverview from '@/components/result/BuildOverview';
import ComponentsGrid from '@/components/result/ComponentsGrid';
import BudgetAndCompat from '@/components/result/BudgetAndCompat';
import CompareTiers from '@/components/result/CompareTiers';

export default function ResultView() {
  const searchParams = useSearchParams();

  const result = useMemo(
    () => recommend(parseSelection(searchParams)),
    [searchParams],
  );

  return (
    <main>
      <ResultHero result={result} />
      <BuildOverview result={result} />
      <ComponentsGrid result={result} />
      <BudgetAndCompat result={result} />
      <CompareTiers result={result} />
    </main>
  );
}
