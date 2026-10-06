'use client';

import Image from 'next/image';
import { Leaf, Coffee, Star, Heart, ExternalLink } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';
import { useEffect, useState } from 'react';

const pillarIcons = [
  <Leaf key="leaf" className="w-5 h-5 text-[#4a7a4a]" />,
  <Coffee key="coffee" className="w-5 h-5 text-[#c1713a]" />,
  <Heart key="sparkles" className="w-5 h-5 text-[#8b7355]" />,
];

interface PlacesData {
  rating: number | null;
  userRatingsTotal: number | null;
  name: string | null;
  fallback?: boolean;
}

function useGooglePlacesRating(placeId?: string) {
  const [data, setData] = useState<PlacesData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!placeId) return;

    setLoading(true);
    fetch(`/api/places?placeId=${encodeURIComponent(placeId)}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData({
            ...json.data,
            fallback: Boolean(json.fallback),
          });
        }
      })
      .catch(() => {
        // Silently fall back to static values on error
      })
      .finally(() => setLoading(false));
  }, [placeId]);

  return { data, loading };
}

/** Format review count: 1234 → "1.2K", <1000 → "432" */
function formatReviewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return String(count);
}

/** Render star icons for a given rating (e.g. 4.3 → 4 full + 1 empty) */
function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5 text-[#c1713a]">
      {[...Array(5)].map((_, i) =>
        i < full ? (
          <Star key={i} className="w-3.5 h-3.5 fill-[#c1713a]" />
        ) : (
          <Star key={i} className="w-3.5 h-3.5 text-[#d5cebe]" />
        )
      )}
      <span className="text-xs font-bold text-[#1c381c] ml-1 font-mono">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function About() {
  const { t, lang } = useLang();
  const { data: cafeData } = useCafeData();
  const a = t.about;

  const primaryImage = cafeData?.aboutImage || '/cafe_interior.webp';
  const secondaryImage = cafeData?.aboutSecondaryImage || '/gallery_1.webp';

  const placeId = cafeData?.socials?.googlePlaceId;
  const { data: placesData, loading: placesLoading } = useGooglePlacesRating(placeId || undefined);

  // Use live data if available, otherwise fall back to static defaults
  const displayRating = placesData?.rating ?? 4.1;
  const displayReviewCount = placesData?.userRatingsTotal ?? null;
  const isLive = Boolean(placesData?.rating && !placesData?.fallback && placesData?.userRatingsTotal);

  return (
    <section id="about" className="pt-12 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-14 bg-[#fcfaf5] text-[#1c2a1c] relative overflow-hidden">
      {/* Delicate background ambient noise & soft gradient blur */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#e2ede2]/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] bg-[#f7ebe0]/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Asymmetrical Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-20">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#4a7a4a] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4a7a4a]/80" />
              <span>01 / {a.label}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1a2e1a] tracking-tight leading-[1.08] font-normal">
              {a.heading1}{' '}
              <span className="italic font-serif text-[#c1713a] font-normal block sm:inline">
                {a.heading2}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[#635544] text-sm sm:text-lg leading-relaxed max-w-md font-light">
              {a.intro}
            </p>
          </div>
        </div>

        {/* Asymmetric Overlapping Visual & Narrative Composition */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-10 sm:mb-18">
          {/* Overlapping Multi-Layer Image Architecture (7 cols) */}
          <div className="lg:col-span-7 relative pb-4 sm:pb-0">
            {/* Primary architectural photo */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-[#e8dfd0] shadow-[0_24px_60px_-15px_rgba(28,46,28,0.18)] group bg-[#e8dfd0]">
              <Image
                src={primaryImage}
                alt="botaniqa kafe atmosferi — asılı bitkiler ve sıcak botanik ışık"
                fill
                unoptimized={primaryImage.startsWith('data:') || primaryImage.includes('urfamenu.com')}
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142614]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Secondary Vignette Photo (Offset off-center) */}
            <div className="block absolute -bottom-6 right-2 sm:-bottom-10 sm:right-auto sm:-right-6 lg:-right-10 w-36 h-44 sm:w-52 sm:h-64 md:w-60 md:h-72 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-[#fcfaf5] shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-20 group bg-[#e8dfd0]">
              <Image
                src={secondaryImage}
                alt="Botanik kahve sunumu"
                fill
                unoptimized={secondaryImage.startsWith('data:') || secondaryImage.includes('urfamenu.com')}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 150px, 240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Tactile Rating Seal Badge (Links directly to Google Reviews) */}
            <a
              suppressHydrationWarning
              href={cafeData?.socials?.googleMapsUrl || cafeData?.contact?.mapsUrl || "https://maps.app.goo.gl/ZviCM2js2bHiWS7cA"}
              target="_blank"
              rel="noopener noreferrer"
              title={lang === 'tr' ? "Google Haritalar'da Yorumları İncele" : "View Reviews on Google Maps"}
              className="group/badge absolute -top-5 sm:-top-6 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md hover:bg-white rounded-2xl p-3 sm:p-4.5 shadow-xl border border-[#e4ded0] hover:border-[#c1713a]/50 z-20 flex items-center gap-3 sm:gap-3.5 transition-all duration-300 hover:scale-102"
            >
              {/* Score square */}
              <div
                suppressHydrationWarning
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#264426] group-hover/badge:bg-[#1c381c] text-white flex flex-col items-center justify-center font-serif leading-none shadow-sm shrink-0 transition-colors relative"
              >
                {placesLoading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-base sm:text-lg font-bold">{displayRating.toFixed(1)}</span>
                    <span className="text-[8px] sm:text-[9px] text-emerald-200 tracking-wider">
                      {lang === 'tr' ? 'PUAN' : 'SCORE'}
                    </span>
                  </>
                )}
                {/* Live indicator dot (positioned cleanly on top-right corner) */}
                {isLive && !placesLoading && (
                  <span
                    title={lang === 'tr' ? 'Canlı Google verisi' : 'Live Google data'}
                    style={{ top: '-3px', right: '-3px' }}
                    className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#264426] shadow-xs"
                  />
                )}
              </div>

              <div suppressHydrationWarning>
                <StarRating rating={displayRating} />
                <div className="text-[10px] sm:text-[11px] font-semibold text-[#324832] mt-1 tracking-tight group-hover/badge:text-[#c1713a] transition-colors flex items-center gap-1">
                  {isLive && displayReviewCount !== null ? (
                    <span>
                      {lang === 'tr'
                        ? `Google'da ${displayRating.toFixed(1)} · ${formatReviewCount(displayReviewCount)} Değerlendirme`
                        : `${displayRating.toFixed(1)} on Google · ${formatReviewCount(displayReviewCount)} Reviews`}
                    </span>
                  ) : (
                    <span>{a.rating}</span>
                  )}
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/badge:opacity-100 transition-opacity" />
                </div>
              </div>
            </a>
          </div>

          {/* Editorial Text Block & Pull-Quote (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div className="space-y-5 text-[#423528] text-base leading-relaxed font-light">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1c381c] first-letter:mr-2.5 first-letter:float-left first-letter:leading-none">
                {a.p1}
              </p>
              <p className="text-[#594939]">
                {a.p2}
              </p>
            </div>

            {/* Bespoke Editorial Quote Card */}
            <div className="relative pt-6 border-t border-[#e2dcd0]/80">
              <span
                suppressHydrationWarning
                className="font-serif text-6xl text-[#c1713a]/30 absolute -top-4 left-0 select-none leading-none"
              >
                “
              </span>
              <p className="font-serif text-xl sm:text-2xl italic text-[#1a2e1a] leading-snug pl-6 font-normal">
                {a.quote}
              </p>
              <cite className="text-xs uppercase tracking-widest text-[#7a6240] pl-6 mt-3 block not-italic font-semibold">
                {a.quoteAuthor}
              </cite>
            </div>
          </div>
        </div>

        {/* Asymmetrical 3 Pillars (Editorial Architecture with varying visual weight) */}
        <div className="border-t border-[#e2dad0] pt-8 sm:pt-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {a.pillars.map((pillar, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(28,46,28,0.06)] border border-transparent hover:border-[#e2ded2]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#869f86] tracking-wider">
                      0{i + 1}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#f0eae1] group-hover:bg-[#1c381c] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      {pillarIcons[i]}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#1a2e1a] mb-3 tracking-tight font-medium group-hover:text-[#c1713a] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[#615140] text-sm leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>

                <div className="w-8 h-0.5 bg-[#4a7a4a]/20 group-hover:w-16 group-hover:bg-[#c1713a] transition-all duration-400 mt-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
