"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAPABILITIES_DATA } from "./services-data";
import { ChevronDown, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

const ORBITAL_SIZE = 500;
const RADIUS = 185;
const CENTER = ORBITAL_SIZE / 2;
const NODE_RADIUS = 32;

function getNodePos(i: number, total: number) {
  const angle = -Math.PI / 2 + (i / total) * 2 * Math.PI;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
    angle,
  };
}

// Orbital decorative ring radii
const RINGS = [RADIUS * 0.45, RADIUS * 0.75, RADIUS];

export function CapabilityMap() {
  const [activeId, setActiveId] = useState(CAPABILITIES_DATA[0].id);

  const activeIndex = CAPABILITIES_DATA.findIndex((s) => s.id === activeId);
  const active = CAPABILITIES_DATA[activeIndex];
  const activePos = getNodePos(activeIndex, CAPABILITIES_DATA.length);

  return (
    <div className="w-full">

      {/* ── Desktop ── */}
      <div className="hidden lg:flex items-center gap-8 lg:gap-16 max-w-6xl mx-auto">

        {/* Orbital */}
        <div
          className="relative flex-shrink-0"
          style={{ width: ORBITAL_SIZE, height: ORBITAL_SIZE }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-full bg-accent-blue/5 blur-[90px] pointer-events-none" />

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${ORBITAL_SIZE} ${ORBITAL_SIZE}`}
            style={{ zIndex: 0 }}
          >
            <defs>
              <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </radialGradient>
              <linearGradient id="line-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59,130,246,0)" />
                <stop offset="60%" stopColor="rgba(59,130,246,0.7)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.9)" />
              </linearGradient>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Decorative rings */}
            {RINGS.map((r, i) => (
              <circle
                key={i}
                cx={CENTER}
                cy={CENTER}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={1}
              />
            ))}

            {/* Connector lines — all services */}
            {CAPABILITIES_DATA.map((svc, i) => {
              const pos = getNodePos(i, CAPABILITIES_DATA.length);
              const isActive = svc.id === activeId;
              return (
                <motion.line
                  key={`line-${svc.id}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isActive ? "url(#line-active)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeDasharray={isActive ? "none" : "4 6"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="transition-colors duration-500"
                />
              );
            })}

            {/* Active node glow pulse */}
            <motion.circle
              key={`pulse-${activeId}`}
              cx={activePos.x}
              cy={activePos.y}
              r={NODE_RADIUS + 8}
              fill="rgba(59,130,246,0.12)"
              animate={{ r: [NODE_RADIUS + 6, NODE_RADIUS + 18, NODE_RADIUS + 6], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {/* Center hub */}
          <div
            className="absolute z-10 w-28 h-28 rounded-full bg-[#080d17]/90 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.1)]"
            style={{ left: CENTER - 56, top: CENTER - 56 }}
          >
            <div className="absolute inset-0 rounded-full border border-accent-blue/20 animate-[spin_14s_linear_infinite]"
              style={{ borderTopColor: "transparent", borderRightColor: "transparent" }} />
            <span className="font-heading font-bold text-white text-xs text-center leading-tight z-10">
              Upmark<br />Services
            </span>
          </div>

          {/* Nodes */}
          {CAPABILITIES_DATA.map((svc, i) => {
            const pos = getNodePos(i, CAPABILITIES_DATA.length);
            const isActive = svc.id === activeId;
            const Icon = svc.icon;

            return (
              <motion.button
                key={svc.id}
                className={`absolute z-20 rounded-full border flex flex-col items-center justify-center gap-1 transition-colors duration-300 cursor-pointer focus-visible:outline-none
                  ${isActive
                    ? "bg-[#0d1525] border-accent-blue shadow-[0_0_28px_rgba(59,130,246,0.45)]"
                    : "bg-[#080d17] border-white/10 hover:border-white/30 hover:bg-white/5"
                  }`}
                style={{
                  width: NODE_RADIUS * 2,
                  height: NODE_RADIUS * 2,
                  left: pos.x - NODE_RADIUS,
                  top: pos.y - NODE_RADIUS,
                }}
                onMouseEnter={() => setActiveId(svc.id)}
                onClick={() => setActiveId(svc.id)}
                whileHover={{ scale: 1.14 }}
                whileTap={{ scale: 0.94 }}
                aria-label={svc.title}
                aria-pressed={isActive}
              >
                <Icon
                  size={16}
                  className={`transition-colors duration-300 ${isActive ? "text-accent-blue" : "text-white/35"}`}
                />
                <span
                  className={`text-[9px] font-bold tracking-wider uppercase text-center leading-tight px-1 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/35"
                  }`}
                >
                  {svc.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -top-1 -right-1 w-3 h-3 bg-accent-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.9)]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative rounded-3xl border border-white/10 bg-secondary-surface/40 backdrop-blur-xl p-8 lg:p-10 overflow-hidden shadow-2xl"
            >
              {/* Glass sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
              {/* Blue top accent */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />

              {/* Decorative number */}
              <span className="absolute top-2 right-4 text-[8rem] font-black text-accent-blue/[0.05] leading-none select-none pointer-events-none font-heading">
                {active.number}
              </span>

              <div className="relative z-10">
                <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs border border-accent-blue/30 px-3 py-1 rounded-full bg-accent-blue/5 mb-5 inline-block">
                  {active.subtitle}
                </span>

                <h3 className="text-3xl lg:text-4xl font-black text-white font-heading mb-5 leading-tight">
                  {active.title}
                </h3>

                <p className="text-muted-text font-light text-base lg:text-[17px] leading-relaxed mb-7">
                  {active.description}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 hover:text-accent-blue transition-colors duration-200 group"
                >
                  <span>Discuss this service</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Service dots navigation */}
          <div className="flex items-center gap-2 mt-5 pl-1">
            {CAPABILITIES_DATA.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setActiveId(svc.id)}
                className={`rounded-full transition-all duration-300 focus-visible:outline-none ${
                  svc.id === activeId
                    ? "w-6 h-2 bg-accent-blue"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={svc.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: accordion ── */}
      <div className="lg:hidden flex flex-col divide-y divide-white/8 border border-white/10 rounded-2xl overflow-hidden">
        {CAPABILITIES_DATA.map((svc) => {
          const isActive = svc.id === activeId;
          const Icon = svc.icon;

          return (
            <div key={svc.id}>
              <button
                onClick={() => setActiveId(isActive ? "" : svc.id)}
                className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors duration-200 ${
                  isActive ? "bg-accent-blue/10" : "hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      isActive ? "bg-accent-blue/20" : "bg-white/5"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={isActive ? "text-accent-blue" : "text-white/35"}
                    />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`font-mono text-[10px] font-bold tracking-widest block ${
                        isActive ? "text-accent-blue" : "text-white/25"
                      }`}
                    >
                      {svc.number}
                    </span>
                    <span
                      className={`text-sm font-semibold font-heading leading-snug ${
                        isActive ? "text-white" : "text-white/55"
                      }`}
                    >
                      {svc.title}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Plus
                    size={14}
                    className={isActive ? "text-accent-blue" : "text-white/30"}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-3">
                      <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-[10px] border border-accent-blue/30 px-2.5 py-0.5 rounded-full bg-accent-blue/5 mb-3 inline-block">
                        {svc.subtitle}
                      </span>
                      <p className="text-sm text-muted-text leading-relaxed mb-4">
                        {svc.description}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-accent-blue transition-colors group"
                      >
                        <span>Discuss this service</span>
                        <ArrowRight
                          size={11}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
