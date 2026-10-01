'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Sparkles } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';
import { GalleryItemData } from '@/data/initialData';

const MASONRY_SLOTS = [
  {
    slot: 1,
    labelTr: 'Büyük Vitrin (Hero)',
    labelEn: 'Large Hero (2x2)',
    className: 'col-span-2 row-span-2',
    aspectClass: 'aspect-[4/3]',
    mobileClass: 'col-span-2 aspect-video',
  },
  {
    slot: 2,
    labelTr: 'Kare (Üst Orta)',
    labelEn: 'Square (Top Mid)',
    className: 'col-span-1 row-span-1',
    aspectClass: 'aspect-square',
    mobileClass: 'col-span-1 aspect-square',
  },
  {
    slot: 3,
    labelTr: 'Kare (Üst Sağ)',
    labelEn: 'Square (Top Right)',
    className: 'col-span-1 row-span-1',
    aspectClass: 'aspect-square',
    mobileClass: 'col-span-1 aspect-square',
  },
  {
    slot: 4,
    labelTr: 'Kare (Sol Alt)',
    labelEn: 'Square (Bottom Left)',
    className: 'col-span-1 row-span-1',
    aspectClass: 'aspect-square',
    mobileClass: 'col-span-1 aspect-square',
  },
  {
    slot: 5,
    labelTr: 'Kare (Alt Orta)',
    labelEn: 'Square (Bottom Mid)',
    className: 'col-span-1 row-span-1',
    aspectClass: 'aspect-square',
    mobileClass: 'col-span-1 aspect-square',
  },
  {
    slot: 6,
    labelTr: 'Kare (Sağ Alt)',
    labelEn: 'Square (Bottom Right)',
    className: 'col-span-1 row-span-1',
    aspectClass: 'aspect-square',
    mobileClass: 'col-span-1 aspect-square',
  },
];

