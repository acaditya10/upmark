import { Hero } from "@/components/sections/Hero";
import { PlaySquare, CheckCircle2, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSiteSettings, getFeaturedTestimonials, getServices } from "@/lib/firestore";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { BrandCarousel } from "@/components/sections/BrandCarousel";
import { ProcessOrbital } from "@/components/interactive-diagram";

// ─── Default content (fallbacks when admin hasn't configured) ────────

const DEFAULT_PROCESS_ITEMS: { title: string; description: string; imageUrl?: string }[] = [
  { title: "Insight", description: "Deep-dive into your market, audience, competitors and brand. We surface the insights that define your edge.", imageUrl: "/images/service-strategy.png" },
  { title: "Strategy", description: "We translate insight into a precise strategy — positioning, messaging, channels and a roadmap for execution.", imageUrl: "/images/service-seo.png" },
  { title: "Creative Production", description: "Our in-house team produces every asset — video, design, copy and content — aligned to the strategy.", imageUrl: "/images/service-content.png" },
  { title: "Campaign Launch", description: "Orchestrated rollout across paid, owned and earned channels with precision timing and audience targeting.", imageUrl: "/images/service-social.png" },
  { title: "Optimisation", description: "Real-time monitoring and rapid iteration. We cut what doesn't work and double down on what does.", imageUrl: "/images/service-performance.png" },
  { title: "Growth", description: "We systematically compound results — scaling budgets, expanding channels and building long-term growth loops.", imageUrl: "/images/process.png" }
];

const DEFAULT_CONTENT_ITEMS = [
  { title: "Short-form", subtitle: "Reels & Shorts", description: "Vertical-first content engineered for algorithm performance and share velocity." },
  { title: "Paid Creative", subtitle: "Campaign Ads", description: "Static, animated and video ad creatives across Meta, Google and programmatic networks." },
  { title: "Long-form", subtitle: "Brand Films", description: "Cinematic brand storytelling that defines identity and creates emotional connection." },
  { title: "Photography", subtitle: "Product Shoots", description: "Studio and lifestyle product photography optimised for eCommerce and social." },
  { title: "Ongoing", subtitle: "Social Media Content", description: "Ongoing weekly content production — graphics, carousels, captions and stories." },
  { title: "Video", subtitle: "YouTube & Long-form", description: "Full-length branded content, tutorials and documentaries that build authority." },
];

const DEFAULT_STUDIO_CAPABILITIES = [
  "In-house production team", "Director + DP on every shoot", "4K / cinema-grade equipment",
  "Same-day turnaround available", "Licensed music library", "Motion graphics included",
  "Platform-native formatting", "Raw footage delivery"
];

const DEFAULT_BRANDS = [
  { name: "Google" }, { name: "Meta" }, { name: "Shopify" }, { name: "Stripe" },
  { name: "Notion" }, { name: "Figma" }, { name: "Vercel" }, { name: "Slack" },
];

