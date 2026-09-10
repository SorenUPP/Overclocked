'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Container, Mono, SectionHeading, Hatch } from '@/components/ui/primitives';
import { money } from '@/lib/recommend';

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
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderAccent};
  }
`;

const Body = styled.div`
  display: flex;
  gap: 14px;
  padding: 16px;
`;

const Thumb = styled(Hatch)`
  width: 84px;
  height: 84px;
  flex: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 8.5px;
`;

const Info = styled.div`
  min-width: 0;
  flex: 1;
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
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ok};

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    background: ${({ theme }) => theme.colors.ok};
  }
`;

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const Foot = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FootBtn = styled.button`
  flex: 1;
  padding: 11px 16px;
  cursor: pointer;
  background: transparent;
  border: 0;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Why = styled.div`
  padding: 14px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.tintAccent};

  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: #b9bdcb;
  }
`;

function retailerSearch(part) {
  const q = encodeURIComponent(`${part.brand} ${part.name}`);
  return `https://www.google.com/search?q=${q}+price`;
}

export default function ComponentsGrid({ result }) {
  const [open, setOpen] = useState(null);
  const { build } = result;

  return (
    <Section as="section">
      <Head>
        <SectionHeading>Components</SectionHeading>
        <Mono>{build.parts.length} parts · all in stock at reference retailers</Mono>
      </Head>
      <Grid>
        {build.parts.map((p) => {
          const isOpen = open === p.category;
          return (
            <Card key={p.category}>
              <Body>
                <Thumb>{p.category.toLowerCase()} shot</Thumb>
                <Info>
                  <TopLine>
                    <Mono $tone="accent">{p.category}</Mono>
                    <Mono>{p.brand}</Mono>
                  </TopLine>
                  <PartName>{p.name}</PartName>
                  <Specs>{p.specs}</Specs>
                  <PriceLine>
                    <Compat>Compatible</Compat>
                    <Price>{money(p.price)}</Price>
                  </PriceLine>
                </Info>
              </Body>
              <Foot>
                <FootBtn
                  onClick={() => setOpen(isOpen ? null : p.category)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? 'Hide reasoning −' : 'Why this part? +'}
                </FootBtn>
                <FootBtn
                  as="a"
                  href={retailerSearch(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check current price ↗
                </FootBtn>
              </Foot>
              {isOpen && (
                <Why>
                  <p>{p.why}</p>
                  <Mono style={{ marginTop: 10 }}>
                    Reference price {money(p.price)} · {p.perfImpact} impact on
                    frame rate
                  </Mono>
                </Why>
              )}
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}
