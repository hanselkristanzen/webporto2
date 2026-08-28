import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateLattice } from "./latticeGeometry";
import { driftNoise } from "./noise";
import { getDotTexture } from "./dotTexture";

interface LatticeProps {
  count: number;
  scrollProgress: number;
}

const BASE_COLOR = new THREE.Color("#d8d3c4");
const DIM_COLOR = new THREE.Color("#5c574a");
const ACCENT_COLOR = new THREE.Color("#e8b84b");

const tmpColor = new THREE.Color();

export function Lattice({ count, scrollProgress }: LatticeProps) {
  const { nodes, edges } = useMemo(() => generateLattice(count), [count]);

  const groupRef = useRef<THREE.Group>(null);
  const pointsGeoRef = useRef<THREE.BufferGeometry>(null);
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);
  const hubRefs = useRef<(THREE.Mesh | null)[]>([]);

  const pointer = useRef({ x: 0, y: 0 });
  const smoothPointer = useRef({ x: 0, y: 0 });
  const displaced = useRef(new Float32Array(nodes.length * 3));

  const hubIndices = useMemo(
    () => nodes.map((n, i) => (n.isHub ? i : -1)).filter((i) => i >= 0),
    [nodes]
  );

  const positions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      arr[i * 3] = n.base[0];
      arr[i * 3 + 1] = n.base[1];
      arr[i * 3 + 2] = n.base[2];
    });
    return arr;
  }, [nodes]);

  const colors = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      const c = n.isHub ? ACCENT_COLOR : DIM_COLOR.clone().lerp(BASE_COLOR, 0.5);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    });
    return arr;
  }, [nodes]);

  const edgePositions = useMemo(
    () => new Float32Array(edges.length * 2 * 3),
    [edges]
  );
  const edgeColors = useMemo(() => new Float32Array(edges.length * 2 * 3), [edges]);
  const dotTexture = useMemo(() => getDotTexture(), []);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;

    smoothPointer.current.x += (pointer.current.x - smoothPointer.current.x) * Math.min(1, delta * 2.4);
    smoothPointer.current.y += (pointer.current.y - smoothPointer.current.y) * Math.min(1, delta * 2.4);

    const targetX = smoothPointer.current.x * 1.9;
    const targetY = smoothPointer.current.y * 1.2;

    const posAttr = pointsGeoRef.current?.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    const colAttr = pointsGeoRef.current?.attributes.color as
      | THREE.BufferAttribute
      | undefined;
    if (!posAttr || !colAttr) return;

    const disp = displaced.current;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const [bx, by, bz] = n.base;

      const dx = driftNoise(n.seed, t) * 0.1;
      const dy = driftNoise(n.seed + 3.3, t) * 0.1;
      const dz = driftNoise(n.seed + 6.1, t) * 0.1;

      const ddx = bx - targetX;
      const ddy = by - targetY;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 0.0001;
      const influence = Math.max(0, 1 - dist / 1.15);
      const falloff = influence * influence * (3 - 2 * influence);
      const push = falloff * 0.45;

      const nx = bx + dx + (ddx / dist) * push;
      const ny = by + dy + (ddy / dist) * push;
      const nz = bz + dz;

      disp[i * 3] = nx;
      disp[i * 3 + 1] = ny;
      disp[i * 3 + 2] = nz;

      posAttr.setXYZ(i, nx, ny, nz);

      tmpColor.copy(n.isHub ? ACCENT_COLOR : DIM_COLOR.clone().lerp(BASE_COLOR, 0.5));
      tmpColor.lerp(ACCENT_COLOR, falloff * 0.85);
      colAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    const edgePosAttr = lineGeoRef.current?.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    const edgeColAttr = lineGeoRef.current?.attributes.color as
      | THREE.BufferAttribute
      | undefined;
    if (edgePosAttr && edgeColAttr) {
      edges.forEach(([a, b], idx) => {
        const ax = disp[a * 3];
        const ay = disp[a * 3 + 1];
        const az = disp[a * 3 + 2];
        const bx2 = disp[b * 3];
        const by2 = disp[b * 3 + 1];
        const bz2 = disp[b * 3 + 2];
        edgePosAttr.setXYZ(idx * 2, ax, ay, az);
        edgePosAttr.setXYZ(idx * 2 + 1, bx2, by2, bz2);

        const cr = (colAttr.getX(a) + colAttr.getX(b)) / 2;
        const cg = (colAttr.getY(a) + colAttr.getY(b)) / 2;
        const cb = (colAttr.getZ(a) + colAttr.getZ(b)) / 2;
        edgeColAttr.setXYZ(idx * 2, cr, cg, cb);
        edgeColAttr.setXYZ(idx * 2 + 1, cr, cg, cb);
      });
      edgePosAttr.needsUpdate = true;
      edgeColAttr.needsUpdate = true;
    }

    hubIndices.forEach((nodeIdx, hubI) => {
      const mesh = hubRefs.current[hubI];
      if (!mesh) return;
      mesh.position.set(disp[nodeIdx * 3], disp[nodeIdx * 3 + 1], disp[nodeIdx * 3 + 2]);
      const pulse = 1 + Math.sin(t * 1.4 + nodeIdx) * 0.18;
      mesh.scale.setScalar(pulse);
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05 + scrollProgress * 0.7;
      groupRef.current.rotation.x = Math.sin(t * 0.11) * 0.06 - scrollProgress * 0.12;
      groupRef.current.position.y = -scrollProgress * 0.9;
      const scale = 1 - scrollProgress * 0.16;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={pointsGeoRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          map={dotTexture}
          vertexColors
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          opacity={0.95}
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[edgeColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.38}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {hubIndices.map((nodeIdx, hubI) => (
        <mesh
          key={nodeIdx}
          ref={(el) => {
            hubRefs.current[hubI] = el;
          }}
        >
          <icosahedronGeometry args={[0.05, 0]} />
          <meshBasicMaterial
            color={ACCENT_COLOR}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[3.6, 1]} />
        <meshBasicMaterial
          color={DIM_COLOR}
          wireframe
          transparent
          opacity={0.055}
        />
      </mesh>
    </group>
  );
}
