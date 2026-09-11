import { games, resolutions, fpsTargets, preferences, builds } from '@/lib/data';

/**
 * URL <-> selection state for the builder. The full requirement set lives in
 * the query string so a build is shareable with no account.
 */

export const DEFAULT_SELECTION = {
  games: [
    'cyberpunk-2077',
    'counter-strike-2',
    'fortnite',
    'red-dead-redemption-2',
  ],
  resolution: '1440p',
  fps: 144,
  budget: 1032,
  prefs: ['nvidia', 'wifi'],
};

const gameIds = new Set(games.map((g) => g.id));
const resIds = new Set(resolutions.map((r) => r.id));
const fpsValues = new Set(fpsTargets.map((f) => f.value));
const prefIds = new Set(preferences.map((p) => p.id));
const budgets = new Set(builds.map((b) => b.budget));

function readParam(source, key) {
  if (!source) return null;
  return typeof source.get === 'function' ? source.get(key) : source[key];
}

const splitList = (raw) =>
  (raw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export function parseSelection(source) {
  const rawGames = splitList(readParam(source, 'games')).filter((id) =>
    gameIds.has(id),
  );
  const rawRes = readParam(source, 'res');
  const rawFps = Number(readParam(source, 'fps'));
  const rawBudget = Number(readParam(source, 'budget'));
  const rawPrefs = splitList(readParam(source, 'prefs')).filter((id) =>
    prefIds.has(id),
  );

  return {
    games: rawGames.length ? rawGames : DEFAULT_SELECTION.games,
    resolution: resIds.has(rawRes) ? rawRes : DEFAULT_SELECTION.resolution,
    fps: fpsValues.has(rawFps) ? rawFps : DEFAULT_SELECTION.fps,
    budget: budgets.has(rawBudget) ? rawBudget : DEFAULT_SELECTION.budget,
    prefs: rawPrefs,
  };
}

export function toQuery(selection) {
  const p = new URLSearchParams();
  if (selection.games.length) p.set('games', selection.games.join(','));
  p.set('res', selection.resolution);
  p.set('fps', String(selection.fps));
  p.set('budget', String(selection.budget));
  if (selection.prefs.length) p.set('prefs', selection.prefs.join(','));
  return p.toString();
}
