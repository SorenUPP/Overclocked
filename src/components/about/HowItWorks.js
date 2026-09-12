'use client';

import styled from 'styled-components';
import { Container } from '@/components/ui/primitives';
import { siteStats } from '@/lib/data';

const Section = styled(Container)`
  padding-block: 40px 8px;
`;

const Inner = styled.div`
  max-width: 700px;
`;

const Block = styled.section`
  margin-bottom: 34px;
  scroll-margin-top: 84px;
`;

const Heading = styled.h2`
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;

const P = styled.p`
  font-size: 15.5px;
  line-height: 1.66;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 10px;
`;

const Formula = styled.code`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radiusSmall};
  padding: 12px 14px;
  margin: 6px 0 12px;
  overflow-x: auto;
`;

export default function HowItWorks() {
  return (
    <Section as="article">
      <Inner>
      <Block>
        <Heading>The idea</Heading>
        <P>
          Pick your games, the resolution you play at, a frame-rate target and a
          budget. The app matches that against a small set of pre-built machines
          and hands back the one that fits.
        </P>
        <P>
          There is no live pricing feed and no AI in the product. Every result is
          worked out from curated data and fixed rules, so the same inputs always
          give the same build.
        </P>
      </Block>

      <Block>
        <Heading>Why a short list</Heading>
        <P>
          Building from a full parts catalogue means millions of untested
          combinations. Instead we keep about {siteStats.trackedComponents}{' '}
          components and {siteStats.curatedBuilds} builds that a person put
          together and checked. Each build is validated once, not every possible
          permutation.
        </P>
        <P>
          When a major CPU or GPU generation launches, the list is updated by
          hand. It is only ever as current as the last pass, which is a fair
          trade for a project this size.
        </P>
      </Block>

      <Block id="benchmarks">
        <Heading>The frame-rate estimate</Heading>
        <P>
          Each build carries a performance score. Each game carries a load
          figure, and each resolution a scaling factor. The estimate is:
        </P>
        <Formula>
          fps = build score × resolution factor ÷ game load
        </Formula>
        <P>
          The number is rounded and shown as a target, not a promise. Real
          performance moves with settings, drivers, game version and the rest of
          your system. Games not in the table are approximated from a similar
          title.
        </P>
      </Block>

      <Block>
        <Heading>Compatibility</Heading>
        <P>
          For the parts in a build we check the things that actually stop a
          machine working: CPU socket against the board, memory on the board
          support list, GPU length against case clearance, and power-supply
          wattage against measured draw. If your frame-rate target is out of
          reach for a build, that is flagged too.
        </P>
      </Block>

      <Block id="pricing">
        <Heading>Pricing</Heading>
        <P>
          Prices are reference figures kept by hand, not a live quote. Use the
          &ldquo;check current price&rdquo; link on each part to see what it
          costs right now.
        </P>
        <P>
          Every price in the dataset is priced in euros. Switch the currency
          in the header to see the site in dollars or Swedish kronor instead —
          it converts at a fixed rate kept by hand, the same way part prices
          are, not a live feed.
        </P>
      </Block>

      <Block id="value">
        <Heading>Performance per price</Heading>
        <P>
          The &ldquo;Value&rdquo; figure on a build is its performance score
          divided by its reference total, scaled to a round number:
        </P>
        <Formula>value = build score ÷ reference total × 100</Formula>
        <P>
          It is a shorthand for how much performance a build gets you per 100
          spent — useful for comparing tiers, not a substitute for looking at
          the actual parts. Higher is better value; it moves with whichever
          currency you have selected.
        </P>
      </Block>
      </Inner>
    </Section>
  );
}
