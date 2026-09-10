import PageIntro from '@/components/layout/PageIntro';
import BuildsGrid from '@/components/builds/BuildsGrid';
import { siteStats } from '@/lib/data';

export const metadata = {
  title: 'Builds — PC Builder',
  description:
    'Every curated build, one per budget tier. Open one to see parts, performance estimates and compatibility.',
};

export default function BuildsPage() {
  return (
    <main>
      <PageIntro title="The builds">
        One build per budget tier, each put together and checked by hand. Open
        one to see the full parts list, per-game frame-rate estimates and the
        compatibility checks. Hardware list updated {siteStats.indexRev}.
      </PageIntro>
      <BuildsGrid />
    </main>
  );
}
