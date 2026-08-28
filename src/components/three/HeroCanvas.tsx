import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Lattice } from "./Lattice";
import { CameraRig } from "./CameraRig";
import { LatticeFallback } from "./LatticeFallback";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsTouchDevice, useMediaQuery } from "../../hooks/useMediaQuery";

interface HeroCanvasProps {
  scrollProgress: number;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [webglOk] = useState<boolean>(() => detectWebGL());

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "35% 0px 35% 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const nodeCount = useMemo(() => {
    if (isMobile) return 55;
    if (isTablet) return 105;
    return 170;
  }, [isMobile, isTablet]);

  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1.5] : [1, 2]), [isMobile]);

  if (reducedMotion || !webglOk) {
    return (
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
        <LatticeFallback />
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <CanvasErrorBoundary fallback={<LatticeFallback />}>
        <Canvas
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 7.4], fov: 45, near: 0.1, far: 30 }}
          frameloop={visible ? "always" : "never"}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[3, 3, 4]} intensity={0.4} color="#e8b84b" />
            <CameraRig scrollProgress={scrollProgress} />
            <Lattice count={isTouch ? Math.round(nodeCount * 0.85) : nodeCount} scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
