import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import styles from "./CustomCursor.module.css";

type CursorState = "default" | "interactive" | "view" | "hidden";

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const disabled = reducedMotion || isTouch;

  useEffect(() => {
    if (disabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      if (!ready) setReady(true);
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const el = (event.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR);
      if (!el) {
        setState("default");
        return;
      }
      const explicit = el.getAttribute("data-cursor");
      setState(explicit === "view" ? "view" : "interactive");
    };

    const handleOut = (event: PointerEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (!related?.closest?.(INTERACTIVE_SELECTOR)) {
        setState("default");
      }
    };

    const handleLeaveWindow = () => setState("hidden");
    const handleEnterWindow = () => setState((s) => (s === "hidden" ? "default" : s));

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    document.addEventListener("pointerout", handleOut, { passive: true });
    document.addEventListener("mouseleave", handleLeaveWindow);
    document.addEventListener("mouseenter", handleEnterWindow);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      document.removeEventListener("mouseenter", handleEnterWindow);
    };
  }, [disabled, ready]);

  if (disabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className={styles.dot} style={{ opacity: ready ? 1 : 0 }} />
      <div
        ref={ringRef}
        className={styles.ring}
        data-state={ready ? state : "hidden"}
      >
        <span className={styles.ringLabel}>View</span>
      </div>
    </div>
  );
}