export default function Gallery() {
  const { t, lang } = useLang();
  const { data: cafeData } = useCafeData();
  const g = t.gallery;

  const userGallery: GalleryItemData[] = cafeData.gallery || [];

  // Always construct exactly 6 anchored slots by slot number
  const slots = MASONRY_SLOTS.map((layout) => {
    const slotNumber = layout.slot;
    const photo = userGallery.find(
      (item) => item.slot === slotNumber || item.id === `slot-${slotNumber}`
    );

    return {
      slotNumber,
      hasPhoto: Boolean(photo && photo.src && photo.src.trim() !== ''),
      photo: photo || null,
      layout,
    };
  });

  return (
    <section id="gallery" className="py-14 sm:py-28 md:py-36 bg-[#fcfaf5] text-[#1c2a1c] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-36 w-[500px] h-[500px] bg-[#e6efe6]/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#faeee4]/70 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Asymmetrical Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-8 sm:mb-16">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#4a7a4a] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4a7a4a]" />
              <span>02 / {g.label}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1a2e1a] tracking-tight leading-[1.08] font-normal">
              {g.heading1}{' '}
              <span className="italic font-serif text-[#c1713a] font-normal">
                {g.heading2}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[#6d5b45] text-base sm:text-lg leading-relaxed font-light max-w-md">
              {g.subheading}
            </p>
          </div>
        </div>

        {/* Desktop masonry (Always 6 fixed anchored slots) */}
        <div className="hidden sm:grid grid-cols-3 gap-4 lg:gap-5">
          {slots.map((slot) => {
            const slotNumber = slot.slotNumber;

            if (slot.hasPhoto && slot.photo) {
              const altText =
                lang === 'tr'
                  ? slot.photo.altTr || `botaniqa`
                  : slot.photo.altEn || slot.photo.altTr || `botaniqa`;

              return (
                <div
                  key={`slot-${slotNumber}`}
                  className={`${slot.layout.className} ${slot.layout.aspectClass} relative overflow-hidden rounded-3xl img-zoom group cursor-pointer border border-[#e8dfd0] shadow-[0_12px_36px_-12px_rgba(28,46,28,0.12)] bg-[#f3ede2]`}
                >
                  <Image
                    src={slot.photo.src}
                    alt={altText}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-600 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#122312]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[#f5fbf5] text-xs sm:text-sm font-medium leading-snug drop-shadow-sm">
                      {altText}
                    </p>
                  </div>
                </div>
              );
            }

            // Fixed slot placeholder showing slot number clearly
            return (
              <div
                key={`empty-slot-${slotNumber}`}
                className={`${slot.layout.className} ${slot.layout.aspectClass} relative overflow-hidden rounded-3xl border-2 border-dashed border-[#ded5c5] bg-gradient-to-br from-[#f8f5ee] via-[#f4eee4] to-[#ede3d5]/40 flex flex-col items-center justify-center p-6 text-center shadow-xs group hover:border-[#c1713a]/50 transition-all duration-300 select-none`}
              >
                {/* Ambient background watermark */}
                <div className="absolute inset-0 bg-[radial-gradient(#2d4a2d_1px,transparent_1px)] opacity-10 [background-size:16px_16px] pointer-events-none" />

                <div className="relative flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/90 border border-[#ded8cb] shadow-xs flex items-center justify-center mb-2.5 group-hover:scale-105 group-hover:border-[#c1713a]/50 transition-all duration-300">
                    <span className="font-serif text-lg font-bold text-[#1c381c] group-hover:text-[#c1713a] transition-colors">
                      #{slotNumber}
                    </span>
                  </div>

                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1c381c]/10 text-[#1c381c] mb-1">
                    Slot #{slotNumber}
                  </span>

                  <p className="font-serif text-xs font-semibold text-[#1c2a1c] tracking-tight">
                    {lang === 'tr' ? slot.layout.labelTr : slot.layout.labelEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile 2-col grid (Always 6 anchored slots) */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {slots.map((slot) => {
            const slotNumber = slot.slotNumber;

            if (slot.hasPhoto && slot.photo) {
              const altText =
                lang === 'tr'
                  ? slot.photo.altTr || `botaniqa`
                  : slot.photo.altEn || slot.photo.altTr || `botaniqa`;

              return (
                <div
                  key={`mobile-slot-${slotNumber}`}
                  className={`relative overflow-hidden rounded-2xl border border-[#e8dfd0] shadow-xs ${slot.layout.mobileClass}`}
                >
                  <Image
                    src={slot.photo.src}
                    alt={altText}
                    fill
                    className="object-cover object-center"
                    sizes="50vw"
                  />
                </div>
              );
            }

            // Mobile slot number placeholder
            return (
              <div
                key={`mobile-empty-${slotNumber}`}
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-[#ded5c5] bg-gradient-to-br from-[#f8f5ee] to-[#f1ece2] flex flex-col items-center justify-center p-4 text-center ${slot.layout.mobileClass}`}
              >
                <div className="w-8 h-8 rounded-xl bg-white/90 border border-[#ded8cb] flex items-center justify-center mb-1">
                  <span className="font-serif text-sm font-bold text-[#1c381c]">
                    #{slotNumber}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#1c381c]/70">
                  Slot #{slotNumber}
                </span>
              </div>
            );
          })}
        </div>

        {/* Instagram CTA */}
        <div className="mt-14 sm:mt-18 text-center">
          <a
            id="gallery-instagram"
            href={cafeData.socials.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#4a7a4a]/30 hover:border-[#4a7a4a] bg-white/70 hover:bg-white text-[#1a2e1a] font-medium text-xs uppercase tracking-[0.16em] transition-all duration-300 hover:shadow-lg hover:shadow-[#4a7a4a]/10 hover:-translate-y-0.5 group"
          >
            <SiInstagram className="w-4 h-4 text-[#c1713a] group-hover:scale-110 transition-transform duration-300" />
            <span>{g.instagramCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
