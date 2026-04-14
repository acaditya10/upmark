import { MoveRight, Target, Zap, BarChart3, Users, Network, TrendingUp, Presentation, PlaySquare, ArrowRight, Briefcase } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Services | Upmark",
  description: "Comprehensive marketing services including Strategy, Paid Media, Social Media, and Content Production.",
};

// Default icon pool for services without uploaded icons
const DEFAULT_ICONS = [Network, TrendingUp, Users, Presentation, PlaySquare, MoveRight, Target, Zap, BarChart3];

export default async function ServicesPage() {
  const services = await getServices();

  // Sort by order field (lower first), then by creation date
  const sorted = [...services].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <div className="pt-32 pb-32">
      <section className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="text-accent-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent-blue"></span>
             WHAT WE DO
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">
             One agency. <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-blue-400">Every capability.</span>
          </h2>
          <p className="text-muted-text text-xl max-w-2xl font-light">
             From strategy to production to distribution, we cover the full marketing spectrum so you never need another vendor.
          </p>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={48} className="text-muted-text/30 mx-auto mb-4" />
            <p className="text-muted-text text-lg">Services coming soon.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-32">
            {sorted.map((item, index) => {
              const align = index % 2 === 0 ? "left" : "right";
              const IconComponent = DEFAULT_ICONS[index % DEFAULT_ICONS.length];

              return (
                <div key={item.id} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
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
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xl text-muted-text leading-relaxed font-light mb-8 max-w-lg">
                      {item.description}
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-blue transition-colors group"
                    >
                      <span className="border-b border-white border-opacity-30 group-hover:border-accent-blue pb-1 transition-all">Discuss this service</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  {/* Visual Placeholder Side */}
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-white/10 group">
                      <div className="absolute inset-0 bg-accent-blue/5 group-hover:bg-accent-blue/10 transition-colors duration-500"></div>
                      
                      {/* Use uploaded icon as visual or decorative placeholder */}
                      {item.icon_url ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.icon_url} alt={item.title} className="w-24 h-24 object-contain opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" />
                        </div>
                      ) : (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700">
                          <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                            <IconComponent size={40} className="text-white/30" />
                          </div>
                        </div>
                      )}
                      
                      {/* Subtle Grid Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Global CTA at the bottom */}
        <div className="mt-40 text-center relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-accent-blue/20 blur-[100px] rounded-full -z-10"></div>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-8">
            Ready to see our <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-purple-400">results?</span>
          </h2>
          <p className="text-xl text-muted-text mb-12 font-light max-w-2xl mx-auto">
            Explore our curated portfolio of successful campaigns, brand transformations and growth stories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/work" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              View our work <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contact" 
              className="px-10 py-5 rounded-full font-bold text-lg border border-white/20 text-white hover:bg-white/5 transition-colors w-full sm:w-auto justify-center hover:border-white/40"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
