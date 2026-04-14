"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  decimals = 0,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (decimals > 0) return v.toFixed(decimals);
    return Math.round(v).toString();
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, target, {
      duration,
      ease: [0.25, 0.4, 0, 1],
    });

    const unsubscribe = rounded.on("change", (v) => {
      setDisplayValue(v);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, target, duration, count, rounded]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
};
