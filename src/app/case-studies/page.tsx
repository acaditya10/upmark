import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";
import { getCaseStudies } from "@/lib/firestore";
import type { CaseStudy } from "@/types";

export const metadata: Metadata = {
  title: "Case Studies | Upmark — Real Results, Real Growth",
  description: "Explore Upmark's case studies. See how we've driven measurable growth for brands across fashion, hospitality, tech and more.",
};

// ─── SVG Icons ─────────────────────────────────────────────
const LinkedinIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

// ─── Default fallback data ─────────────────────────────────
const DEFAULT_STUDIES: CaseStudy[] = [
  {
    id: "study-1",
    title: "Mother's Kitchen",
    client: "Mother's Kitchen",
    tag: "Brand Solutions",
    category: "Studies",
    timeframe: "Approximately 1 year",
    hiredFor: "We did their BTL activation and planned out and provided end-to-end execution for their integrated marketing campaign, the most important aspect of which was brand solutions.",
    situation: "While the brand was not new, after operating initially out of London, they were trying to establish themselves in India right around the time the pandemic hit. This caused a sudden halt and slow recovery, and their presence had grown quite negligible with out-of-touch content.",
    keyExecutions: "• Handled crisis management, communications, and event handling for events like BW Enba awards and BW People Disability Positive Summit & Awards.\n• Redesigned their boxes and packaging for the regular product line up and premium gifting boxes (e.g., Rakshabandhan 2022).\n• Conducted product photography for their range of products, used for packaging redesign and repurposed in various contexts.",
    metrics: [],
    description: "Integrated marketing campaign and brand solutions for Mother's Kitchen.",
    imageUrl: "",
    gradient: "from-amber-900/30 to-orange-900/10",
    websiteUrl: "https://www.motherskitchen.co.in/",
    linkedinUrl: "https://www.linkedin.com/company/mother's-kitchen/",
  },
  {
    id: "study-2",
    title: "Chefs United",
    client: "Chefs United",
    tag: "Packaging & Media Production",
    category: "Studies",
    timeframe: "6 months (Late 2023 - Mid 2024)",
    hiredFor: "We designed the packaging for their new range of products to be launched and also handled the media production of them.",
    situation: "The company had been going steady for a while and they were now looking to do a PMF test in order to launch their new range of freeze dried and frozen foods.",
    keyExecutions: "• Designed their packaging for the Freeze dried range and Frozen range, which were to be launched on quick commerce platforms.\n• Handled the promotional media production for the new product range.",
    metrics: [],
    description: "Packaging design and media production for Chefs United's new freeze-dried and frozen product lines.",
    imageUrl: "",
    gradient: "from-blue-900/30 to-slate-900/10",
  },
  {
    id: "study-3",
    title: "Fab cafe",
    client: "Fabindia",
    tag: "Short Form Content",
    category: "Studies",
    timeframe: "April - June 2025",
    hiredFor: "We handled their short form content for 2025 Q2.",
    situation: "At the time, Fabindia was looking to shut down Fabcafe entirely due to internal issues. While it seemed like a sinking ship, our work added to the efforts being made to keep Fabcafe afloat.",
    keyExecutions: "• Primarily created and edited reels featuring their products to be showcased on their social media channels.",
    metrics: [],
    description: "Short form content and reels for Fabcafe's social media.",
    imageUrl: "",
    gradient: "from-rose-900/30 to-red-900/10",
  },
  {
    id: "study-4",
    title: "Revfin",
    client: "Revfin",
    tag: "Production Support",
    category: "Studies",
    timeframe: "N/A",
    hiredFor: "We worked with them mostly for production support and live event coverage, i.e. production as well as post production. This included making a number of brand films for them and a commemorative motion graphic marking 6 years of their journey.",
    situation: "We elevated the quality of their content, providing them with better, more crisp videos and editing, raising the bar for future audio visual projects.",
    keyExecutions: "• Provided production support for topical videos, brand films, milestone videos, live event coverage, and photography for press conferences and recurring events.\n• Handled production and post-production for a highlight video of their refurbishment center named Revshalla, showcasing their processes and offering EV performance tips.",
    metrics: [],
    description: "Production support, brand films, and live event coverage for Revfin.",
    imageUrl: "",
    gradient: "from-emerald-900/30 to-teal-900/10",
    websiteUrl: "https://revfin.in/",
    linkedinUrl: "https://www.linkedin.com/company/revfinindia/",
    youtubeUrl: "https://www.youtube.com/@revfinindia9495",
  },
  {
    id: "study-5",
    title: "CSOI",
    client: "CSOI",
    tag: "Visual Content",
    category: "Studies",
    timeframe: "72 hours turnaround",
    hiredFor: "A short project with a limited scope to provide high quality photos and a brandfilm (handling its production and post production) to be featured on their website. We also helped with vectorisation of their logo.",
    situation: "They needed to urgently update the visual content on their website as it had been outdated for a while, giving us only 72 hours to deliver the work. A last-minute addition was the vectorisation of their logo.",
    keyExecutions: "• Provided various Stills of the premises, highlighting their facilities and ambience.\n• Created a brandfilm to give viewers a better understanding of the CSOI experience.\n• Completed vectorisation of their logo.",
    metrics: [],
    description: "High quality photography and brandfilm production for CSOI with rapid turnaround.",
    imageUrl: "",
    gradient: "from-purple-900/30 to-indigo-900/10",
  }
];

