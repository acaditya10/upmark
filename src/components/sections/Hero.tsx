"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroProps {
  videoUrl?: string | null;
}

export const Hero = ({ videoUrl }: HeroProps) => {
  const defaultVideo = "https://res.cloudinary.com/demo/video/upload/q_auto:good,f_auto/v1614264627/docs/cld-video-default.mp4";
  const defaultPoster = "https://res.cloudinary.com/demo/video/upload/so_0/v1614264627/video/cld-video-default-poster.jpg";
  const currentVideoUrl = videoUrl || defaultVideo;

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Video & Premium Lighting */}
      <div className="absolute inset-0 z-0 bg-primary-bg overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
           <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent-blue/20 blur-[120px]" />
           <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent-gold/10 blur-[150px]" />
        </div>
        <video 
          key={currentVideoUrl}
          autoPlay 
          muted 
          loop 
          playsInline 
          className="object-cover w-full h-full"
          poster={!videoUrl ? defaultPoster : undefined}
        >
          <source src={currentVideoUrl} type="video/mp4" />
        </video>
        {/* Soft Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-bg via-primary-bg/70 to-primary-bg/30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0, 1] }}
          className="max-w-5xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-accent-blue/30 bg-accent-blue/10 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)] text-accent-blue text-xs tracking-widest uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
            Integrated Marketing Agency
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tight font-heading">
            <span className="text-white drop-shadow-lg">Integrated Marketing</span> <br className="hidden md:block"/>
            <span className="text-white drop-shadow-lg">That <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-blue-400 to-indigo-300 drop-shadow-sm glow-blue-lg">Moves</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-gold to-yellow-400 drop-shadow-sm glow-gold">Markets</span></span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-text max-w-3xl mb-12 leading-relaxed font-body font-light">
            Strategy, performance marketing, content and execution — unified. We don't just run campaigns. <span className="text-primary-text font-medium">We build complete marketing systems that scale.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-accent-blue text-white px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 blur-xl rounded-full group-hover:scale-[3] transition-transform duration-700 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            
            <Link href="/work" className="group w-full sm:w-auto flex items-center justify-center px-10 py-5 rounded-xl font-semibold text-lg text-primary-text bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all">
              View Our Work
            </Link>
          </div>
        </motion.div>

        {/* Premium Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.4, 0, 1] }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 relative max-w-4xl mx-auto"
        >
          {/* Subtle Top Border */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-8"></div>
          
          <div className="flex flex-col gap-2 group">
            <span className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter group-hover:text-accent-blue transition-colors">120<span className="text-accent-blue">+</span></span>
            <span className="text-xs text-muted-text/80 uppercase tracking-widest font-semibold">Projects Delivered</span>
          </div>
          <div className="flex flex-col gap-2 group">
            <span className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter group-hover:text-accent-blue transition-colors">98<span className="text-accent-blue">%</span></span>
            <span className="text-xs text-muted-text/80 uppercase tracking-widest font-semibold">Client Retention</span>
          </div>
          <div className="flex flex-col gap-2 group">
            <span className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-300 tracking-tighter drop-shadow-sm glow-gold">3x</span>
            <span className="text-xs text-muted-text/80 uppercase tracking-widest font-semibold">Average ROI</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-text text-sm uppercase tracking-widest font-semibold"
        >
          Scroll
          <ChevronDown className="animate-bounce" size={16} />
        </motion.div>
      </div>
    </section>
  );
};
