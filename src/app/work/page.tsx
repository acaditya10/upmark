"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const caseStudies = [
  { title: "Ingri", tag: "Fashion & Lifestyle", category: "Fashion", stat1: "+210%", stat1label: "Revenue Growth", stat2: "+380%", stat2label: "Social Engagement", desc: "Ingri was a premium fashion brand struggling to differentiate in a saturated market. Organic reach had declined 60% and paid ROI was stagnating.", gradient: "from-purple-900/30 to-indigo-900/10" },
  { title: "Motorworks", tag: "Automotive Services", category: "Automotive", stat1: "+320%", stat1label: "Lead Volume", stat2: "-58%", stat2label: "Cost Per Lead", desc: "Motorworks had strong offline reputation but near-zero digital presence. Competitors dominated local search and their website converted at under 1%.", gradient: "from-blue-900/30 to-slate-900/10" },
  { title: "Luxe Stays", tag: "Hospitality & Hotels", category: "Hospitality", stat1: "+175%", stat1label: "Booking Rate", stat2: "+£420K", stat2label: "Direct Revenue", desc: "Luxe Stays was over-reliant on OTA platforms paying 18% commission. They needed direct bookings and brand awareness in a premium segment.", gradient: "from-amber-900/30 to-orange-900/10" },
  { title: "The Grove Kitchen", tag: "Food & Restaurant", category: "Food", stat1: "+290%", stat1label: "Reservations", stat2: "0→45K", stat2label: "TikTok Followers", desc: "The Grove Kitchen was a new independent restaurant with no digital footprint, limited budget and fierce competition from established names.", gradient: "from-emerald-900/30 to-teal-900/10" },
  { title: "Vertex Corp", tag: "B2B Technology", category: "Technology", stat1: "+£2.1M", stat1label: "Pipeline Value", stat2: "+430%", stat2label: "Demo Requests", desc: "Vertex had a technically superior product but poor messaging and a sales team struggling to generate qualified demo requests.", gradient: "from-rose-900/30 to-red-900/10" },
  { title: "Bloom Retail", tag: "E-commerce & Retail", category: "E-commerce", stat1: "+340%", stat1label: "eCommerce Revenue", stat2: "6.8×", stat2label: "ROAS", desc: "Bloom Retail had strong products but weak digital marketing — high ad spend with poor returns and no sustainable organic channel.", gradient: "from-cyan-900/30 to-blue-900/10" },
];

const categories = ["All", ...Array.from(new Set(caseStudies.map(cs => cs.category)))];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStudies = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter(cs => cs.category === activeCategory);

  return (
    <div className="pt-32 pb-32">
      <section className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="mb-12 text-center flex flex-col items-center">
          <span className="text-accent-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block inline-flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-gold"></span>
             OUR WORK
             <span className="w-8 h-[1px] bg-accent-gold"></span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">
             Results that speak <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-gold to-yellow-400">for themselves.</span>
          </h2>
          <p className="text-muted-text text-xl max-w-2xl font-light">
             Click any case study to read the full story.
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal className="mb-12" delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-filter-tab"
                    className="absolute inset-0 bg-accent-blue/15 border border-accent-blue/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Case Study Grid with Layout Animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <AnimatePresence mode="popLayout">
             {filteredStudies.map((cs) => (
                <motion.div
                  key={cs.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0, 1] }}
                >
                  <Link href="#" className={`group block p-10 rounded-3xl bg-secondary-surface/40 bg-gradient-to-br ${cs.gradient} border border-white/5 backdrop-blur-md hover:border-accent-blue/30 transition-all duration-300 relative overflow-hidden h-full hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]`}>
                     {/* Top edge glow */}
                     <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <div className="text-accent-blue font-bold uppercase tracking-widest text-xs mb-2">{cs.tag}</div>
                     <h3 className="text-3xl font-black text-white mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-blue transition-all">{cs.title}</h3>
                     
                     <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/10">
                        <div>
                           <div className="text-4xl font-black text-white">{cs.stat1}</div>
                           <div className="text-muted-text text-sm uppercase tracking-wider">{cs.stat1label}</div>
                        </div>
                        <div>
                           <div className="text-4xl font-black text-white">{cs.stat2}</div>
                           <div className="text-muted-text text-sm uppercase tracking-wider">{cs.stat2label}</div>
                        </div>
                     </div>

                     <p className="text-muted-text/90 font-light mb-8">{cs.desc}</p>
                     <div className="inline-flex items-center gap-2 text-accent-blue font-semibold group-hover:gap-4 transition-all">
                        View Case Study <ArrowUpRight size={18} />
                     </div>
                  </Link>
                </motion.div>
             ))}
           </AnimatePresence>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <div id="testimonials" className="mt-32">
        <TestimonialsCarousel />
      </div>

    </div>
  );
}
