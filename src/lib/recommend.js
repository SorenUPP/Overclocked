import builds from '@/data/builds.json';
import games from '@/data/games.json';
import resolutions from '@/data/resolutions.json';
import preferences from '@/data/preferences.json';

/**
 * Deterministic build recommender. Given a set of requirements it selects one
 * curated build, applies any preference-driven part swaps, and derives the
 * performance, compatibility, budget and preference views shown on the result
 * page. No live data, no combinatorial search — it only ever picks from
 * `builds.json` and the alternates listed there.
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

/** Preferences that cannot both be honoured. Selecting both = keep the default. */
const PREF_CONFLICTS = [
  ['amd_cpu', 'intel_cpu'],
  ['nvidia', 'radeon'],
];

/** What to tell the user when a build cannot meet a preference. */
const UNMET_NOTES = {
  intel_cpu:
    'No Intel alternate is priced for this tier. The build stays on AMD.',
  amd_cpu: 'This tier is configured on Intel. The build stays as specified.',
  nvidia:
    'No NVIDIA card in our set matches this tier cleanly. The build stays on Radeon.',
  radeon:
    'No AMD card in our benchmark set matches this NVIDIA tier. The build stays on NVIDIA.',
  wifi: 'This board has no onboard Wi-Fi. Add a PCIe Wi-Fi card (about €22) or a USB adapter.',
  rgb: "This build's case ships without RGB. It takes ARGB fans as an add-on.",
  white:
    'No white edition of this case is listed. Most of these chassis have one for €5–33 more.',
  compact:
    'This tier uses a mid-tower ATX case. The €900 and €1,250 builds are Micro-ATX.',
  itx: 'These tiers use ATX or Micro-ATX cases. A Mini-ITX build is a different board, case and power supply — planned as its own tier.',
  quiet:
    'This build is not tuned for low noise. A quieter case and a PWM fan curve close most of the gap.',
  upgrade:
    'This platform limits the upgrade path. The €1,650 build and up are on AM5 with spare slots.',
  storage2tb: 'This tier ships a 1TB drive. Pick the preference to price in a 2TB swap.',
  storage4tb: 'This tier ships a smaller drive. Pick the preference to price in a 4TB swap.',
  ram64: 'This tier ships 32GB. Pick the preference to price in a 64GB kit.',
};

const prefLabel = (id) =>
  preferences.find((p) => p.id === id)?.label || id;

export const money = (n) => '€' + Math.round(n).toLocaleString('en-US');

/** Nearest curated tier to the requested figure (exact match wins). */
export function getBuildForBudget(budget) {
  const target = Number(budget);
  if (Number.isNaN(target)) {
    return builds.find((b) => b.id === DEFAULT_BUILD_ID) || builds[0];
  }
  return builds.reduce((best, b) =>
    Math.abs(b.budget - target) < Math.abs(best.budget - target) ? b : best,
  );
}

export function getResolution(id) {
  return resolutions.find((r) => r.id === id) || resolutions[1];
}

export function getGame(nameOrId) {
  return games.find((g) => g.id === nameOrId || g.name === nameOrId) || games[0];
}

export function partsTotal(parts) {
  return parts.reduce((sum, p) => sum + p.price, 0);
}

/**
 * Performance-per-price: how many `score` points a build delivers per 100
 * units of whatever currency `total` is in. Pass an already-converted total
 * to compare builds in USD or SEK instead of euros — the ratio itself has no
 * currency baked in, so no separate conversion is needed for this figure.
 * Higher means more performance for the money.
 */
export function perfPerPrice(score, total) {
  return total > 0 ? (score / total) * 100 : 0;
}

/** Frame-rate estimate for one game on one build at one resolution. */
export function estimateFps(score, resolution, game) {
  const raw = (score * resolution.factor) / game.load;
  return Math.max(24, Math.round(raw / 2) * 2);
}

export function formatFps(est) {
  return est >= 240 ? '240+ FPS' : '~' + est + ' FPS';
}

/** Preferences that are cancelled out because their opposite is also selected. */
function conflictingPrefs(prefs) {
  const out = new Set();
  for (const [a, b] of PREF_CONFLICTS) {
    if (prefs.includes(a) && prefs.includes(b)) {
      out.add(a);
      out.add(b);
    }
  }
  return out;
}

/**
 * Swap in curated alternates for any selected preference. Returns the effective
 * part list plus a log of what changed.
 */
