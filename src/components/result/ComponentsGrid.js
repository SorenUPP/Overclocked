'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Container, Mono, SectionHeading, glassCard } from '@/components/ui/primitives';
import { PartImage, ImageLightbox, useImagePreview } from '@/components/ui/PartImage';
import { retailerSearchUrl } from '@/lib/retailer';
import { useCurrency } from '@/lib/currency';

const Section = styled(Container)`
  padding-block: 56px 0;
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 14px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 14px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  ${glassCard}
  overflow: hidden;
  transition:
    border-color ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.glassBorderStrong};
    box-shadow: ${({ theme }) => theme.shadowLift};
  }
`;

const Body = styled.div`
  padding: 15px 16px;
`;

const Info = styled.div`
  min-width: 0;
`;

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
`;

const PartName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15.5px;
  font-weight: 600;
  letter-spacing: -0.012em;
  margin-top: 7px;
  line-height: 1.3;
`;

const Specs = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 7px;
  line-height: 1.5;
`;

const PriceLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 11px;
  flex-wrap: wrap;
`;

const Compat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textFaint};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.ok};
  }
`;

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.015em;
`;

const RefTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Foot = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FootBtn = styled.button`
  flex: 1;
  padding: 10px 16px;
  cursor: pointer;
  background: transparent;
  border: 0;
  text-align: left;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    color ${({ theme }) => theme.motion.base},
    background ${({ theme }) => theme.motion.base};

  &:last-child {
    border-right: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.glass};
  }
`;

const Why = styled.div`
  padding: 13px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.tintAccentFaint};

  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export default function ComponentsGrid({ result }) {
  const [open, setOpen] = useState(null);
  const { previewed, open: openPreview, close: closePreview } = useImagePreview();
  const { build } = result;
  const { format } = useCurrency();

  return (
    <Section as="section">
      <Head>
        <SectionHeading>Components</SectionHeading>
        <Mono>{build.parts.length} parts</Mono>
      </Head>
      <Grid>
        {build.parts.map((p) => {
          const isOpen = open === p.category;
          return (
            <Card key={p.category}>
              <PartImage part={p} ratio="16 / 10" flush onOpen={openPreview} />
              <Body>
                <Info>
                  <TopLine>
                    <Mono $tone={p.replacedName ? 'accent' : undefined}>
                      {p.category}
                      {p.replacedName ? ' · your pick' : ''}
                    </Mono>
                    <Mono>{p.brand}</Mono>
                  </TopLine>
                  <PartName>{p.name}</PartName>
                  <Specs>{p.specs}</Specs>
                  {p.replacedName && (
                    <Specs style={{ opacity: 0.7 }}>
                      in place of {p.replacedName}
                    </Specs>
                  )}
                  <PriceLine>
                    <Compat>Compatible</Compat>
                    <Price>
                      {format(p.price)} <RefTag>ref.</RefTag>
                    </Price>
                  </PriceLine>
                </Info>
              </Body>
              <Foot>
                <FootBtn
                  onClick={() => setOpen(isOpen ? null : p.category)}
                  aria-expanded={isOpen}
                  aria-label={
                    isOpen
                      ? `Hide the reasoning for ${p.category}`
                      : `Why this ${p.category}?`
                  }
                >
                  {isOpen ? 'Hide the reasoning' : 'Why this part?'}
                </FootBtn>
                <FootBtn
                  as="a"
                  href={retailerSearchUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Check current price for ${p.brand} ${p.name}`}
                >
                  Check current price
                </FootBtn>
              </Foot>
              {isOpen && (
                <Why>
                  <p>{p.why}</p>
                  <Mono style={{ marginTop: 10 }}>
                    Reference {format(p.price)}. {p.perfImpact} effect on frame
                    rate.
                  </Mono>
                </Why>
              )}
            </Card>
          );
        })}
      </Grid>
      <ImageLightbox part={previewed} onClose={closePreview} />
    </Section>
  );
}
