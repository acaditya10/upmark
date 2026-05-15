"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROCESS_DATA } from "./services-data";

export function ProcessOrbital() {
  const [activeNode, setActiveNode] = useState(PROCESS_DATA[0].id);

  const activeData = PROCESS_DATA.find((p) => p.id === activeNode) || PROCESS_DATA[0];

  // Hexagon/Circle layout for 6 nodes
  const radius = 220;
  const getPosition = (index: number, total: number) => {
    // Start from top (-90 degrees)
    const angle = (index * (360 / total) - 90) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="w-full relative">
      {/* Orbital Layout */}
      <div className="flex flex-col items-center justify-center py-10 overflow-hidden lg:overflow-visible">
        
        <div className="text-center mb-8">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-accent-blue"></span>
            HOW WE WORK
            <span className="w-8 h-[1px] bg-accent-blue"></span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white">
            Our <span className="text-accent-gold">6-Step Process</span>
          </h2>
        </div>

        <div className="relative w-[700px] h-[700px] flex items-center justify-center mt-10 scale-[0.45] sm:scale-[0.6] md:scale-75 lg:scale-100 origin-center -my-[170px] sm:-my-[120px] md:-my-[80px] lg:my-0">
          
          {/* Orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[440px] h-[440px] rounded-full border border-white/5" />
            <div className="absolute w-[520px] h-[520px] rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />
          </div>

          {/* SVG Connection Paths (Center to Nodes) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {PROCESS_DATA.map((item, i) => {
              const pos = getPosition(i, PROCESS_DATA.length);
              const isActive = activeNode === item.id;
              return (
                <motion.line
                  key={`process-line-${item.id}`}
                  x1="350"
                  y1="350"
                  x2={350 + pos.x}
                  y2={350 + pos.y}
                  stroke={isActive ? "rgba(212, 175, 55, 0.5)" : "rgba(255, 255, 255, 0.05)"}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-colors duration-500"
                />
              );
            })}
            
            {/* Circular progress highlight representing flow */}
            <motion.circle
              cx="350"
              cy="350"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </svg>

          {/* Central Information Core */}
          <div className="absolute z-10 w-[280px] h-[280px] rounded-full border border-white/10 bg-[#0a0f1c]/90 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.1)] p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent-gold/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <span className="text-accent-gold font-black text-4xl mb-2 opacity-50 font-heading">
                  {activeData.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {activeData.title}
                </h3>
                <p className="text-sm text-muted-text font-light leading-relaxed">
                  {activeData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Process Nodes */}
          {PROCESS_DATA.map((item, i) => {
            const pos = getPosition(i, PROCESS_DATA.length);
            const isActive = activeNode === item.id;

            return (
              <div
                key={item.id}
                className="absolute z-20"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setActiveNode(item.id)}
                onClick={() => setActiveNode(item.id)}
              >
                <motion.button
                  className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 relative group
                    ${isActive 
                      ? "bg-accent-gold/10 border-accent-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]" 
                      : "bg-[#0a0f1c] border-white/10 hover:border-white/30"}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`font-bold font-heading text-lg ${isActive ? "text-accent-gold" : "text-white/50"}`}>
                    {item.num}
                  </span>
                  
                  {/* Floating Title (always visible, or visible on hover/active) */}
                  <div className={`absolute top-full mt-4 whitespace-nowrap text-sm font-bold tracking-wider uppercase transition-all duration-300
                    ${isActive ? "text-white opacity-100 translate-y-0" : "text-white/30 opacity-50 group-hover:opacity-100 -translate-y-1"}`}>
                    {item.title}
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="processActiveDot"
                      className="absolute inset-0 border-2 border-accent-gold rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}
