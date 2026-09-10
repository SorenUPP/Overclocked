'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import {
  Container,
  Mono,
  SectionHeading,
  glassCardInteractive,
} from '@/components/ui/primitives';
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
  ${glassCardInteractive}
  text-align: left;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  border-color: ${({ theme, $rec }) =>
    $rec ? theme.colors.borderAccent : theme.colors.glassBorder};
  background: ${({ theme, $rec }) =>
    $rec ? theme.colors.glassHover : theme.colors.glass};
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
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.glassActive};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radiusSmall};
  padding: 2px 8px;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const PriceLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
`;

const Spec = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 10px;
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
        <SectionHeading>Nearby tiers</SectionHeading>
        <Mono>For context</Mono>
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
