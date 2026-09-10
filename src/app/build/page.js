import { Suspense } from 'react';
import Wizard from '@/components/build/Wizard';

export const metadata = {
  title: 'Build a PC — PC Builder',
  description:
    'Five steps: games, resolution, frame-rate target, budget, preferences. Get one curated build that holds together.',
};

export default function BuildPage() {
  return (
    <Suspense fallback={null}>
      <Wizard />
    </Suspense>
  );
}
