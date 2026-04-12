import { Hero } from "@/components/sections/Hero";
import { ContentGrid } from "@/components/sections/ContentGrid";
import { MoveRight, Target, Zap, BarChart3, Users, Network, TrendingUp, Presentation, PlaySquare, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/firestore";

export default async function Home() {
  const settings = await getSiteSettings();

  const philosophyPointers = [
    { title: "Strategy First", desc: "Every campaign starts with insight-driven strategy. We define your positioning before we produce a single asset." },
    { title: "Full Execution", desc: "From concept to live campaign — creative direction, production, distribution and optimization, all under one roof." },
    { title: "System Thinking", desc: "We don't build one-off ads. We architect marketing systems that compound over time and generate predictable growth." },
    { title: "Measurable Results", desc: "Every deliverable is tied to a business outcome. We track, report and relentlessly optimize for what matters." }
  ];

  const capabilityItems = [
    { id: 1, title: "Marketing Strategy", subtitle: "Foundation", description: "In-depth market analysis, brand positioning, audience mapping and go-to-market blueprints built to last.", icon: <Network size={28} /> },
    { id: 2, title: "Performance Marketing", subtitle: "Paid Media", description: "Paid search, social ads and programmatic campaigns engineered for maximum ROAS and scalable growth.", icon: <TrendingUp size={28} /> },
    { id: 3, title: "Social Media Marketing", subtitle: "Social", description: "Channel strategy, community building and content calendars that turn audiences into advocates.", icon: <Users size={28} /> },
    { id: 4, title: "Campaign Design", subtitle: "Creative", description: "Visually cohesive campaigns with motion, static and interactive assets that capture and convert.", icon: <Presentation size={28} /> },
    { id: 5, title: "Content Production", subtitle: "Content", description: "Editorial-quality content across formats — from blog and copywriting to visual storytelling.", icon: <PlaySquare size={28} /> },
    { id: 6, title: "Video & Reels Production", subtitle: "Video", description: "Short-form, long-form and cinematic brand films that perform across platforms and captivate audiences.", icon: <MoveRight size={28} /> },
    { id: 7, title: "Corporate Event Coverage", subtitle: "Events", description: "Professional event photography, videography and live social content to amplify your moments.", icon: <Target size={28} /> },
    { id: 8, title: "SEO & Lead Generation", subtitle: "Organic", description: "Technical SEO, authority building and conversion-optimised lead funnels that generate qualified pipeline.", icon: <Zap size={28} /> },
    { id: 9, title: "Digital Growth Consulting", subtitle: "Advisory", description: "Expert advisory on marketing stack, attribution, analytics and scaling frameworks for ambitious brands.", icon: <BarChart3 size={28} /> }
  ];

  const processItems = [
    { id: 1, title: "Insight", description: "Deep-dive into your market, audience, competitors and brand. We surface the insights that define your edge." },
    { id: 2, title: "Strategy", description: "We translate insight into a precise strategy — positioning, messaging, channels and a roadmap for execution." },
    { id: 3, title: "Creative Production", description: "Our in-house team produces every asset — video, design, copy and content — aligned to the strategy." },
    { id: 4, title: "Campaign Launch", description: "Orchestrated rollout across paid, owned and earned channels with precision timing and audience targeting." },
    { id: 5, title: "Optimisation", description: "Real-time monitoring and rapid iteration. We cut what doesn't work and double down on what does." },
    { id: 6, title: "Growth", description: "We systematically compound results — scaling budgets, expanding channels and building long-term growth loops." }
  ];

  const contentItems = [
    { id: 1, title: "Short-form", subtitle: "Reels & Shorts", description: "Vertical-first content engineered for algorithm performance and share velocity." },
    { id: 2, title: "Paid Creative", subtitle: "Campaign Ads", description: "Static, animated and video ad creatives across Meta, Google and programmatic networks." },
    { id: 3, title: "Long-form", subtitle: "Brand Films", description: "Cinematic brand storytelling that defines identity and creates emotional connection." },
    { id: 4, title: "Photography", subtitle: "Product Shoots", description: "Studio and lifestyle product photography optimised for eCommerce and social." },
    { id: 5, title: "Ongoing", subtitle: "Social Media Content", description: "Ongoing weekly content production — graphics, carousels, captions and stories." },
    { id: 6, title: "Video", subtitle: "YouTube & Long-form", description: "Full-length branded content, tutorials and documentaries that build authority." },
  ];

  const studioCapabilities = [
    "In-house production team", "Director + DP on every shoot", "4K / cinema-grade equipment", 
    "Same-day turnaround available", "Licensed music library", "Motion graphics included", 
    "Platform-native formatting", "Raw footage delivery"
  ];

  const advantages = [
    { id: 1, title: "Integrated by design", desc: "Not a creative studio, not a media buyer, not a consultant. We combine all three into one system." },
    { id: 2, title: "Speed without compromise", desc: "We move at startup speed with agency-level production quality. Fast means first to market." },
    { id: 3, title: "Transparent reporting", desc: "Real-time dashboards and weekly performance reviews. You always know exactly what your marketing is doing." },
    { id: 4, title: "Embedded in your team", desc: "We work as an extension of your business — attending meetings, understanding culture and owning outcomes." },
    { id: 5, title: "Built for scale", desc: "Our systems are engineered to scale. As your business grows, your marketing infrastructure grows with it." },
    { id: 6, title: "Channel-agnostic thinking", desc: "We follow your audience, not trends. Whatever channel converts, we optimise there first." }
  ];

  return (
    <div className="flex flex-col gap-32 pb-32 relative">
      <Hero videoUrl={settings?.heroVideoUrl} />

      {/* Philosophy Section */}
      <section className="container mx-auto px-6 mt-10">
        <div className="flex flex-col lg:flex-row gap-16 mb-20 text-white">
           <div className="lg:w-1/2">
             <span className="text-muted-text font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
               <span className="w-8 h-[1px] bg-muted-text"></span>
               Philosophy
             </span>
             <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
               Most agencies only create content <br className="hidden md:block"/><span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-indigo-400">or run ads.</span>
             </h2>
             <h3 className="text-2xl mt-6 font-semibold">Upmark builds complete marketing systems.</h3>
           </div>
           <div className="lg:w-1/2 flex flex-col gap-6 text-muted-text font-light text-lg">
              <p>
                We integrate strategy, performance marketing, content production, campaign execution and distribution into a single, coherent growth engine. The result is not a collection of deliverables — it is a system that compounds.
              </p>
              <p>
                Founded on the belief that modern marketing must be fast, precise and measurable, Upmark brings together strategists, creatives, producers and performance marketers who operate as one integrated team.
              </p>
           </div>
        </div>

        {/* Philosophy Pointers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyPointers.map((p, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-secondary-surface/40 border border-white/5 backdrop-blur-md hover:border-accent-blue/30 transition-all duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                 0{i + 1}
               </div>
              <h3 className="text-xl font-bold font-heading text-white mb-3 relative z-10">{p.title}</h3>
              <p className="text-muted-text/90 text-sm font-light leading-relaxed relative z-10">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-6 relative z-10 mt-10">
        <div className="mb-20">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             WHAT WE DO
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">One agency. <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-blue-400">Every capability.</span></h2>
          <p className="text-muted-text text-xl max-w-2xl font-light">From strategy to production to distribution, we cover the full marketing spectrum so you never need another vendor.</p>
        </div>
        <ContentGrid items={capabilityItems} type="icon" columns={3} />
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-6 relative z-10 mt-10">
        <div className="mb-20">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             HOW WE WORK
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">Our <span className="text-accent-gold">6-Step Process</span></h2>
          <p className="text-muted-text text-xl max-w-2xl font-light">A rigorous system built for consistency, speed and measurable outcomes at every stage.</p>
        </div>
        <ContentGrid items={processItems} type="numbered" />
      </section>

      {/* Case Studies */}
      <section className="container mx-auto px-6 relative z-10 mt-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-accent-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block inline-flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-gold"></span>
             OUR WORK
             <span className="w-8 h-[1px] bg-accent-gold"></span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">Results that speak <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-gold to-yellow-400">for themselves.</span></h2>
          <p className="text-muted-text text-xl max-w-2xl font-light">Click any case study to read the full story.</p>
        </div>
        
        {/* Custom Grid for Case Studies to match text details exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: "Ingri", tag: "Fashion & Lifestyle", stat1: "+210%", stat1label: "Revenue Growth", stat2: "+380%", stat2label: "Social Engagement", desc: "Ingri was a premium fashion brand struggling to differentiate in a saturated market. Organic reach had declined 60% and paid ROI was stagnating.", gradient: "from-purple-900/30 to-indigo-900/10" },
             { title: "Motorworks", tag: "Automotive Services", stat1: "+320%", stat1label: "Lead Volume", stat2: "-58%", stat2label: "Cost Per Lead", desc: "Motorworks had strong offline reputation but near-zero digital presence. Competitors dominated local search and their website converted at under 1%.", gradient: "from-blue-900/30 to-slate-900/10" },
             { title: "Luxe Stays", tag: "Hospitality & Hotels", stat1: "+175%", stat1label: "Booking Rate", stat2: "+£420K", stat2label: "Direct Revenue", desc: "Luxe Stays was over-reliant on OTA platforms paying 18% commission. They needed direct bookings and brand awareness in a premium segment.", gradient: "from-amber-900/30 to-orange-900/10" },
             { title: "The Grove Kitchen", tag: "Food & Restaurant", stat1: "+290%", stat1label: "Reservations", stat2: "0→45K", stat2label: "TikTok Followers", desc: "The Grove Kitchen was a new independent restaurant with no digital footprint, limited budget and fierce competition from established names.", gradient: "from-emerald-900/30 to-teal-900/10" },
             { title: "Vertex Corp", tag: "B2B Technology", stat1: "+£2.1M", stat1label: "Pipeline Value", stat2: "+430%", stat2label: "Demo Requests", desc: "Vertex had a technically superior product but poor messaging and a sales team struggling to generate qualified demo requests.", gradient: "from-rose-900/30 to-red-900/10" },
             { title: "Bloom Retail", tag: "E-commerce & Retail", stat1: "+340%", stat1label: "eCommerce Revenue", stat2: "6.8×", stat2label: "ROAS", desc: "Bloom Retail had strong products but weak digital marketing — high ad spend with poor returns and no sustainable organic channel.", gradient: "from-cyan-900/30 to-blue-900/10" },
           ].map((cs, i) => (
              <Link href="#" key={i} className={`group block p-10 rounded-3xl bg-secondary-surface/40 bg-gradient-to-br ${cs.gradient} border border-white/5 backdrop-blur-md hover:border-accent-blue/30 transition-all duration-300 relative overflow-hidden`}>
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
           ))}
        </div>
      </section>

      {/* Content Studio */}
      <section className="container mx-auto px-6 relative z-10 mt-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block inline-flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             PRODUCTION STUDIO
             <span className="w-8 h-[1px] bg-accent-blue"></span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">Content that <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-blue-400">converts.</span></h2>
          <p className="text-muted-text text-xl max-w-2xl font-light">Our production team creates across every format — from viral reels to cinematic brand films. All in-house. All on-brand.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             {contentItems.map((item) => (
                <div key={item.id} className="p-8 rounded-3xl bg-secondary-surface/40 border border-white/5 backdrop-blur-sm">
                   <div className="text-accent-blue font-bold text-xs uppercase tracking-widest mb-3">{item.subtitle}</div>
                   <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                   <p className="text-muted-text font-light text-sm">{item.description}</p>
                </div>
             ))}
           </div>
           
           {/* Studio Capabilities feature block */}
           <div className="lg:col-span-1 p-10 rounded-3xl bg-accent-blue/5 border border-accent-blue/20 backdrop-blur-sm flex flex-col justify-center">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center mb-6"><PlaySquare size={24} /></div>
              <h3 className="text-2xl font-black text-white mb-6">Studio Capabilities</h3>
              <p className="text-muted-text mb-8">Professional production infrastructure available to every Upmark client.</p>
              
              <ul className="flex flex-col gap-4">
                {studioCapabilities.map((cap, i) => (
                   <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <CheckCircle2 size={16} className="text-accent-blue flex-shrink-0" />
                      {cap}
                   </li>
                ))}
              </ul>
           </div>
        </div>
      </section>

      {/* Why Upmark */}
      <section className="container mx-auto px-6 relative z-10 mt-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-accent-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block inline-flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-gold"></span>
             WHY UPMARK
             <span className="w-8 h-[1px] bg-accent-gold"></span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-16 tracking-tight">Different by <span className="text-accent-gold">design.</span></h2>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto mb-20">
           <div className="border border-white/10 bg-secondary-surface/30 p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <h3 className="text-2xl font-bold text-white md:w-1/2">Marketing without execution is just theory.</h3>
              <p className="text-muted-text md:w-1/2 font-light">Ideas without action don't grow brands. We build, launch and optimize — every time.</p>
           </div>
           <div className="border border-white/10 bg-secondary-surface/30 p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <h3 className="text-2xl font-bold text-white md:w-1/2">Strategy. Production. Distribution. One team.</h3>
              <p className="text-muted-text md:w-1/2 font-light">Stop managing three agencies. Upmark unifies your entire marketing operation under one roof.</p>
           </div>
           <div className="border border-white/10 bg-secondary-surface/30 p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <h3 className="text-2xl font-bold text-white md:w-1/2">We measure what matters. Results.</h3>
              <p className="text-muted-text md:w-1/2 font-light">Vanity metrics are noise. We track revenue, pipeline, ROAS and real business outcomes.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-white/5 pt-20">
           {advantages.map((adv) => (
             <div key={adv.id}>
                <div className="text-accent-blue font-black text-xl mb-2">0{adv.id}</div>
                <h4 className="text-xl font-bold text-white mb-3">{adv.title}</h4>
                <p className="text-muted-text font-light text-sm leading-relaxed">{adv.desc}</p>
             </div>
           ))}
        </div>
      </section>

    </div>
  );
}
