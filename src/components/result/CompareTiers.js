'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Container, Mono, SectionHeading } from '@/components/ui/primitives';
import { toQuery } from '@/lib/build-params';

const Section = styled(Container)`
  padding-block: 56px 110px;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
`;

const Card = styled.button`
  text-align: left;
  cursor: pointer;
  padding: 0;
  transition: all 0.18s ease;
  border: 1px solid
    ${({ theme, $rec }) =>
      $rec ? theme.colors.accentDeep : theme.colors.border};
  background: ${({ theme, $rec }) =>
    $rec
      ? 'linear-gradient(165deg, rgba(157,107,255,.12), rgba(255,255,255,.01))'
      : theme.colors.surface};
  box-shadow: ${({ $rec }) =>
    $rec ? '0 14px 44px rgba(109,40,217,.3)' : 'none'};
  transform: ${({ $rec }) => ($rec ? 'translateY(-6px)' : 'none')};
`;

const CardHead = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onAccent};
  background: ${({ theme }) => theme.colors.accent};
  padding: 3px 7px;
`;

const CardBody = styled.div`
  padding: 22px 20px 24px;
`;

const PriceLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
`;

const Spec = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 10px;
  letter-spacing: 0.06em;
`;

const Note = styled.div`
  font-size: 14px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 14px;
`;

export default function CompareTiers({ result }) {
  const router = useRouter();
  const { compareTiers, input } = result;

  return (
    <Section as="section">
      <Head>
        <SectionHeading>Compare tiers</SectionHeading>
        <Mono>Context, not upsell</Mono>
      </Head>
      <Grid>
        {compareTiers.map((tier) => {
          const rec = tier.role === 'matched';
          return (
            <Card
              key={tier.build.id}
              $rec={rec}
              onClick={() =>
                router.push(
                  `/build/result?${toQuery({
                    ...input,
                    budget: tier.build.budget,
                  })}`,
                )
              }
            >
              <CardHead>
                <Mono $tone={rec ? 'accent' : undefined}>{tier.label}</Mono>
                {rec && <Badge>Matched</Badge>}
              </CardHead>
              <CardBody>
                <PriceLabel>{tier.build.budgetLabel}</PriceLabel>
                <Spec>{tier.spec}</Spec>
                <Note>{tier.note}</Note>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}