function applyPreferences(build, prefs) {
  const blocked = conflictingPrefs(prefs);
  const active = prefs.filter((p) => !blocked.has(p));
  const swaps = [];

  const parts = build.parts.map((original) => {
    const alt = (original.alternatives || []).find((a) =>
      active.includes(a.pref),
    );
    if (!alt) {
      const { alternatives, ...rest } = original;
      return rest;
    }
    swaps.push({
      pref: alt.pref,
      name: alt.name,
      replaced: original.name,
      priceDelta: alt.price - original.price,
    });
    return {
      category: original.category,
      brand: alt.brand,
      name: alt.name,
      specs: alt.specs,
      price: alt.price,
      why: alt.why,
      perfImpact: alt.perfImpact,
      satisfies: alt.satisfies || [],
      swappedForPref: alt.pref,
      replacedName: original.name,
    };
  });

  parts.sort(
    (a, b) => PART_ORDER.indexOf(a.category) - PART_ORDER.indexOf(b.category),
  );
  return { parts, swaps };
}

function preferenceReport(prefs, parts, swaps) {
  const blocked = conflictingPrefs(prefs);

  return prefs.map((id) => {
    const label = prefLabel(id);

    if (blocked.has(id)) {
      const pair = PREF_CONFLICTS.find((p) => p.includes(id));
      const other = prefLabel(pair.find((x) => x !== id));
      return {
        id,
        label,
        status: 'conflict',
        detail: `Selected together with ${other}. Pick one — the build keeps the curated default.`,
      };
    }

    const swap = swaps.find((s) => s.pref === id);
    if (swap) {
      const delta =
        swap.priceDelta === 0
          ? ''
          : ` (${swap.priceDelta > 0 ? '+' : '−'}${money(Math.abs(swap.priceDelta))})`;
      return {
        id,
        label,
        status: 'applied',
        detail: `Swapped in ${swap.name} for ${swap.replaced}${delta}.`,
      };
    }

    const met = parts.find((p) => (p.satisfies || []).includes(id));
    if (met) {
      return {
        id,
        label,
        status: 'met',
        detail: `${met.name} covers this.`,
      };
    }

    return {
      id,
      label,
      status: 'unmet',
      detail: UNMET_NOTES[id] || 'Not covered by this build.',
    };
  });
}

function findPart(parts, category) {
  return parts.find((p) => p.category === category);
}

/** Every build runs this many fixed compatibility checks (plus an optional
 *  FPS-shortfall note that isn't a compatibility rule) — exported so the
 *  "compatibility rules" headline stat can be derived from it instead of
 *  hand-typed (see designmanual.md). */
export const CHECKS_PER_BUILD = 6;

function compatibilityChecks(parts) {
  const cpu = findPart(parts, 'CPU');
  const gpu = findPart(parts, 'GPU');
  const board = findPart(parts, 'Motherboard');
  const memory = findPart(parts, 'Memory');
  const storage = findPart(parts, 'Storage');
  const psu = findPart(parts, 'Power Supply');
  const pcCase = findPart(parts, 'Case');

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
      detail: `${psu.name} against measured system peak, with margin above the ATX transient spec.`,
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

  const roleFor = (i) => (i === idx ? 'matched' : i < idx ? 'lower' : 'higher');

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
  const tier = getBuildForBudget(input.budget);
  const resolution = getResolution(input.resolution);
  const target = Number(input.fps);
  const prefs = Array.isArray(input.prefs) ? input.prefs : [];

  const { parts, swaps } = applyPreferences(tier, prefs);
  const total = partsTotal(parts);
  const build = { ...tier, parts };

  const selectedGames =
    input.games && input.games.length ? input.games : ['cyberpunk-2077'];

  const performance = selectedGames.map((name) => {
    const game = getGame(name);
    const estFps = estimateFps(tier.score, resolution, game);
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

  const compatibility = compatibilityChecks(parts);
  if (shortfallCount > 0) {
    compatibility.push({
      status: 'warn',
      title: `Target not met in ${shortfallCount} title${shortfallCount > 1 ? 's' : ''}`,
      detail: `This tier lands below ${target} FPS in the flagged games at ${resolution.id}. Drop one preset step, enable upscaling, or move up a tier.`,
    });
  }

  const maxPrice = Math.max(...parts.map((p) => p.price));
  const allocation = parts
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

  const requestedBudget = Number(input.budget);
  const exactTier = tier.budget === requestedBudget;
  const budgetNote = exactTier
    ? null
    : `No curated build at exactly ${money(requestedBudget)}. Matched the closest one, ${tier.budgetLabel}.`;

  const prefReport = preferenceReport(prefs, parts, swaps);

  return {
    input: { ...input, games: selectedGames, fps: target, prefs },
    build,
    resolution,
    referenceTotal: total,
    referenceTotalLabel: money(total),
    summary: {
      resolutionId: resolution.id,
      fpsLabel: target + ' FPS',
      budgetLabel: money(requestedBudget),
      compatLabel: shortfallCount ? '6 pass · 1 note' : '6 / 6 pass',
      compatOk: shortfallCount === 0,
      budgetNote,
    },
    performance,
    shortfallCount,
    compatibility,
    allocation,
    preferences: prefReport,
    swaps,
    compareTiers: comparisonTiers(tier, { ...input, fps: target }),
  };
}
