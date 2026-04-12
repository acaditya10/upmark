"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    let mouseX = -100;
    let mouseY = -100;
    let circleX = -100;
    let circleY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Hide native cursor for interactive elements nicely
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let animationFrameId: number;

    const render = () => {
      circleX += (mouseX - circleX) * 0.2; // Smooth follow lerp factor
      circleY += (mouseY - circleY) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
      }
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(calc(${circleX}px - 50%), calc(${circleY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Catch links, buttons, and interactive roles
      if (target.closest("a, button, input, textarea, select, [role='button']")) {
        circleRef.current?.classList.add("scale-[1.5]", "bg-white/10", "border-white/30");
        dotInnerRef.current?.classList.add("opacity-50", "scale-75");
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button']")) {
        circleRef.current?.classList.remove("scale-[1.5]", "bg-white/10", "border-white/30");
        dotInnerRef.current?.classList.remove("opacity-50", "scale-75");
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer wrapper for continuous hardware-accelerated translation */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Inner element for styling and CSS transitions (scale/color) */}
        <div 
          ref={circleRef}
          className="w-full h-full border-2 border-muted-text/50 rounded-full transition-all duration-300 ease-out"
        />
      </div>

      {/* Wrapper for fast JS transforms that doesn't conflict with CSS transitions */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Inner element for visual styling and transitions (hover scale) */}
        <div
          ref={dotInnerRef}
          className="w-full h-full bg-white rounded-full transition-all duration-300 ease-out"
        />
      </div>
    </>
  );
}