export default async function Home() {
  const [settings, testimonials, rawServices] = await Promise.all([
    getSiteSettings(),
    getFeaturedTestimonials(),
    getServices(),
  ]);

  const featuredServiceIds = settings?.featuredServiceIds;
  const featuredServices = (featuredServiceIds?.length
    ? featuredServiceIds
        .map((id) => rawServices.find((s) => s.id === id))
        .filter(Boolean)
    : rawServices.sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, 4)
  ).map((s, i) => {
    const IconComponent = s!.icon_name ? (LucideIcons as any)[s!.icon_name] : null;
    return { ...s!, icon: IconComponent };
  });

  const vis = settings?.visibility ?? {};
  const show = (key: string) => vis[key as keyof typeof vis] ?? true;

  // Use admin-configured content or fall back to defaults
  const processItems = (settings?.processSteps?.length ? settings.processSteps : DEFAULT_PROCESS_ITEMS).map((p, i) => ({
    id: i + 1,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
  }));
  const contentItems = (settings?.contentItems?.length ? settings.contentItems : DEFAULT_CONTENT_ITEMS).map((c, i) => ({
    id: i + 1,
    title: c.title,
    subtitle: c.subtitle,
    description: c.description,
  }));
  const studioCapabilities = settings?.studioCapabilities?.length ? settings.studioCapabilities : DEFAULT_STUDIO_CAPABILITIES;
  const brandCarouselItems = settings?.brandCarouselItems?.length ? settings.brandCarouselItems : DEFAULT_BRANDS;
  const aboutImageUrl = settings?.homeAboutImageUrl || "/images/philosophy.png";

  const pageVisible = show("home");
  const heroVisible = show("homeHero");
  const aboutVisible = show("homeAbout");
  const processVisible = show("homeProcess") && processItems.length > 0;
  const contentStudioVisible = show("homeContentStudio") && contentItems.length > 0;
  const studioCapVisible = show("homeStudioCapabilities") && studioCapabilities.length > 0;
  const testimonialsVisible = show("homeTestimonials") && testimonials.length > 0;
  const brandCarouselVisible = show("homeBrandCarousel") && brandCarouselItems.length > 0;

  if (!pageVisible) return null;

  return (
    <div className="flex flex-col pb-16 sm:pb-24 md:pb-28 relative">
      {/* Hero + Brand Carousel — flush, no gaps */}
      {heroVisible && <Hero videoUrl={settings?.heroVideoUrl} />}
      {brandCarouselVisible && <BrandCarousel brands={brandCarouselItems} />}

      {/* Remaining sections with gaps */}
      <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 pt-12 sm:pt-16 md:pt-24">
      {/* About Section */}
      {aboutVisible && (
      <section id="about" className="container mx-auto px-4 sm:px-6 scroll-mt-32">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-20 text-primary-text items-center">
          {/* Left Side */}
          <div className="lg:w-7/12 flex flex-col items-start pr-0 lg:pr-10">
            <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-6 inline-flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent-blue"></span>
              ABOUT US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-primary-text tracking-tight leading-tight mb-6 sm:mb-4">
              Most agencies only <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-indigo-400">create content</span> <br className="hidden md:block" />or run ads.
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl mt-4 mb-6 sm:mb-8 font-semibold">
              Upmark builds <span className="text-accent-gold">complete marketing systems.</span>
            </h3>
            <div className="flex flex-col gap-4 sm:gap-6 text-muted-text font-light text-base sm:text-lg mb-8 sm:mb-10">
              <p>
                Founded on the belief that modern marketing must be fast, precise and measurable, Upmark brings together strategists, creatives, producers and performance marketers who operate as one integrated team.
              </p>
              <p>
                When your strategist sits next to your editor, your performance data informs your creative, and your content team understands your media budget — the work gets sharper. We're not a collection of specialists working in parallel. We're a single, integrated team where every discipline makes every other one better. That's the Upmark advantage.
              </p>
            </div>
          </div>

          {/* Right Side Visual */}
          <div className="lg:w-5/12 w-full flex justify-center items-center relative min-h-[200px] sm:min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-accent-gold/5 rounded-full blur-[40px] sm:blur-[60px] pointer-events-none"></div>
            <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[450px] rounded-3xl overflow-hidden border border-primary-text/10 shadow-2xl">
              {aboutImageUrl.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                <video
                  src={aboutImageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={aboutImageUrl}
                  alt="Upmark strategy session — marketing team brainstorming around data-driven insights"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Featured Services */}
        {show("services") && featuredServices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {featuredServices.map((s, i) => {
            const hoverColors = [
              "hover:bg-blue-500 hover:border-blue-500",
              "hover:bg-violet-500 hover:border-violet-500",
              "hover:bg-emerald-500 hover:border-emerald-500",
              "hover:bg-amber-500 hover:border-amber-500",
            ];
            return (
              <Link key={s.id || i} href={`/services#${s.id}`} className={`group p-6 sm:p-8 min-h-[200px] sm:min-h-0 rounded-2xl sm:rounded-3xl bg-secondary-surface/40 border border-primary-text/5 ${hoverColors[i]} transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    {s.icon && <div className="w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue group-hover:bg-white/20 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-300"><s.icon size={20} /></div>}
                    <h3 className="text-base sm:text-xl font-bold font-heading text-primary-text group-hover:text-white relative z-10 transition-colors duration-300">{s.title}</h3>
                  </div>
                  <p className="text-muted-text/90 group-hover:text-white/80 text-base font-light leading-relaxed relative z-10 line-clamp-4 transition-colors duration-300">{s.description}</p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-accent-blue group-hover:text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
          {/* Explore More Services arrow */}
          <Link href="/services" className="group p-6 sm:p-8 min-h-[200px] sm:min-h-0 rounded-2xl sm:rounded-3xl bg-accent-blue/5 border border-accent-blue/20 hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-accent-blue/10 text-accent-blue group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-colors duration-300">
              <ArrowRight size={24} />
            </div>
            <span className="text-sm sm:text-base font-semibold text-accent-blue group-hover:text-white transition-colors">Explore More Services</span>
          </Link>
        </div>
        )}
      </section>
      )}

      {/* Process Section */}
      {processVisible && (
      <section className="w-full">
        <ProcessOrbital items={processItems} />
      </section>
      )}

      {/* Content Studio */}
      {(contentStudioVisible || studioCapVisible) && (
      <section className="container mx-auto px-4 sm:px-6 relative z-10 content-visibility-auto">
        <div className="mb-10 sm:mb-20 text-center flex flex-col items-center">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block inline-flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent-blue"></span>
            CONTENT THAT CONVERTS
            <span className="w-8 h-[1px] bg-accent-blue"></span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading text-primary-text tracking-tight mb-4 sm:mb-6">Production <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-blue-400">Studio</span></h2>
          <p className="text-muted-text text-base sm:text-xl max-w-2xl font-light">Our production team creates across every format — from viral reels to cinematic brand films. All in-house. All on-brand.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {contentStudioVisible && contentItems.map((item) => (
              <div key={item.id} className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-secondary-surface/40 border border-primary-text/5 text-center flex flex-col items-center">
                <div className="text-accent-blue font-bold text-xs uppercase tracking-widest mb-3">{item.subtitle}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-text mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-muted-text font-light text-base">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Studio Capabilities feature block */}
          {studioCapVisible && (
          <div className="lg:col-span-1 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-accent-blue/5 border border-accent-blue/20 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center mb-6"><PlaySquare size={24} /></div>
            <h3 className="text-xl sm:text-2xl font-black text-primary-text mb-4 sm:mb-6">Studio Capabilities</h3>
            <p className="text-muted-text mb-6 sm:mb-8 text-base">Professional production infrastructure available to every Upmark client.</p>

            <ul className="flex flex-col gap-4">
              {studioCapabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-text/90 text-base font-medium">
                  <CheckCircle2 size={16} className="text-accent-blue flex-shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </section>
      )}

      {/* Testimonials Carousel */}
      {testimonialsVisible && <TestimonialsCarousel testimonials={testimonials} />}

      </div>
    </div>
  );
}
