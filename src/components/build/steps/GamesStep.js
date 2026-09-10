'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { games } from '@/lib/data';
import { Mono, Hatch } from '@/components/ui/primitives';
import { SelectCard } from '@/components/build/SelectCard';

const Search = styled.input`
  width: 100%;
  max-width: 380px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius};
  padding: 13px 15px;
  margin-bottom: 22px;
  outline: none;
  transition: all 0.16s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accentDeep};
    background: ${({ theme }) => theme.colors.tintAccentFaint};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
  gap: 12px;
`;

const Card = styled(SelectCard)`
  position: relative;
`;

const Art = styled(Hatch)`
  aspect-ratio: 16 / 10;
  position: relative;
`;

const CheckMark = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onAccent};
  border: 1px solid
    ${({ theme, $on }) => ($on ? theme.colors.accent : theme.colors.borderStrong)};
  background: ${({ theme, $on }) => ($on ? theme.colors.accent : 'transparent')};
`;

const Meta = styled.div`
  padding: 11px 12px 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const GameName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.25;
`;

const Count = styled(Mono)`
  margin-top: 20px;
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
        placeholder="Search the game index…"
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
              <Art>
                <span>key art</span>
                <CheckMark $on={selected}>{selected ? '✓' : ''}</CheckMark>
              </Art>
              <Meta>
                <GameName>{g.name}</GameName>
                <Mono style={{ marginTop: 6, fontSize: '10px' }}>{g.tag}</Mono>
              </Meta>
            </Card>
          );
        })}
      </Grid>
      <Count>
        {value.games.length} of {games.length} selected — pick as many as you like
      </Count>
    </div>
  );
}