export default async function CaseStudiesPage() {
  const allCaseStudies = await getCaseStudies();

  // Use Firestore data if available, otherwise use defaults
  const studies = allCaseStudies.length > 0
    ? allCaseStudies.filter(cs => cs.category === "Studies" || cs.category === "Success Stories")
    : DEFAULT_STUDIES;

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-32 relative">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-16 sm:gap-24 md:gap-32">
        {/* Page Header */}
        <div className="max-w-4xl pt-4 sm:pt-10">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             CASE STUDIES
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-heading text-white mb-4 sm:mb-6 tracking-tight">Our Work.</h1>
          <p className="text-base sm:text-xl text-muted-text font-light max-w-2xl">Results driven by strategy, scaled by execution. Explore our portfolio of brands.</p>
        </div>

        {/* Case Studies Grid */}
        <section id="studies" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {studies.map((item) => (
              <div key={item.id} className="group flex flex-col bg-[#1E293B]/40 border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all shadow-lg">
                {/* Visual */}
                <div className="w-full aspect-video relative overflow-hidden bg-[#0F172A]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-blue-900/30 to-slate-900/10'} opacity-50 mix-blend-overlay z-10 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} — case study by Upmark`}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.gradient || 'from-blue-900/30 to-slate-900/10'} opacity-20`}></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent z-10"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full text-xs text-white uppercase tracking-widest font-semibold border border-white/10 z-20">{item.tag || item.category}</div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow bg-secondary-surface/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-white leading-tight">{item.title}</h3>
                      {/* Socials */}
                      {(item.websiteUrl || item.linkedinUrl || item.youtubeUrl) && (
                        <div className="flex items-center gap-3">
                          {item.websiteUrl && (
                            <Link href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors" title="Website">
                              <Globe size={18} />
                            </Link>
                          )}
                          {item.linkedinUrl && (
                            <Link href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors" title="LinkedIn">
                              <LinkedinIcon size={18} />
                            </Link>
                          )}
                          {item.youtubeUrl && (
                            <Link href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors" title="YouTube">
                              <YoutubeIcon size={18} />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                    {item.timeframe && (
                      <span className="text-xs font-semibold tracking-wider uppercase text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.timeframe}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-5 text-sm font-light text-muted-text flex-grow">
                    {item.hiredFor && (
                      <div>
                        <strong className="text-white font-medium block mb-1.5 text-[15px]">What we were hired to do:</strong>
                        <p className="leading-relaxed">{item.hiredFor}</p>
                      </div>
                    )}
                    
                    {item.situation && (
                      <div>
                        <strong className="text-white font-medium block mb-1.5 text-[15px]">The situation:</strong>
                        <p className="leading-relaxed">{item.situation}</p>
                      </div>
                    )}

                    {item.keyExecutions && (
                      <div>
                        <strong className="text-white font-medium block mb-1.5 text-[15px]">Key executions:</strong>
                        <div className="leading-relaxed whitespace-pre-wrap">{item.keyExecutions}</div>
                      </div>
                    )}

                    {!item.hiredFor && !item.situation && !item.keyExecutions && (
                      <p className="leading-relaxed">{item.description}</p>
                    )}
                  </div>

                  {/* Fallback Metrics/Stats from old design if present */}
                  {(item.stat1 || item.stat2) && (
                    <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8">
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
        </section>

        {/* CTA Area */}
        <section className="mt-10 py-16 border-t border-white/10 flex flex-col items-center justify-center text-center">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-heading text-white mb-6 sm:mb-8">Ready to compound your growth?</h2>
           <p className="text-muted-text text-base sm:text-lg max-w-xl mb-8 sm:mb-10 font-light">Let&apos;s discuss how Upmark can build a complete marketing system for your business.</p>
           <div className="flex flex-col sm:flex-row items-center gap-4">
             <Link href="/contact" className="group flex items-center justify-center gap-2 bg-accent-blue text-white px-8 py-4 rounded-lg font-semibold text-base overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)]">
               Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link href="/services" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base text-primary-text bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200">
               View our services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </section>
      </div>
    </div>
  );
}
