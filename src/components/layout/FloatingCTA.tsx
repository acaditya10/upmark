"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
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
      className="fixed bottom-6 right-6 z-40"
    >
      <Link href="/contact" className="group">
        <div className="relative bg-gradient-to-r from-accent-blue via-blue-500 to-indigo-500 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 overflow-hidden shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] border border-white/20 transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-[0_10px_50px_-5px_rgba(59,130,246,0.9)]">
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-accent-gold/40 blur-xl rounded-full"></div>
          <MessageSquare size={20} className="relative z-10" />
          <span className="relative z-10">Let's build together</span>
        </div>
      </Link>
    </motion.div>
  );
};
