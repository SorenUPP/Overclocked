import { recommend } from './recommend';
import { DEFAULT_SELECTION } from './build-params';

/**
 * The one deterministic "example" build marketing pages point to — the
 * default recommendation (core-07 @ 1440p/144 FPS/€1,650), run through the
 * same `recommend()` pipeline the result page uses. Computed once so every
 * page that cites it as a demonstration (the hero card, the trust section)
 * reads from a single source instead of re-deriving it, and never drifts out
 * of sync with the actual recommender.
 */
export const exampleBuild = recommend(DEFAULT_SELECTION);
