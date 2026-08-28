import { hash } from "./noise";

export interface LatticeNode {
  base: [number, number, number];
  seed: number;
  isHub: boolean;
}

export interface LatticeData {
  nodes: LatticeNode[];
  edges: [number, number][];
}

/**
 * Distributes nodes across layered, jittered shells using a Fibonacci
 * sphere pattern (even coverage, no visible banding), then connects each
 * node to its nearest neighbors to form an irregular network graph —
 * evoking a system topology rather than a uniform geometric primitive.
 */
export function generateLattice(count: number, radius = 2.5): LatticeData {
  const nodes: LatticeNode[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = count > 1 ? 1 - (i / (count - 1)) * 2 : 0;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    const shell = 0.5 + hash(i * 3.1) * 0.5;
    const jitter = 0.22;

    const x =
      Math.cos(theta) * radiusAtY * radius * shell + (hash(i * 7.7) - 0.5) * jitter;
    const yy = y * radius * 0.62 * shell + (hash(i * 11.3) - 0.5) * jitter;
    const z =
      Math.sin(theta) * radiusAtY * radius * shell + (hash(i * 5.9) - 0.5) * jitter;

    nodes.push({
      base: [x, yy, z],
      seed: hash(i * 91.7) * 62.831,
      isHub: hash(i * 17.3) > 0.9,
    });
  }

  const k = 2;
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];

  for (let i = 0; i < nodes.length; i++) {
    const candidates: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const [ax, ay, az] = nodes[i].base;
      const [bx, by, bz] = nodes[j].base;
      const d = (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2;
      candidates.push({ j, d });
    }
    candidates.sort((a, b) => a.d - b.d);
    for (let n = 0; n < k; n++) {
      const j = candidates[n]?.j;
      if (j === undefined) continue;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    }
  }

  return { nodes, edges };
}
