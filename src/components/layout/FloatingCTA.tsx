"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { usePathname } from "next/navigation";

export const FloatingCTA = () => {
  const pathname = usePathname();
  
  // Don't show CTA on contact page since they are already there
  if (pathname === "/contact") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 safe-bottom"
    >
      <Link href="/contact" className="group">
        <div className="relative bg-gradient-to-r from-accent-blue via-blue-500 to-indigo-500 text-white font-semibold px-5 py-3 sm:px-8 sm:py-4 rounded-full flex items-center gap-2 sm:gap-3 overflow-hidden shadow-[0_8px_30px_-10px_rgba(59,130,246,0.7)] sm:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] border border-white/20 transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-[0_10px_50px_-5px_rgba(59,130,246,0.9)]">
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-accent-gold/40 blur-xl rounded-full"></div>
          <Rocket size={18} className="relative z-10 sm:w-5 sm:h-5" />
          <span className="relative z-10 text-sm sm:text-base">Get started!</span>
        </div>
      </Link>
    </motion.div>
  );
};
