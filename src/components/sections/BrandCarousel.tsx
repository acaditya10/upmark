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
    <div className="flex items-center justify-center px-8 py-4 flex-shrink-0 w-[180px]">
      {brand.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="h-12 w-auto max-w-[160px] object-contain"
        />
      ) : (
        <span className="text-2xl font-semibold text-primary-text whitespace-nowrap tracking-wide">
          {brand.name}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({ brands }: { brands: BrandItem[] }) {
  const tripled = [...brands, ...brands, ...brands];
  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex w-max animate-marquee-x"
        style={{ "--marquee-duration": "30s" } as React.CSSProperties}
      >
        {tripled.map((brand, i) => (
          <BrandCard key={`h-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function MarqueeColumn({
  brands,
  direction,
}: {
  brands: BrandItem[];
  direction: "up" | "down";
}) {
  const tripled = [...brands, ...brands, ...brands];
  const animClass = direction === "up" ? "animate-marquee-y-up" : "animate-marquee-y-down";
  return (
    <div className="relative overflow-hidden h-full">
      <div
        className={`flex flex-col ${animClass}`}
        style={{ "--marquee-duration": "12s" } as React.CSSProperties}
      >
        {tripled.map((brand, i) => (
          <div key={`${direction}-${i}`} className="flex-shrink-0 h-[80px]">
            <div className="flex items-center justify-center h-full px-4">
              {brand.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-10 w-auto max-w-[140px] object-contain"
                />
              ) : (
                <span className="text-base font-semibold text-primary-text whitespace-nowrap">
                  {brand.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const BrandCarousel = ({ brands }: BrandCarouselProps) => {
  const items = brands.length > 0 ? brands : DEFAULT_BRANDS;

  return (
    <section className="bg-secondary-surface/60 border-y border-primary-text/5 overflow-hidden">
      <div className="py-4 sm:py-6">
        {/* Desktop: horizontal marquee */}
        <div className="hidden md:block">
          <MarqueeRow brands={items} />
        </div>

        {/* Mobile: two vertical carousels with opposite directions */}
        <div className="md:hidden grid grid-cols-2 gap-2 h-[320px] overflow-hidden">
          <MarqueeColumn brands={items} direction="up" />
          <MarqueeColumn brands={items} direction="down" />
        </div>
      </div>
    </section>
  );
};
