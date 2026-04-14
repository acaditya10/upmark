import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageSquareQuote, PlayCircle, ArrowRight } from "lucide-react";
import { getCaseStudies, getTestimonials } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Case Studies | Upmark",
  description: "Explore our recent studies, success stories, and stills & motions.",
};

export default async function CaseStudiesPage() {
  const [allCaseStudies, testimonials] = await Promise.all([
    getCaseStudies(),
    getTestimonials(),
  ]);

  // Group case studies by category
  const theoreticalStudies = allCaseStudies.filter(cs => cs.category === "Studies");
  const successStories = allCaseStudies.filter(cs => cs.category === "Success Stories");
  const stillsAndMotions = allCaseStudies.filter(cs => cs.category === "Stills & Motions");

  return (
    <div className="pt-32 pb-32 relative">
      <div className="container mx-auto px-6 flex flex-col gap-32">
        <div className="max-w-4xl pt-10">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             PORTFOLIO
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 tracking-tight">Case Studies.</h1>
          <p className="text-xl text-muted-text font-light max-w-2xl">Results driven by strategy, scaled by execution. We measure our success purely by the continuous growth of our partners.</p>
        </div>

        {/* 1. (Theoretical) Studies */}
        <section id="studies" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Studies</h2>
            <p className="text-muted-text font-light mt-2">Deep dives into strategy architecture and theoretical frameworks.</p>
          </div>
          {theoreticalStudies.length === 0 ? (
            <p className="text-muted-text/60 py-8">No studies published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {theoreticalStudies.map((item) => (
                <div key={item.id} className="group flex flex-col bg-secondary-surface/30 border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all">
                  {/* Visual */}
                  <div className="w-full aspect-video bg-black/50 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-blue-900/30 to-slate-900/10'} opacity-50 mix-blend-overlay`}></div>
                    {item.imageUrl && (
                      <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                    )}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs text-white uppercase tracking-widest font-semibold border border-white/10">{item.tag || item.category}</div>
                  </div>
                  {/* Body */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-4 line-clamp-1">{item.title}</h3>
                    <p className="text-muted-text/90 font-light text-sm mb-8 flex-grow">{item.description}</p>
                    {(item.stat1 || item.stat2) && (
                      <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        {item.stat1 && (
                          <div>
                            <div className="text-2xl font-bold text-white">{item.stat1}</div>
                            <div className="text-[10px] text-muted-text uppercase tracking-wider">{item.stat1label}</div>
                          </div>
                        )}
                        {item.stat2 && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{item.stat2}</div>
                            <div className="text-[10px] text-muted-text uppercase tracking-wider">{item.stat2label}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2. Success Stories */}
        <section id="success-stories" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Success Stories</h2>
            <p className="text-muted-text font-light mt-2">Real-world results and general portfolio highlights.</p>
          </div>
          {successStories.length === 0 ? (
            <p className="text-muted-text/60 py-8">No success stories published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {successStories.map((item) => (
                <div key={item.id} className="group flex flex-col sm:flex-row bg-secondary-surface/20 border border-white/5 rounded-3xl overflow-hidden hover:bg-secondary-surface/40 hover:border-white/10 transition-all">
                  {/* Visual - Left half on desktop */}
                  <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto bg-black/30 relative overflow-hidden flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-blue-900/30 to-slate-900/10'} opacity-40 mix-blend-overlay`}></div>
                    {item.imageUrl && (
                      <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-center">
                    <div className="text-accent-blue font-semibold uppercase tracking-widest text-[10px] mb-2">{item.tag || item.category}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-muted-text/80 font-light text-sm mb-6 line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      {item.stat1 && (
                        <div>
                          <div className="text-xl font-bold text-white">{item.stat1}</div>
                          <div className="text-[10px] text-muted-text uppercase tracking-wider">{item.stat1label}</div>
                        </div>
                      )}
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white text-muted-text transition-colors">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. Stills & Motions */}
        <section id="stills-and-motions" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Stills & Motions</h2>
            <p className="text-muted-text font-light mt-2">Production portfolio showcasing cinematic quality and compelling creatives.</p>
          </div>
          {stillsAndMotions.length === 0 ? (
            <p className="text-muted-text/60 py-8">No stills & motions published yet.</p>
          ) : (
            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 snap-x hide-scrollbar">
              {stillsAndMotions.map((item) => (
                <div key={item.id} className="snap-start flex-shrink-0 w-[280px] sm:w-[350px] group relative rounded-2xl overflow-hidden cursor-pointer bg-secondary-surface/40 border border-white/5">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                    {item.imageUrl && (
                      <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                    )}
                    
                    {/* Play icon for motions */}
                    {item.mediaType === "Motion" && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white/70 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                        <PlayCircle size={48} strokeWidth={1} />
                      </div>
                    )}

                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
                      <div className="flex items-center gap-2 mb-2">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.mediaType === 'Motion' ? 'bg-accent-blue/20 text-accent-blue' : 'bg-accent-gold/20 text-accent-gold'}`}>
                           {item.mediaType || "Stills"}
                         </span>
                         {item.duration && <span className="text-[10px] text-white/70 font-mono tracking-widest">{item.duration}</span>}
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. Testimonials */}
        <section id="testimonials" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Testimonials</h2>
            <p className="text-muted-text font-light mt-2">What our partners say about the work we do.</p>
          </div>
          {testimonials.length === 0 ? (
            <p className="text-muted-text/60 py-8">No testimonials published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="p-10 rounded-3xl bg-secondary-surface/30 border border-white/5 relative">
                  <MessageSquareQuote size={40} className="text-white/10 absolute top-8 right-8" />
                  <p className="text-lg md:text-xl text-white font-light italic mb-8 relative z-10">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-xl uppercase">{t.name.charAt(0)}</div>
                    <div>
                      <div className="text-white font-semibold">{t.name}</div>
                      <div className="text-muted-text text-sm">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 5. CTA Area */}
        <section className="mt-10 py-16 border-t border-white/10 flex flex-col items-center justify-center text-center">
           <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-8">Ready to compound your growth?</h2>
           <div className="flex flex-col sm:flex-row items-center gap-4">
             <Link href="/services" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base text-primary-text bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all">
               Explore our services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </section>
      </div>

      {/* Floating Get Started Button */}
      <Link href="/contact" className="fixed bottom-8 right-8 z-50 group flex items-center justify-center gap-3 bg-accent-blue text-white px-6 py-4 rounded-full font-bold text-base shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all">
        <span className="relative z-10 flex items-center gap-2">Get started! <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
      </Link>
    </div>
  );
}
