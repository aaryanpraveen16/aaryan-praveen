import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

const MouseEffect = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const hoverRef = useRef(false);
  const activeRef = useRef(false);
  const visibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      setIsEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const setVisibleState = (value: boolean) => {
      visibleRef.current = value;
      setIsVisible(value);
    };

    const handleMove = (event: MouseEvent) => {
      targetPos.current.x = event.clientX;
      targetPos.current.y = event.clientY;
      if (!visibleRef.current) {
        setVisibleState(true);
      }
    };

    const handleEnter = () => setVisibleState(true);
    const handleLeave = () => setVisibleState(false);

    const setHoverState = (value: boolean) => {
      hoverRef.current = value;
      dotRef.current?.classList.toggle("cursor-hover", value);
      ringRef.current?.classList.toggle("cursor-hover", value);
    };

    const setActiveState = (value: boolean) => {
      activeRef.current = value;
      dotRef.current?.classList.toggle("cursor-active", value);
      ringRef.current?.classList.toggle("cursor-active", value);
    };

    const handleDown = () => {
      setActiveState(true);
    };

    const handleUp = () => {
      setActiveState(false);
    };

    const handleOver = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(
        INTERACTIVE_SELECTOR
      );
      if (target) {
        setHoverState(true);
      }
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      if (target.closest(INTERACTIVE_SELECTOR)) {
        const related = event.relatedTarget as Element | null;
        if (!related || !related.closest(INTERACTIVE_SELECTOR)) {
          setHoverState(false);
        }
      }
    };

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        const { x, y } = targetPos.current;
        ringPos.current.x += (x - ringPos.current.x) * 0.15;
        ringPos.current.y += (y - ringPos.current.y) * 0.15;

        const ringScale = activeRef.current ? 0.9 : hoverRef.current ? 1.55 : 1;
        const dotScale = activeRef.current ? 0.6 : hoverRef.current ? 0.35 : 1;

        dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0) scale(${dotScale})`;
        ring.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0) scale(${ringScale})`;
      }
      animationRef.current = window.requestAnimationFrame(animate);
    };

    animationRef.current = window.requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? "" : "cursor-hidden"}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "" : "cursor-hidden"}`}
        aria-hidden="true"
      />
    </>
  );
};

export default MouseEffect;
