import games from '@/data/games.json';
import resolutions from '@/data/resolutions.json';
import fpsTargets from '@/data/fps-targets.json';
import preferences from '@/data/preferences.json';
import builds from '@/data/builds.json';
import siteStats from '@/data/site-stats.json';

/**
 * Single entry point for the curated dataset. Import from here so the JSON
 * source layout can change without touching call sites.
 */
export const dataset = {
  games,
  resolutions,
  fpsTargets,
  preferences,
  builds,
  siteStats,
};

export { games, resolutions, fpsTargets, preferences, builds, siteStats };
