/**
 * Cheap deterministic 1D->1D smooth pseudo-noise built from a small sum of
 * sine waves at incommensurate frequencies. Not a true Perlin/Simplex
 * implementation — but for subtle idle drift on a few hundred points it is
 * indistinguishable in motion quality and avoids an extra dependency.
 */
export function driftNoise(seed: number, t: number): number {
  return (
    Math.sin(t * 0.42 + seed * 12.9898) * 0.55 +
    Math.sin(t * 0.71 + seed * 78.233 + 1.3) * 0.3 +
    Math.sin(t * 1.13 + seed * 37.719 + 2.7) * 0.15
  );
}

/** Returns a pseudo-random float in [0, 1) seeded deterministically. */
export function hash(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}
