'use client';

import styled from 'styled-components';
import { resolutions } from '@/lib/data';
import { SelectCard } from '@/components/build/SelectCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
`;

const Card = styled(SelectCard)`
  padding: 26px 24px 28px;
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
`;

const Pixels = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.12em;
  margin-top: 8px;
`;

const Desc = styled.p`
  margin: 16px 0 0;
  font-size: 14.5px;
  line-height: 1.58;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function ResolutionStep({ value, set }) {
  return (
    <Grid>
      {resolutions.map((r) => (
        <Card
          key={r.id}
          $selected={value.resolution === r.id}
          $strong
          role="radio"
          aria-checked={value.resolution === r.id}
          tabIndex={0}
          onClick={() => set('resolution', r.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              set('resolution', r.id);
            }
          }}
        >
          <Label>{r.id}</Label>
          <Pixels>{r.pixels}</Pixels>
          <Desc>{r.desc}</Desc>
        </Card>
      ))}
    </Grid>
  );
}
