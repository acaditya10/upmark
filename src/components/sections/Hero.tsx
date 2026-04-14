"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HeroMetric } from "@/types";

const DEFAULT_METRICS: HeroMetric[] = [
  { value: "120", suffix: "+", label: "Projects Delivered" },
  { value: "98", suffix: "%", label: "Client Retention" },
  { value: "3x", label: "Average ROI", isGold: true },
];

interface HeroProps {
  videoUrl?: string | null;
  metrics?: HeroMetric[];
}

export const Hero = ({ videoUrl, metrics }: HeroProps) => {
  const defaultVideo = "https://res.cloudinary.com/demo/video/upload/q_auto:good,f_auto/v1614264627/docs/cld-video-default.mp4";
  const defaultPoster = "https://res.cloudinary.com/demo/video/upload/so_0/v1614264627/video/cld-video-default-poster.jpg";
  const currentVideoUrl = videoUrl || defaultVideo;
  const displayMetrics = metrics && metrics.length > 0 ? metrics : DEFAULT_METRICS;

  return (
    <section className="relative min-h-screen flex items-center pt-0 pb-8 sm:pb-16 overflow-hidden">
      {/* Background Video & Ambient Lighting */}
      <div className="absolute inset-0 z-0 bg-primary-bg overflow-hidden">
        {/* Reduced glow divs — smaller radii, lower opacity */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
           <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent-blue/15 blur-[80px]" />
           <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent-gold/8 blur-[100px]" />
        </div>
        <video 
          key={currentVideoUrl}
          autoPlay 
          muted 
          loop 
          playsInline 
          className="object-cover w-full h-full"
          poster={!videoUrl ? defaultPoster : undefined}
          preload="metadata"
        >
          <source src={currentVideoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-start justify-center h-full text-left mt-16 sm:mt-20">
        
        {/* Soft radial darkening — reduced blur for perf */}
        <div className="absolute top-[30%] sm:top-[40%] left-[-20%] sm:left-[-10%] -translate-y-1/2 w-[600px] sm:w-[1000px] h-[600px] sm:h-[800px] bg-primary-bg/80 blur-[60px] sm:blur-[80px] rounded-full pointer-events-none -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0, 1] }}
          className="max-w-4xl flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 sm:mb-6 rounded-full border border-accent-blue/30 bg-accent-blue/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-accent-blue text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>
            Integrated Marketing Agency
          </div>
          
          <h1 className="text-[2rem] leading-[1.15] xs:text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight font-heading">
            <span className="text-white drop-shadow-lg">Integrated Marketing</span> <br className="hidden lg:block"/>
            <span className="text-white drop-shadow-lg">That <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-blue-400 to-indigo-300 drop-shadow-sm glow-blue-lg">Moves</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-gold to-yellow-400 drop-shadow-sm glow-gold">Markets</span></span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-text max-w-xl mb-8 sm:mb-10 leading-relaxed font-body font-light">
            Strategy, performance marketing, content and execution — unified. We don&apos;t just run campaigns. <span className="text-primary-text font-medium">We build complete marketing systems that scale.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/contact" className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-accent-blue text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" /></span>
            </Link>
            
            <Link href="/work" className="group w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base text-primary-text bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200">
              View Our Work
            </Link>
          </div>
        </motion.div>

        {/* Premium Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.4, 0, 1] }}
          className="mt-10 sm:mt-16 md:mt-20 grid grid-cols-3 gap-4 sm:gap-8 md:gap-16 relative w-full max-w-4xl"
        >
          {/* Subtle Top Border */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent -translate-y-3 sm:-translate-y-6"></div>
          
          {displayMetrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-start gap-0.5 sm:gap-1 group">
              {metric.isGold ? (
                <span className="text-xl sm:text-3xl md:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-300 tracking-tighter drop-shadow-sm glow-gold">
                  {metric.value}
                </span>
              ) : (
                <span className="text-xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tighter group-hover:text-accent-blue transition-colors duration-200">
                  {metric.suffix ? (
                    <>{metric.value}<span className="text-accent-blue">{metric.suffix}</span></>
                  ) : (
                    metric.value
                  )}
                </span>
              )}
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-text/80 uppercase tracking-wider sm:tracking-widest font-semibold">{metric.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
