import 'server-only';

import cpus from '@/data/cpus.json';
import gpus from '@/data/gpus.json';
import parts from '@/data/parts.json';
import buildTiers from '@/data/build-tiers.json';
import fpsTable from '@/data/fps-table.json';
import referencePrices from '@/data/reference-prices.json';

/**
 * Single entry point for the curated dataset. Import from here so the JSON
 * source layout can change without touching call sites.
 */
export const dataset = {
  cpus,
  gpus,
  motherboards: parts.motherboards,
  memory: parts.memory,
  storage: parts.storage,
  powerSupplies: parts.powerSupplies,
  cases: parts.cases,
  buildTiers,
  fpsTable,
  referencePrices,
};

export function getCpu(id) {
  return dataset.cpus.find((c) => c.id === id) ?? null;
}

export function getGpu(id) {
  return dataset.gpus.find((g) => g.id === id) ?? null;
}
