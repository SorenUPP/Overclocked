import { Suspense } from 'react';
import ResultView from '@/components/result/ResultView';

export const metadata = {
  title: 'Your recommended PC — PC Builder',
  description:
    'One curated build matched to your games, resolution, frame-rate target and budget — with per-game performance estimates and compatibility checks.',
};

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultView />
    </Suspense>
  );
}
