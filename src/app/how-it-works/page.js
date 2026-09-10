import PageIntro from '@/components/layout/PageIntro';
import HowItWorks from '@/components/about/HowItWorks';

export const metadata = {
  title: 'How it works — PC Builder',
  description:
    'What the recommender does, why it uses a curated short list instead of a live catalogue, and how the frame-rate estimate is calculated.',
};

export default function HowItWorksPage() {
  return (
    <main>
      <PageIntro title="How it works">
        A deterministic recommender built on curated data. No live pricing, no
        AI in the product.
      </PageIntro>
      <HowItWorks />
    </main>
  );
}
