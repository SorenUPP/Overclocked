import { describe, it, expect } from 'vitest';
import {
  estimateFps,
  formatFps,
  getBuildForBudget,
  getResolution,
  getGame,
  perfPerPrice,
  recommend,
} from '@/lib/recommend';

const find = (list, key, val) => list.find((x) => x[key] === val);

describe('estimateFps', () => {
  const res1440 = getResolution('1440p'); // factor 0.72

  it('follows score * factor / load, rounded to an even number', () => {
    // 290 * 0.72 / 1.9 = 109.89 -> 110
    expect(estimateFps(290, res1440, getGame('cyberpunk-2077'))).toBe(110);
    // 290 * 0.72 / 0.7 = 298.28 -> 298
    expect(estimateFps(290, res1440, getGame('counter-strike-2'))).toBe(298);
  });

  it('never returns below 24', () => {
    expect(estimateFps(1, getResolution('4K'), getGame('gta-vi'))).toBe(24);
  });
});

describe('formatFps', () => {
  it('caps the label at 240+', () => {
    expect(formatFps(298)).toBe('240+ FPS');
    expect(formatFps(240)).toBe('240+ FPS');
  });
  it('prefixes lower values with ~', () => {
    expect(formatFps(110)).toBe('~110 FPS');
  });
});

describe('perfPerPrice', () => {
  it('scales score per 100 units of whatever currency `total` is in', () => {
    expect(perfPerPrice(290, 1597)).toBeCloseTo(18.16, 2);
  });

  it('is currency-agnostic — the caller converts `total` first', () => {
    const eur = perfPerPrice(290, 1597);
    const usd = perfPerPrice(290, 1597 * 1.08); // pre-converted total
    expect(usd).toBeLessThan(eur); // same score, larger denominator
  });

  it('returns 0 rather than dividing by zero for a free build', () => {
    expect(perfPerPrice(290, 0)).toBe(0);
  });
});

describe('getBuildForBudget', () => {
  it('takes an exact tier match', () => {
    expect(getBuildForBudget(1650).id).toBe('core-07');
    expect(getBuildForBudget(900).id).toBe('entry-01');
  });
  it('falls back to the nearest tier', () => {
    // The catalogue now has a tier at 1520 (balanced-08), closer to 1400
    // than value-04's 1250.
    expect(getBuildForBudget(1400).id).toBe('balanced-08');
    expect(getBuildForBudget(6000).id).toBe('ultra-11');
  });
  it('handles a non-numeric budget', () => {
    expect(getBuildForBudget('nonsense').id).toBe('core-07');
  });
});

describe('recommend — default requirements', () => {
  const result = recommend({
    games: [
      'cyberpunk-2077',
      'counter-strike-2',
      'fortnite',
      'red-dead-redemption-2',
    ],
    resolution: '1440p',
    fps: 144,
    budget: 1650,
    prefs: [],
  });

  it('matches the sweet-spot tier with no swaps', () => {
    expect(result.build.id).toBe('core-07');
    expect(result.swaps).toEqual([]);
    expect(result.referenceTotal).toBe(1597);
    expect(result.summary.budgetNote).toBeNull();
  });

  it('flags the two titles that miss the target', () => {
    expect(result.shortfallCount).toBe(2);
    expect(find(result.performance, 'game', 'Cyberpunk 2077').meetsTarget).toBe(
      false,
    );
    expect(find(result.performance, 'game', 'Counter-Strike 2').meetsTarget).toBe(
      true,
    );
    // 6 checks + 1 shortfall note
    expect(result.compatibility).toHaveLength(7);
    expect(result.compatibility.at(-1).status).toBe('warn');
    expect(result.summary.compatOk).toBe(false);
  });
});

describe('recommend — preference swaps', () => {
  it('swaps the GPU for the Radeon alternate and updates the total', () => {
    const result = recommend({
      games: ['fortnite'],
      resolution: '1440p',
      fps: 144,
      budget: 1650,
      prefs: ['radeon'],
    });

    const gpu = result.build.parts.find((p) => p.category === 'GPU');
    expect(gpu.name).toBe('Radeon RX 9070');
    expect(gpu.replacedName).toBe('GeForce RTX 5070');
    expect(result.referenceTotal).toBe(1737); // 1597 - 630 + 770

    const report = find(result.preferences, 'id', 'radeon');
    expect(report.status).toBe('applied');
    expect(report.detail).toContain('Radeon RX 9070');
    expect(report.detail).toContain('+€140');
  });

  it('applies a 2TB drive where the tier ships 1TB', () => {
    const result = recommend({
      games: ['fortnite'],
      resolution: '1080p',
      fps: 100,
      budget: 900,
      prefs: ['storage2tb'],
    });
    const storage = result.build.parts.find((p) => p.category === 'Storage');
    expect(storage.name).toBe('P3 Plus 2TB NVMe');
    expect(find(result.preferences, 'id', 'storage2tb').status).toBe('applied');
  });

  it('reports a preference the tier already covers as met', () => {
    const result = recommend({
      games: ['fortnite'],
      resolution: '1440p',
      fps: 144,
      budget: 1650,
      prefs: ['wifi', 'storage2tb'],
    });
    expect(find(result.preferences, 'id', 'wifi').status).toBe('met');
    expect(find(result.preferences, 'id', 'storage2tb').status).toBe('met');
    expect(result.swaps).toEqual([]);
  });

  it('reports an impossible preference as unmet without inventing a part', () => {
    const result = recommend({
      games: ['fortnite'],
      resolution: '1080p',
      fps: 100,
      budget: 900,
      prefs: ['wifi'],
    });
    const report = find(result.preferences, 'id', 'wifi');
    expect(report.status).toBe('unmet');
    expect(report.detail).toMatch(/Wi-Fi/);
  });

  it('cancels out two conflicting preferences and keeps the default part', () => {
    const result = recommend({
      games: ['fortnite'],
      resolution: '1440p',
      fps: 144,
      budget: 1650,
      prefs: ['nvidia', 'radeon'],
    });
    expect(result.swaps).toEqual([]);
    expect(result.build.parts.find((p) => p.category === 'GPU').name).toBe(
      'GeForce RTX 5070',
    );
    expect(find(result.preferences, 'id', 'nvidia').status).toBe('conflict');
    expect(find(result.preferences, 'id', 'radeon').status).toBe('conflict');
  });
});

describe('recommend — budget note', () => {
  it('explains when the requested figure is not an exact tier', () => {
    const result = recommend({
      games: ['fortnite'],
      resolution: '1440p',
      fps: 144,
      budget: 1350,
      prefs: [],
    });
    expect(result.build.id).toBe('value-04');
    expect(result.summary.budgetNote).toContain('€1,350');
    expect(result.summary.budgetNote).toContain('€1,250');
  });
});
