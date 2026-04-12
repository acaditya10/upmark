import { ContentGrid } from "@/components/sections/ContentGrid";
import { Lightbulb, MousePointerClick, Share2, PenTool, Video, PlaySquare, CalendarDays, Search, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Upmark",
  description: "Comprehensive marketing services including Strategy, Paid Media, Social Media, and Content Production.",
};

export default function ServicesPage() {
  const services = [
    { 
      id: "strategy", 
      title: "Marketing Strategy", 
      description: "Data-driven roadmaps that align your business objectives with actionable marketing initiatives.",
      icon: <Lightbulb size={24} />
    },
    { 
      id: "paid-media", 
      title: "Paid Media", 
      description: "High-ROI campaigns across Meta, Google, LinkedIn, and TikTok. We optimize for conversion, not just clicks.",
      icon: <MousePointerClick size={24} />
    },
    { 
      id: "social", 
      title: "Social Media Marketing", 
      description: "Community building and brand narrative execution across all major social platforms.",
      icon: <Share2 size={24} />
    },
    { 
      id: "design", 
      title: "Campaign Design", 
      description: "Striking visual identities and creatives engineered to capture attention and stop the scroll.",
      icon: <PenTool size={24} />
    },
    { 
      id: "content", 
      title: "Content Production", 
      description: "End-to-end production of premium, brand-aligned assets for digital and permanent placement.",
      icon: <Video size={24} />
    },
    { 
      id: "reels", 
      title: "Video & Reels Production", 
      description: "Short-form, engaging motion content optimized for current algorithm preferences.",
      icon: <PlaySquare size={24} />
    },
    { 
      id: "events", 
      title: "Corporate Event Coverage", 
      description: "Cinematic documentation and live coverage of your key corporate moments and launches.",
      icon: <CalendarDays size={24} />
    },
    { 
      id: "seo", 
      title: "SEO & Lead Generation", 
      description: "Sustainable inbound systems that capture high-intent search traffic and convert.",
      icon: <Search size={24} />
    },
    { 
      id: "consulting", 
      title: "Digital Growth Consulting", 
      description: "Strategic advising for internal teams, restructuring, and high-level growth mechanics.",
      icon: <TrendingUp size={24} />
    }
  ];

  return (
    <div className="pt-12 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">Our Services</h1>
          <p className="text-xl text-muted-text font-body">Integrated capabilities designed to work as a cohesive growth engine. From initial strategy to final execution.</p>
        </div>
        
        <ContentGrid items={services} type="icon" columns={3} />
      </div>
    </div>
  );
}
