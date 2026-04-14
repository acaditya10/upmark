"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/types";

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "default-1",
    quote: "Upmark completely transformed our digital strategy. Their integrated approach helped us scale our pipeline by 3x in just six months while maintaining incredibly high creative standards.",
    name: "Sarah Jenkins",
    role: "CMO, Vertex Corp"
  },
  {
    id: "default-2",
    quote: "Unlike other agencies that just run ads, Upmark actually took the time to understand our complete marketing system. The results have been phenomenal — a 340% increase in eCommerce revenue.",
    name: "Michael Ross",
    role: "Founder, Bloom Retail"
  },
  {
    id: "default-3",
    quote: "The speed and quality of Upmark's production team is unmatched. They feel less like an agency and more like an extension of our internal team. Highly recommended.",
    name: "Eleanor Vance",
    role: "Director of Marketing, Luxe Stays"
  }
];

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
}

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  return (
    <section className="container mx-auto px-4 sm:px-6 relative z-10 my-16 sm:my-24 md:my-32">
      <div className="flex flex-col items-center mb-10 sm:mb-16 text-center">
         <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block inline-flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent-blue"></span>
            CLIENT STORIES
            <span className="w-8 h-[1px] bg-accent-blue"></span>
         </span>
         <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-4 sm:mb-6">
            Don&apos;t just take <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-indigo-400">our word for it.</span>
         </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="absolute -top-6 sm:-top-10 -left-4 sm:-left-10 text-white/5 z-0">
          <Quote size={80} className="sm:w-[120px] sm:h-[120px]" />
        </div>
        
        <div className="relative z-10 bg-secondary-surface/40 border border-white/10 backdrop-blur-md p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl overflow-hidden min-h-[240px] sm:min-h-[300px] flex items-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIndex}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="flex flex-col gap-8 w-full"
             >
                <p className="text-base sm:text-xl md:text-3xl font-light text-white leading-relaxed italic">
                  &quot;{displayTestimonials[currentIndex].quote}&quot;
                </p>
                <div className="flex items-center justify-between mt-4">
                   <div>
                     <h4 className="text-white font-bold text-base sm:text-lg">{displayTestimonials[currentIndex].name}</h4>
                     <p className="text-accent-blue text-sm">{displayTestimonials[currentIndex].role}</p>
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-6 sm:mt-8 px-0 sm:px-4 flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex gap-2">
            <button onClick={prevTestimonial} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent-blue/50 transition-all text-white">
               <ChevronLeft size={20} />
            </button>
            <button onClick={nextTestimonial} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent-blue/50 transition-all text-white">
               <ChevronRight size={20} />
            </button>
          </div>
          <Link href="/work#testimonials" className="text-sm sm:text-base text-white font-semibold flex items-center gap-2 hover:text-accent-blue transition-colors group">
            Explore All Case Studies & Testimonials
            <span className="group-hover:translate-x-1 transition-transform border-[1px] border-white/20 p-2 rounded-full group-hover:border-accent-blue text-xs">
              <ChevronRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
