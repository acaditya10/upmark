"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  once?: boolean;
}

const getVariants = (direction: string, distance: number): Variants => {
  const offsets: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...offsets[direction],
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
    },
  };
};

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.7,
  once = true,
}: ScrollRevealProps) => {
  const variants = getVariants(direction, distance);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
