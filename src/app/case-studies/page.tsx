import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquareQuote, PlayCircle, ArrowRight } from "lucide-react";
import { getCaseStudies, getTestimonials } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Case Studies | Upmark — Real Results, Real Growth",
  description: "Explore Upmark's portfolio of case studies, success stories, and production work. See how we've driven measurable growth for brands across fashion, hospitality, tech and more.",
};

// ─── Default fallback data ─────────────────────────────────
const DEFAULT_STUDIES = [
  {
    id: "study-1",
    title: "Building a Growth Engine for Fashion DTC",
    description: "A strategic deep-dive into how we architected a multi-channel acquisition system for Ingri — combining paid media, organic content and influencer partnerships into a single, self-reinforcing growth loop that delivered 210% revenue growth in 8 months.",
    category: "Studies" as const,
    client: "Ingri",
    metrics: ["+210% Revenue", "+380% Engagement"],
    mediaUrl: "",
    tag: "Growth Architecture",
    stat1: "+210%",
    stat1label: "Revenue Growth",
    stat2: "8 months",
    stat2label: "Timeline",
    imageUrl: "/images/casestudy-ingri.png",
    gradient: "from-purple-900/30 to-indigo-900/10",
  },
  {
    id: "study-2",
    title: "Redefining B2B Lead Generation at Scale",
    description: "How we transformed Vertex Corp's go-to-market strategy — replacing cold outbound with an inbound-first demand generation system that created £2.1M in qualified pipeline and 430% more demo requests within two quarters.",
    category: "Studies" as const,
    client: "Vertex Corp",
    metrics: ["+£2.1M Pipeline", "+430% Demos"],
    mediaUrl: "",
    tag: "Demand Generation",
    stat1: "+£2.1M",
    stat1label: "Pipeline Created",
    stat2: "+430%",
    stat2label: "Demo Requests",
    imageUrl: "/images/casestudy-vertex.png",
    gradient: "from-rose-900/30 to-red-900/10",
  },
];

const DEFAULT_SUCCESS_STORIES = [
  {
    id: "success-1",
    title: "Motorworks: From Zero to Digital-First",
    description: "Motorworks had a strong offline reputation but virtually no digital footprint. We built their entire online presence from scratch — SEO, paid search, social content and a conversion-optimised website — cutting cost-per-lead by 58% while tripling volume.",
    category: "Success Stories" as const,
    client: "Motorworks",
    metrics: ["+320% Leads"],
    mediaUrl: "",
    tag: "Digital Transformation",
    stat1: "+320%",
    stat1label: "Lead Volume",
    imageUrl: "/images/casestudy-motorworks.png",
    gradient: "from-blue-900/30 to-slate-900/10",
  },
  {
    id: "success-2",
    title: "Luxe Stays: Cutting OTA Dependency",
    description: "Luxe Stays was losing 18% of revenue to OTA commissions. We built a direct booking strategy combining brand content, SEO and targeted paid campaigns — generating £420K in direct revenue and boosting their booking rate by 175%.",
    category: "Success Stories" as const,
    client: "Luxe Stays",
    metrics: ["+175% Bookings", "+£420K Revenue"],
    mediaUrl: "",
    tag: "Hospitality Growth",
    stat1: "+175%",
    stat1label: "Booking Rate",
    imageUrl: "/images/casestudy-luxestays.png",
    gradient: "from-amber-900/30 to-orange-900/10",
  },
  {
    id: "success-3",
    title: "Bloom Retail: 6.8× ROAS at Scale",
    description: "Bloom Retail had strong products but inefficient marketing. We restructured their paid media, launched a content-driven organic strategy and optimised their product pages — achieving 6.8× ROAS and 340% revenue growth.",
    category: "Success Stories" as const,
    client: "Bloom Retail",
    metrics: ["6.8× ROAS", "+340% Revenue"],
    mediaUrl: "",
    tag: "E-commerce Scale",
    stat1: "6.8×",
    stat1label: "ROAS",
    imageUrl: "/images/casestudy-bloom.png",
    gradient: "from-cyan-900/30 to-blue-900/10",
  },
  {
    id: "success-4",
    title: "The Grove Kitchen: Viral in 90 Days",
    description: "A new restaurant with zero digital presence. We designed a TikTok-first content strategy that generated 45K followers and boosted reservations by 290% — proving that strategic content can outperform paid media for local businesses.",
    category: "Success Stories" as const,
    client: "The Grove Kitchen",
    metrics: ["+290% Reservations", "45K Followers"],
    mediaUrl: "",
    tag: "Viral Growth",
    stat1: "+290%",
    stat1label: "Reservations",
    imageUrl: "/images/casestudy-grove.png",
    gradient: "from-emerald-900/30 to-teal-900/10",
  },
];

