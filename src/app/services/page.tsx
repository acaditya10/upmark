import { MoveRight, Target, Zap, BarChart3, Users, Network, TrendingUp, Presentation, PlaySquare, ArrowRight, Briefcase } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Services | Upmark — Full-Stack Marketing Services",
  description: "From strategy to execution — Upmark offers integrated marketing services including brand strategy, performance marketing, content production, social media management, and SEO.",
};

// Default icon pool for services without uploaded icons
const DEFAULT_ICONS = [Network, TrendingUp, Users, Presentation, PlaySquare, MoveRight, Target, Zap, BarChart3];

// Hardcoded fallback services so the page is never empty
const DEFAULT_SERVICES = [
  {
    id: "default-1",
    title: "Marketing Strategy",
    subtitle: "Foundation",
    description: "Every successful campaign starts with a clear strategy. We define your market positioning, audience segmentation, competitive landscape, messaging framework and channel roadmap — before a single asset is produced. Our strategies aren't theoretical documents. They're executable blueprints designed to drive measurable growth from day one.",
    icon_url: "",
    image: "/images/service-strategy.png",
    order: 1,
  },
  {
    id: "default-2",
    title: "Performance Marketing",
    subtitle: "Paid Media",
    description: "We architect and manage high-performance paid media campaigns across Meta, Google, TikTok, LinkedIn and programmatic networks. Every campaign is built on data-driven audience targeting, rapid creative iteration and real-time budget optimisation. We don't just spend — we systematically scale what converts and cut what doesn't.",
    icon_url: "",
    image: "/images/service-performance.png",
    order: 2,
  },
  {
    id: "default-3",
    title: "Content Production",
    subtitle: "Creative Studio",
    description: "Our in-house production team creates across every format — from viral short-form reels to cinematic brand films, studio product photography, social graphics, carousel designs and editorial content. All shot, edited and delivered in-house with cinema-grade equipment, ensuring total creative consistency and fast turnaround.",
    icon_url: "",
    image: "/images/service-content.png",
    order: 3,
  },
  {
    id: "default-4",
    title: "Social Media Management",
    subtitle: "Always On",
    description: "We manage your social presence end-to-end — content calendars, community engagement, platform-native content creation, influencer partnerships and real-time trend activations. Our approach is systematic and data-driven, ensuring every post, story and reel is engineered for maximum reach, engagement and conversion.",
    icon_url: "",
    image: "/images/service-social.png",
    order: 4,
  },
  {
    id: "default-5",
    title: "SEO & Lead Generation",
    subtitle: "Organic Growth",
    description: "We build sustainable organic traffic engines through technical SEO, content strategy, backlink architecture and conversion rate optimisation. Our approach goes beyond rankings — we engineer full-funnel lead generation systems that capture demand, nurture prospects and deliver qualified pipeline directly to your sales team.",
    icon_url: "",
    image: "/images/service-seo.png",
    order: 5,
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  // Use Firestore services if available, otherwise use defaults
  const hasFirestoreServices = services.length > 0;
  const displayServices = hasFirestoreServices ? services : DEFAULT_SERVICES;

  // Sort by order field (lower first)
  const sorted = [...displayServices].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-32">
      <section className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-20">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-4 sm:mb-6">
             One agency. <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-blue-400">Every capability.</span>
          </h2>
          <p className="text-muted-text text-base sm:text-xl max-w-2xl font-light">
             From strategy to production to distribution, we cover the full marketing spectrum so you never need another vendor.
          </p>
        </div>

        <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
          {sorted.map((item, index) => {
            const align = index % 2 === 0 ? "left" : "right";
            const IconComponent = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
            // For default services, use the image field; for Firestore services, try icon_url
            const imageUrl = (item as typeof DEFAULT_SERVICES[0]).image;

            return (
              <div key={item.id} className={`flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-24 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Content Side */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    {item.icon_url ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.icon_url} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <IconComponent size={40} className="text-accent-blue" />
                    )}
                    {item.subtitle && (
                      <span className="text-accent-blue font-bold tracking-widest uppercase text-sm border border-accent-blue/30 px-3 py-1 rounded-full bg-accent-blue/5">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-xl text-muted-text leading-relaxed font-light mb-6 sm:mb-8 max-w-lg">
                    {item.description}
                  </p>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-blue transition-colors group py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg"
                  >
                    <span className="transition-all">Discuss this service</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Visual Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${item.title} — ${item.subtitle || 'Upmark service'}`}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : item.icon_url ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.icon_url} alt={item.title} className="w-24 h-24 object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                          <IconComponent size={40} className="text-white/30" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent"></div>
                    
                    {/* Subtle Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA at the bottom */}
        <div className="mt-20 sm:mt-40 text-center relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-accent-blue/15 blur-[40px] sm:blur-[60px] rounded-full -z-10"></div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6 sm:mb-8">
            Ready to see our <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-purple-400">results?</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-text mb-8 sm:mb-12 font-light max-w-2xl mx-auto">
            Explore our curated portfolio of successful campaigns, brand transformations and growth stories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              href="/work" 
              className="bg-white text-black px-6 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              View our work <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg border border-white/20 text-white hover:bg-white/5 transition-colors w-full sm:w-auto justify-center hover:border-white/40"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
