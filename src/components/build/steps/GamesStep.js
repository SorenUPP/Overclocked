'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { games } from '@/lib/data';
import { Mono } from '@/components/ui/primitives';
import { SelectCard, Tick } from '@/components/build/SelectCard';

const Search = styled.input`
  width: 100%;
  max-width: 360px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius};
  padding: 11px 13px;
  margin-bottom: 20px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
`;

const Card = styled(SelectCard)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 15px;
`;

const Box = styled(Tick)`
  width: 16px;
  height: 16px;
`;

const GameName = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
`;

const Count = styled(Mono)`
  display: block;
  margin-top: 18px;
`;

export default function GamesStep({ value, toggle }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? games.filter((g) => g.name.toLowerCase().includes(q)) : games;
  }, [query]);

  return (
    <div>
      <Search
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games"
        aria-label="Search games"
      />
      <Grid>
        {filtered.map((g) => {
          const selected = value.games.includes(g.id);
          return (
            <Card
              key={g.id}
              $selected={selected}
              role="checkbox"
              aria-checked={selected}
              tabIndex={0}
              onClick={() => toggle('games', g.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle('games', g.id);
                }
              }}
            >
              <Box as="span" $on={selected}>
                {selected ? '✓' : ''}
              </Box>
              <div>
                <GameName>{g.name}</GameName>
                <Mono style={{ marginTop: 3, fontSize: '10.5px' }}>{g.tag}</Mono>
              </div>
            </Card>
          );
        })}
      </Grid>
      <Count>
        {value.games.length} of {games.length} selected
      </Count>
    </div>
  );
}
