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
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radius};
  padding: 11px 14px;
  margin-bottom: 20px;
  outline: none;
  transition:
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderAccent};
    background: ${({ theme }) => theme.colors.glassHover};
  }
`;

/** A grid of poster-shaped tiles — narrower columns than a spec-sheet grid. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

/**
 * A movie-poster-style select card: the art is the card, with the name and
 * tag overlaid at the bottom over a gradient scrim. Games without sourced
 * cover art (not on Steam, or not yet released) fall back to a plain matte
 * tile with the name set large — still reads as a poster, just typographic.
 */
const Card = styled(SelectCard)`
  position: relative;
  aspect-ratio: 2 / 3;
  padding: 0;
  overflow: hidden;
  background: ${({ theme, $hasPoster }) =>
    $hasPoster ? theme.colors.surfaceRaised : undefined};
`;

const Poster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.motion.base};

  ${Card}:hover &,
  ${Card}:focus-visible & {
    transform: scale(1.05);
  }
`;

/** Games with no sourced cover art get a plain textured tile behind the name. */
const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: radial-gradient(
      130% 160% at 28% 15%,
      rgba(255, 255, 255, 0.08),
      transparent 65%
    ),
    ${({ theme }) => theme.colors.surfaceRaised};
`;

/**
 * A handful of titles aren't sold anywhere with photographic cover art (not
 * on Steam, live-service games with no box) — Wikimedia Commons has their
 * official wordmark as a free-licensed vector instead, rendered centered on
 * the same textured tile as the plain fallback. Single-colour wordmarks
 * (Fortnite, Valorant, League) get crushed to solid white for the monochrome
 * palette; two-tone marks (Minecraft's shaded block lettering) lose the
 * shading — and with it, legibility — under that same filter, so those keep
 * their native colours instead (`$native`, set per-game in games.json).
 */
const LogoMark = styled.img`
  width: 66%;
  max-height: 46%;
  object-fit: contain;
  filter: ${({ $native }) => ($native ? 'none' : 'brightness(0) invert(1)')};
  opacity: ${({ $native }) => ($native ? 1 : 0.92)};
  transition: transform ${({ theme }) => theme.motion.base};

  ${Card}:hover &,
  ${Card}:focus-visible & {
    transform: scale(1.06);
  }
`;

/** Real cover art if we have it; a free-licensed wordmark or plain tile otherwise. */
function GameArt({ game }) {
  const [broken, setBroken] = useState(false);
  const isLogo = game.poster?.endsWith('.svg');

  if (!game.poster || broken) {
    return <Fallback />;
  }
  if (isLogo) {
    return (
      <Fallback>
        <LogoMark
          src={game.poster}
          alt=""
          loading="lazy"
          $native={game.posterNativeColor}
          onError={() => setBroken(true)}
        />
      </Fallback>
    );
  }
  return <Poster src={game.poster} alt="" loading="lazy" onError={() => setBroken(true)} />;
}

const Scrim = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 26px 10px 10px;
  background: linear-gradient(
    to top,
    rgba(4, 4, 5, 0.95) 0%,
    rgba(4, 4, 5, 0.95) 40%,
    rgba(4, 4, 5, 0.75) 60%,
    transparent 100%
  );
`;

const GameName = styled.div`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};
`;

const Box = styled(Tick)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: ${({ theme, $on }) => ($on ? theme.colors.accent : theme.colors.glassChrome)};
  box-shadow: ${({ theme }) => theme.shadow};
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
              $hasPoster={Boolean(g.poster)}
              role="checkbox"
              aria-checked={selected}
              aria-label={`${g.name} — ${g.tag}`}
              tabIndex={0}
              onClick={() => toggle('games', g.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle('games', g.id);
                }
              }}
            >
              <GameArt game={g} />
              <Box as="span" $on={selected}>
                {selected ? '✓' : ''}
              </Box>
              <Scrim>
                <GameName>{g.name}</GameName>
                <Mono style={{ marginTop: 3, fontSize: '10px' }}>{g.tag}</Mono>
              </Scrim>
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
