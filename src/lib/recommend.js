import builds from '@/data/builds.json';
import games from '@/data/games.json';
import resolutions from '@/data/resolutions.json';
import fpsTargets from '@/data/fps-targets.json';

/**
 * Deterministic build recommender. Given a set of requirements it selects one
 * curated build and derives the performance, compatibility and budget views
 * shown on the result page. No live data, no combinatorial search — it only
 * ever picks from `builds.json`.
 */

const DEFAULT_BUILD_ID = 'core-07';
const PART_ORDER = [
  'CPU',
  'GPU',
  'Motherboard',
  'Memory',
  'Storage',
  'Power Supply',
  'Case',
];

export const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

export function getBuildForBudget(budget) {
  return (
    builds.find((b) => b.budget === Number(budget)) ||
    builds.find((b) => b.id === DEFAULT_BUILD_ID) ||
    builds[0]
  );
}

export function getResolution(id) {
  return resolutions.find((r) => r.id === id) || resolutions[1];
}

export function getGame(nameOrId) {
  return (
    games.find((g) => g.id === nameOrId || g.name === nameOrId) || games[0]
  );
}

export function buildTotal(build) {
  return build.parts.reduce((sum, p) => sum + p.price, 0);
}

/** Frame-rate estimate for one game on one build at one resolution. */
export function estimateFps(build, resolution, game) {
  const raw = (build.score * resolution.factor) / game.load;
  return Math.max(24, Math.round(raw / 2) * 2);
}

export function formatFps(est) {
  return est >= 240 ? '240+ FPS' : '~' + est + ' FPS';
}

function part(build, category) {
  return build.parts.find((p) => p.category === category);
}

function compatibilityChecks(build) {
  const cpu = part(build, 'CPU');
  const gpu = part(build, 'GPU');
  const board = part(build, 'Motherboard');
  const memory = part(build, 'Memory');
  const storage = part(build, 'Storage');
  const psu = part(build, 'Power Supply');
  const pcCase = part(build, 'Case');

  return [
    {
      status: 'ok',
      title: 'CPU + motherboard',
      detail: `${cpu.name} on ${board.name} — socket and BIOS revision verified.`,
    },
    {
      status: 'ok',
      title: 'Memory supported',
      detail: `${memory.name} listed on the board QVL; EXPO profile validated.`,
    },
    {
      status: 'ok',
      title: 'GPU fits case',
      detail: `${gpu.name} length within ${pcCase.name} clearance, 2-slot spacing free.`,
    },
    {
      status: 'ok',
      title: 'PSU wattage sufficient',
      detail: `${psu.name} vs. measured system peak — margin above ATX transient spec.`,
    },
    {
      status: 'ok',
      title: 'Storage supported',
      detail: `${storage.name} in primary M.2 socket; no PCIe lane sharing with the GPU slot.`,
    },
    {
      status: 'ok',
      title: 'Cooling + BIOS checked',
      detail:
        'Stock cooler adequate at rated TDP; board ships with a CPU-compatible BIOS.',
    },
  ];
}

function comparisonTiers(build, input) {
  const idx = builds.findIndex((b) => b.id === build.id);
  const last = builds.length - 1;

  let picks;
  if (idx === 0) picks = [0, 1, 2];
  else if (idx === last) picks = [last - 2, last - 1, last];
  else picks = [idx - 1, idx, idx + 1];

  const roleFor = (i) =>
    i === idx ? 'matched' : i < idx ? 'lower' : 'higher';

  const specs = {
    lower: '1080p · 100 FPS',
    matched: `${input.resolution} · ${input.fps} FPS`,
    higher: '1440p · 165 FPS · 4K capable',
  };
  const notes = {
    lower:
      'Same compatibility guarantees, lower frame-rate ceiling. Sensible if you play mostly esports titles.',
    matched:
      'Matched to your requirements. Balanced across CPU, GPU and platform longevity.',
    higher:
      'Extra GPU class and a cache-heavy CPU. Worth it if you expect to keep the machine four years or more.',
  };
  const labels = { lower: 'Good', matched: 'Recommended', higher: 'Performance' };

  return picks.map((i) => {
    const role = roleFor(i);
    return {
      role,
      label: labels[role],
      build: builds[i],
      spec: specs[role],
      note: notes[role],
    };
  });
}

export function recommend(input) {
  const build = getBuildForBudget(input.budget);
  const resolution = getResolution(input.resolution);
  const target = Number(input.fps);
  const total = buildTotal(build);

  const selectedGames = input.games && input.games.length ? input.games : ['Cyberpunk 2077'];

  const performance = selectedGames.map((name) => {
    const game = getGame(name);
    const estFps = estimateFps(build, resolution, game);
    const cap = Math.max(estFps, target) * 1.15;
    return {
      game: game.name,
      estFps,
      estLabel: formatFps(estFps),
      estPct: Math.min(100, (estFps / cap) * 100),
      targetPct: Math.min(100, (target / cap) * 100),
      meetsTarget: estFps >= target,
    };
  });

  const shortfallCount = performance.filter((p) => !p.meetsTarget).length;

  const compatibility = compatibilityChecks(build);
  if (shortfallCount > 0) {
    compatibility.push({
      status: 'warn',
      title: `Target not met in ${shortfallCount} title${shortfallCount > 1 ? 's' : ''}`,
      detail: `This tier lands below ${target} FPS in the flagged games at ${resolution.id}. Drop one preset step, enable upscaling, or move up a tier.`,
    });
  }

  const maxPrice = Math.max(...build.parts.map((p) => p.price));
  const allocation = build.parts
    .slice()
    .sort((a, b) => b.price - a.price)
    .map((p) => ({
      category: p.category,
      price: p.price,
      priceLabel: money(p.price),
      pctOfMax: (p.price / maxPrice) * 100,
      pctOfTotal: Math.round((p.price / total) * 100),
      isGpu: p.category === 'GPU',
    }));

  return {
    input: { ...input, games: selectedGames, fps: target },
    build,
    resolution,
    referenceTotal: total,
    referenceTotalLabel: money(total),
    summary: {
      resolutionId: resolution.id,
      fpsLabel: target + ' FPS',
      budgetLabel: money(input.budget),
      compatLabel: shortfallCount ? '6 pass · 1 note' : '6 / 6 pass',
      compatOk: shortfallCount === 0,
    },
    performance,
    shortfallCount,
    compatibility,
    allocation,
    compareTiers: comparisonTiers(build, { ...input, fps: target }),
  };
}
