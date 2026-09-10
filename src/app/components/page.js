import PageIntro from '@/components/layout/PageIntro';
import ComponentList from '@/components/components/ComponentList';

export const metadata = {
  title: 'Components — PC Builder',
  description:
    'The full shortlist of parts the recommender draws from, grouped by category with reference prices.',
};

export default function ComponentsPage() {
  return (
    <main>
      <PageIntro title="Tracked components">
        Every part the recommender can put in a build, including the vendor and
        capacity alternates. Prices are reference figures we keep by hand, not a
        live feed.
      </PageIntro>
      <ComponentList />
    </main>
  );
}
