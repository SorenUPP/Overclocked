import games from '@/data/games.json';
import resolutions from '@/data/resolutions.json';
import fpsTargets from '@/data/fps-targets.json';
import preferences from '@/data/preferences.json';
import builds from '@/data/builds.json';
import components from '@/data/components.json';
import siteStatsRaw from '@/data/site-stats.json';

/**
 * Single entry point for the curated dataset. Import from here so the JSON
 * source layout can change without touching call sites.
 */

/** Every distinct part the recommender can reach: the standalone catalogue plus
 *  anything referenced only inside a build or one of its alternates. */
export const allComponents = (() => {
  const seen = new Map();
  const key = (p) => `${p.category}::${p.name}`;

  for (const c of components) seen.set(key(c), c);

  for (const build of builds) {
    for (const part of build.parts) {
      if (!seen.has(key(part))) {
        seen.set(key(part), {
          category: part.category,
          brand: part.brand,
          name: part.name,
          specs: part.specs,
          price: part.price,
          tier: 'listed',
        });
      }
      for (const alt of part.alternatives || []) {
        const a = { ...alt, category: part.category };
        if (!seen.has(key(a))) {
          seen.set(key(a), {
            category: a.category,
            brand: a.brand,
            name: a.name,
            specs: a.specs,
            price: a.price,
            tier: 'listed',
          });
        }
      }
    }
  }

  return [...seen.values()];
})();

/** Site stats, with the component count kept in sync with the catalogue. */
export const siteStats = {
  ...siteStatsRaw,
  trackedComponents: allComponents.length,
};

export const dataset = {
  games,
  resolutions,
  fpsTargets,
  preferences,
  builds,
  components,
  allComponents,
  siteStats,
};

export {
  games,
  resolutions,
  fpsTargets,
  preferences,
  builds,
  components,
};
