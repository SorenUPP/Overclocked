import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SELECTION,
  parseSelection,
  toQuery,
} from '@/lib/build-params';

const params = (str) => new URLSearchParams(str);

describe('parseSelection', () => {
  it('returns the defaults for an empty query (preferences opt-in)', () => {
    const s = parseSelection(params(''));
    expect(s.games).toEqual(DEFAULT_SELECTION.games);
    expect(s.resolution).toBe('1440p');
    expect(s.fps).toBe(144);
    expect(s.budget).toBe(1650);
    expect(s.prefs).toEqual([]);
  });

  it('drops unknown game ids and keeps the valid ones', () => {
    const s = parseSelection(params('games=foo,valorant,bar'));
    expect(s.games).toEqual(['valorant']);
  });

  it('rejects out-of-range resolution, fps and budget', () => {
    const s = parseSelection(params('res=8k&fps=999&budget=1000'));
    expect(s.resolution).toBe('1440p');
    expect(s.fps).toBe(144);
    expect(s.budget).toBe(1650);
  });

  it('accepts valid non-default values', () => {
    const s = parseSelection(params('res=4K&fps=60&budget=3450&prefs=quiet,rgb'));
    expect(s.resolution).toBe('4K');
    expect(s.fps).toBe(60);
    expect(s.budget).toBe(3450);
    expect(s.prefs).toEqual(['quiet', 'rgb']);
  });

  it('reads from a plain object too', () => {
    const s = parseSelection({ res: '1080p', fps: '240', budget: '900' });
    expect(s.resolution).toBe('1080p');
    expect(s.fps).toBe(240);
    expect(s.budget).toBe(900);
  });
});

describe('toQuery', () => {
  it('round-trips a full selection', () => {
    const round = parseSelection(params(toQuery(DEFAULT_SELECTION)));
    expect(round.games).toEqual(DEFAULT_SELECTION.games);
    expect(round.resolution).toBe(DEFAULT_SELECTION.resolution);
    expect(round.fps).toBe(DEFAULT_SELECTION.fps);
    expect(round.budget).toBe(DEFAULT_SELECTION.budget);
    expect(round.prefs).toEqual(DEFAULT_SELECTION.prefs);
  });

  it('omits empty games and preferences', () => {
    const q = toQuery({
      games: [],
      resolution: '1440p',
      fps: 144,
      budget: 1650,
      prefs: [],
    });
    expect(q).toBe('res=1440p&fps=144&budget=1650');
  });
});