const DEFAULT_STILLS_AND_MOTIONS = [
  {
    id: "motion-1",
    title: "Ingri — SS26 Campaign Film",
    category: "Stills & Motions" as const,
    client: "Ingri",
    metrics: [],
    mediaUrl: "",
    description: "Cinematic campaign film for Ingri's Spring/Summer collection.",
    imageUrl: "/images/casestudy-ingri.png",
    mediaType: "Motion" as const,
    duration: "1:45",
  },
  {
    id: "motion-2",
    title: "Luxe Stays — Brand Story",
    category: "Stills & Motions" as const,
    client: "Luxe Stays",
    metrics: [],
    mediaUrl: "",
    description: "Brand documentary capturing the essence of Luxe Stays hospitality.",
    imageUrl: "/images/casestudy-luxestays.png",
    mediaType: "Motion" as const,
    duration: "2:30",
  },
  {
    id: "stills-1",
    title: "Bloom Retail — Product Lookbook",
    category: "Stills & Motions" as const,
    client: "Bloom Retail",
    metrics: [],
    mediaUrl: "",
    description: "Editorial product photography for Bloom's seasonal lookbook.",
    imageUrl: "/images/casestudy-bloom.png",
    mediaType: "Stills" as const,
  },
  {
    id: "stills-2",
    title: "The Grove Kitchen — Menu Editorial",
    category: "Stills & Motions" as const,
    client: "The Grove Kitchen",
    metrics: [],
    mediaUrl: "",
    description: "Moody food photography for The Grove Kitchen's signature menu.",
    imageUrl: "/images/casestudy-grove.png",
    mediaType: "Stills" as const,
  },
  {
    id: "motion-3",
    title: "Motorworks — Service Showcase",
    category: "Stills & Motions" as const,
    client: "Motorworks",
    metrics: [],
    mediaUrl: "",
    description: "Cinematic workshop showcase highlighting premium automotive service.",
    imageUrl: "/images/casestudy-motorworks.png",
    mediaType: "Motion" as const,
    duration: "0:45",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "t-1",
    quote: "Upmark completely transformed our digital strategy. Their integrated approach helped us scale our pipeline by 3x in just six months while maintaining incredibly high creative standards.",
    name: "Sarah Jenkins",
    role: "CMO, Vertex Corp",
  },
  {
    id: "t-2",
    quote: "Unlike other agencies that just run ads, Upmark actually took the time to understand our complete marketing system. The results have been phenomenal — a 340% increase in eCommerce revenue.",
    name: "Michael Ross",
    role: "Founder, Bloom Retail",
  },
  {
    id: "t-3",
    quote: "The speed and quality of Upmark's production team is unmatched. They feel less like an agency and more like an extension of our internal team. Highly recommended.",
    name: "Eleanor Vance",
    role: "Director of Marketing, Luxe Stays",
  },
  {
    id: "t-4",
    quote: "We went from zero digital presence to fully booked in under three months. Upmark didn't just run campaigns — they built a system that keeps working even when the ads stop.",
    name: "James Harlow",
    role: "Owner, The Grove Kitchen",
  },
];

