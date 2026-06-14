"use client";

import type { BrandItem } from "@/types";

interface BrandCarouselProps {
  brands: BrandItem[];
}

const DEFAULT_BRANDS: BrandItem[] = [
  { name: "Google" },
  { name: "Meta" },
  { name: "Shopify" },
  { name: "Stripe" },
  { name: "Notion" },
  { name: "Figma" },
  { name: "Vercel" },
  { name: "Slack" },
];

function BrandCard({ brand }: { brand: BrandItem }) {
  return (
    <div className="flex items-center justify-center px-6 py-4 flex-shrink-0">
      {brand.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="h-8 sm:h-10 w-auto object-contain opacity-50 hover:opacity-80 transition-all duration-300"
        />
      ) : (
        <span className="text-lg sm:text-xl font-semibold text-primary-text/50 whitespace-nowrap tracking-wide">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export const BrandCarousel = ({ brands }: BrandCarouselProps) => {
  const items = brands.length > 0 ? brands : DEFAULT_BRANDS;
  // Duplicate for seamless loop
  const duplicated = [...items, ...items];

  return (
    <section className="bg-secondary-surface/60 border-y border-primary-text/5 overflow-hidden marquee-pause">
      <div className="py-8 sm:py-12">
        {/* Desktop: horizontal marquee */}
        <div className="hidden md:block relative">
          <div className="animate-marquee-x flex w-max" style={{ "--marquee-duration": "15s" } as React.CSSProperties}>
            {duplicated.map((brand, i) => (
              <BrandCard key={`h-${i}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Mobile: two vertical carousels with opposite directions */}
        <div className="md:hidden grid grid-cols-2 gap-4 h-[260px] overflow-hidden">
          {/* Column 1: scrolls up */}
          <div className="relative overflow-hidden">
            <div className="animate-marquee-y-up flex flex-col" style={{ "--marquee-duration": "8s" } as React.CSSProperties}>
              {duplicated.map((brand, i) => (
                <div key={`v1-${i}`} className="flex-shrink-0 h-[60px]">
                  <div className="flex items-center justify-center h-full px-4">
                    {brand.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="h-6 w-auto object-contain opacity-50"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-primary-text/50 whitespace-nowrap">
                        {brand.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: scrolls down */}
          <div className="relative overflow-hidden">
            <div className="animate-marquee-y-down flex flex-col" style={{ "--marquee-duration": "8s" } as React.CSSProperties}>
              {duplicated.map((brand, i) => (
                <div key={`v2-${i}`} className="flex-shrink-0 h-[60px]">
                  <div className="flex items-center justify-center h-full px-4">
                    {brand.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="h-6 w-auto object-contain opacity-50"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-primary-text/50 whitespace-nowrap">
                        {brand.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
