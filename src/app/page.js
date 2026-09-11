import Hero from '@/components/home/Hero';
import ValueProps from '@/components/home/ValueProps';
import WhyTrust from '@/components/home/WhyTrust';
import Principle from '@/components/home/Principle';
import FinalCta from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <WhyTrust />
      <Principle />
      <FinalCta />
    </main>
  );
}
