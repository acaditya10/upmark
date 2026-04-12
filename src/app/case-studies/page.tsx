import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Case Studies - Upmark",
  description: "Explore our recent studies, success stories, and stills & motions.",
};

export default function CaseStudiesPage() {
  const studies = [
    { title: "Revenue Scale", client: "Ingri", category: "E-Commerce", metric: "+210% Revenue Growth" },
    { title: "Market Penetration", client: "Stratos", category: "B2B SaaS", metric: "3.5x Pipeline" },
  ];

  const successStories = [
    { title: "Lead Generation Engine", client: "Motorworks", category: "Automotive", metric: "+320% Lead Volume" },
    { title: "Occupancy Maximization", client: "Luxe Stays", category: "Hospitality", metric: "+175% Booking Rate" },
    { title: "App Install Campaign", client: "FinTeq", category: "Fintech", metric: "-40% CAC" },
  ];

  const stillsAndMotions = [
    { title: "Q3 Campaign Shoot", client: "Aura Edge", category: "Production", metric: "3M+ Views" },
    { title: "Brand Identity Refresh", client: "Nexus Group", category: "Creative", metric: "Award Winning" },
  ];

  return (
    <div className="pt-12 pb-32">
      <div className="container mx-auto px-6 flex flex-col gap-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6">The Work.</h1>
          <p className="text-xl text-muted-text font-body max-w-2xl">Results driven by strategy, scaled by execution. We measure our success purely by the growth of our partners.</p>
        </div>

        <section id="studies" className="scroll-mt-32">
          <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Studies</h2>
            <span className="text-muted-text text-sm uppercase tracking-widest hidden md:block">Deep Dives</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {studies.map((item, i) => (
              <CaseStudyCard key={i} {...item} />
            ))}
          </div>
        </section>

        <section id="success-stories" className="scroll-mt-32">
          <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Success Stories</h2>
            <span className="text-muted-text text-sm uppercase tracking-widest hidden md:block">Highlight Reels</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {successStories.map((item, i) => (
              <CaseStudyCard key={i} {...item} />
            ))}
          </div>
        </section>

        <section id="stills-motions" className="scroll-mt-32">
          <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Stills & Motions</h2>
            <span className="text-muted-text text-sm uppercase tracking-widest hidden md:block">Creative Output</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {stillsAndMotions.map((item, i) => (
              <CaseStudyCard key={i} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