export default async function CaseStudiesPage() {
  const [allCaseStudies, testimonials] = await Promise.all([
    getCaseStudies(),
    getTestimonials(),
  ]);

  // Use Firestore data if available, otherwise use defaults
  const hasFirestoreStudies = allCaseStudies.length > 0;
  const hasFirestoreTestimonials = testimonials.length > 0;

  // Group case studies by category
  const theoreticalStudies = hasFirestoreStudies
    ? allCaseStudies.filter(cs => cs.category === "Studies")
    : DEFAULT_STUDIES;
  const successStories = hasFirestoreStudies
    ? allCaseStudies.filter(cs => cs.category === "Success Stories")
    : DEFAULT_SUCCESS_STORIES;
  const stillsAndMotions = hasFirestoreStudies
    ? allCaseStudies.filter(cs => cs.category === "Stills & Motions")
    : DEFAULT_STILLS_AND_MOTIONS;
  const displayTestimonials = hasFirestoreTestimonials
    ? testimonials
    : DEFAULT_TESTIMONIALS;

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-32 relative">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-16 sm:gap-24 md:gap-32">
        <div className="max-w-4xl pt-4 sm:pt-10">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-heading text-white mb-4 sm:mb-6 tracking-tight">Case Studies.</h1>
          <p className="text-base sm:text-xl text-muted-text font-light max-w-2xl">Results driven by strategy, scaled by execution. We measure our success purely by the continuous growth of our partners.</p>
        </div>

        {/* 1. (Theoretical) Studies */}
        <section id="studies" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white">Studies</h2>
            <p className="text-muted-text font-light mt-2">Deep dives into strategy architecture and growth frameworks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {theoreticalStudies.map((item) => (
              <div key={item.id} className="group flex flex-col bg-secondary-surface/30 border border-white/5 rounded-3xl overflow-hidden hover:border-accent-blue/30 transition-all">
                {/* Visual */}
                <div className="w-full aspect-video relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-blue-900/30 to-slate-900/10'} opacity-50 mix-blend-overlay z-10`}></div>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} — case study by Upmark`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs text-white uppercase tracking-widest font-semibold border border-white/10 z-20">{item.tag || item.category}</div>
                </div>
                {/* Body */}
                <div className="p-5 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 line-clamp-2">{item.title}</h3>
                  <p className="text-muted-text/90 font-light text-sm mb-6 sm:mb-8 flex-grow">{item.description}</p>
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
        </section>

        {/* 2. Success Stories */}
        <section id="success-stories" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white">Success Stories</h2>
            <p className="text-muted-text font-light mt-2">Real-world results and campaign highlights from our partners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {successStories.map((item) => (
              <div key={item.id} className="group flex flex-col sm:flex-row bg-secondary-surface/20 border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden hover:bg-secondary-surface/40 hover:border-white/10 transition-all">
                {/* Visual - Left half on desktop */}
                <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto bg-black/30 relative overflow-hidden flex-shrink-0 min-h-[200px]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-blue-900/30 to-slate-900/10'} opacity-40 mix-blend-overlay z-10`}></div>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} — success story by Upmark`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  )}
                </div>
                {/* Body */}
                <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow justify-center">
                  <div className="text-accent-blue font-semibold uppercase tracking-widest text-[10px] mb-2">{item.tag || item.category}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-muted-text/80 font-light text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3">{item.description}</p>
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
        </section>

        {/* 3. Stills & Motions */}
        <section id="stills-and-motions" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white">Stills & Motions</h2>
            <p className="text-muted-text font-light mt-2">Production portfolio showcasing cinematic quality and compelling creatives.</p>
          </div>
          <div className="flex overflow-x-auto pb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 gap-4 sm:gap-6 snap-x hide-scrollbar">
            {stillsAndMotions.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] md:w-[350px] group relative rounded-2xl overflow-hidden cursor-pointer bg-secondary-surface/40 border border-white/5">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} — production by Upmark`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="350px"
                    />
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
        </section>

        {/* 4. Testimonials */}
        <section id="testimonials" className="scroll-mt-32">
          <div className="mb-12 border-b border-white/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white">Testimonials</h2>
            <p className="text-muted-text font-light mt-2">What our partners say about the work we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {displayTestimonials.map((t) => (
              <div key={t.id} className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-secondary-surface/30 border border-white/5 relative">
                <MessageSquareQuote size={40} className="text-white/10 absolute top-8 right-8" />
                <p className="text-base sm:text-lg md:text-xl text-white font-light italic mb-6 sm:mb-8 relative z-10">&quot;{t.quote}&quot;</p>
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
        </section>

        {/* 5. CTA Area */}
        <section className="mt-10 py-16 border-t border-white/10 flex flex-col items-center justify-center text-center">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-heading text-white mb-6 sm:mb-8">Ready to compound your growth?</h2>
           <p className="text-muted-text text-base sm:text-lg max-w-xl mb-8 sm:mb-10 font-light">Let&apos;s discuss how Upmark can build a complete marketing system for your business.</p>
           <div className="flex flex-col sm:flex-row items-center gap-4">
             <Link href="/contact" className="group flex items-center justify-center gap-2 bg-accent-blue text-white px-8 py-4 rounded-lg font-semibold text-base overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)]">
               Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link href="/services" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base text-primary-text bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all">
               Explore our services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </section>
      </div>

      {/* Floating Get Started Button */}
      <Link href="/contact" className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 group flex items-center justify-center gap-2 sm:gap-3 bg-accent-blue text-white px-4 py-3 sm:px-6 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-[0_8px_25px_rgba(59,130,246,0.4)] sm:shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all safe-bottom">
        <span className="relative z-10 flex items-center gap-2">Get started! <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
      </Link>
    </div>
  );
}
