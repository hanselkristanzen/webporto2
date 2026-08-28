import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface CameraRigProps {
  scrollProgress: number;
}

export function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const basePosition = useRef({ x: 0, y: 0, z: 7.4 });

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

    smooth.current.x += (pointer.current.x - smooth.current.x) * Math.min(1, delta * 1.8);
    smooth.current.y += (pointer.current.y - smooth.current.y) * Math.min(1, delta * 1.8);

    const idleX = Math.sin(t * 0.12) * 0.12;
    const idleY = Math.cos(t * 0.09) * 0.08;

    camera.position.x = basePosition.current.x + smooth.current.x * 0.55 + idleX;
    camera.position.y = basePosition.current.y + smooth.current.y * 0.35 + idleY - scrollProgress * 0.4;
    camera.position.z = basePosition.current.z + scrollProgress * 1.1;
    camera.lookAt(0, -scrollProgress * 0.4, 0);
  });

  return null;
}
