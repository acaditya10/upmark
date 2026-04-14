"use client";

import { motion } from "framer-motion";

export interface GridItem {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  subtitle?: string;
  number?: string;
}

interface ContentGridProps {
  items: GridItem[];
  columns?: 2 | 3 | 4;
  type?: "numbered" | "icon" | "standard";
}

export const ContentGrid = ({ items, columns = 3, type = "standard" }: ContentGridProps) => {
  const gridClasses = columns === 2 ? "grid-cols-1 md:grid-cols-2" : columns === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridClasses} gap-4 sm:gap-6 md:gap-8`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.4, 0, 1] }}
          className="group relative bg-secondary-surface/40 backdrop-blur-xl border border-white/5 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] hover:border-accent-blue/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:-translate-y-1"
        >
          {/* Subtle Hover Gradient Background & Top Highlight Edge */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 via-transparent to-transparent group-hover:from-accent-blue/5 rounded-[2rem] transition-all duration-700 pointer-events-none"></div>
          
          {item.subtitle && (
            <div className="text-accent-blue font-bold text-xs uppercase tracking-widest mb-4">
              {item.subtitle}
            </div>
          )}

          {type === "numbered" && (
            <div className="text-5xl sm:text-7xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/0 mb-4 sm:mb-8 group-hover:from-accent-blue/20 group-hover:to-transparent transition-all duration-500">
              {item.number || (index + 1).toString().padStart(2, "0")}
            </div>
          )}
          
          {type === "icon" && item.icon && (
            <div className="w-16 h-16 bg-primary-bg/80 shadow-inner border border-white/5 rounded-2xl flex items-center justify-center text-accent-blue mb-8 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/30 group-hover:text-accent-blue transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              {item.icon}
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-blue transition-all duration-500 relative z-10 w-fit">
            {item.title}
          </h3>
          <p className="text-muted-text font-body leading-relaxed relative z-10 text-sm sm:text-base md:text-lg font-light">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
