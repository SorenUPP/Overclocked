'use client';

import styled from 'styled-components';
import { preferences } from '@/lib/data';
import { SelectCard, Tick } from '@/components/build/SelectCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 10px;
`;

const Card = styled(SelectCard)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
`;

const Box = styled(Tick)`
  width: 16px;
  height: 16px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Tag = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.textFaint};
  margin-top: 4px;
  letter-spacing: 0.01em;
`;

const Comment = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textFaint};
  margin: 20px 0 0;
`;

export default function PreferencesStep({ value, toggle }) {
  return (
    <div>
      <Grid>
        {preferences.map((p) => {
          const on = value.prefs.includes(p.id);
          return (
            <Card
              key={p.id}
              $selected={on}
              role="checkbox"
              aria-checked={on}
              tabIndex={0}
              onClick={() => toggle('prefs', p.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle('prefs', p.id);
                }
              }}
            >
              <Box as="span" $on={on}>
                {on ? '✓' : ''}
              </Box>
              <div>
                <Label>{p.label}</Label>
                <Tag>{p.tag}</Tag>
              </div>
            </Card>
          );
        })}
      </Grid>
      <Comment>
        All optional. Where a matching alternate part exists it is swapped in,
        and the reference total updates to match. Anything this build cannot do
        is flagged on the result rather than hidden.
      </Comment>
    </div>
  );
}
