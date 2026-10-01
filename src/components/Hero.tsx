'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BookOpen } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';

export default function Hero() {
  const { t, lang } = useLang();
  const { data } = useCafeData();
  const h = t.hero;

  const [videoLoaded, setVideoLoaded] = useState(false);

  const heroVideo = data.heroVideo;
  const isVideoEnabled = heroVideo?.enabled !== false && Boolean(heroVideo?.url);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Background Media: Video or High-Res Image with Authentic Lighting Scrims */}
      <div className="absolute inset-0 overflow-hidden bg-[#0d1a0d]">
        {isVideoEnabled && heroVideo?.url ? (
          <video
            key={heroVideo.url}
            src={heroVideo.url}
            poster={heroVideo.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <Image
            src="/hero_coffee.jpg"
            alt="botaniqa kafe atmosferi — botanik sarmaşıklar ve sıcak pour over"
            fill
            priority
            quality={92}
            className="object-cover object-center scale-102"
            sizes="100vw"
          />
        )}

        {/* Multilayered ambient gradient scrims for atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1d0f]/85 via-[#132413]/65 to-[#0e1b0e]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#102210]/40 to-[#0b160b]/80" />
        {/* Soft sunlight conservatory ray */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#d98348]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#3f6d3f]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto flex flex-col items-center">
        {/* Location & Ethos Tag Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8bbf8b]/30 bg-[#162916]/60 backdrop-blur-md mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8a97a] pulse-dot" />
          <span className="text-[#c2dfc2] text-xs font-mono font-medium tracking-widest uppercase">
            {h.badge}
          </span>
        </div>

        {/* Main heading with tight editorial kerning */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#fffef9] tracking-[-0.03em] leading-[1.08] mb-6 font-normal">
          {h.heading1}
          <span className="block italic font-serif text-[#e8a97a] font-normal my-1">
            {h.heading2}
          </span>
          <span className="block text-[#a8d5a8] text-3xl sm:text-5xl md:text-6xl font-light">
            {h.heading3}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-[#c8d4c2] text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 font-light">
          {h.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <Link
            id="hero-explore-menu"
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#c1713a] hover:bg-[#ad602d] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-white/90" />
            <span>{h.exploreCta}</span>
          </Link>
          <a
            id="hero-get-directions"
            href={data.contact?.mapsUrl || "https://maps.google.com/?q=Botaniqa+Cafe+Karakopru+Sanliurfa"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full border border-white/20 hover:border-white/40 text-[#f0f6f0] hover:text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-200 bg-white/10 hover:bg-white/15 backdrop-blur-md active:scale-[0.99]"
          >
            <MapPin className="w-4 h-4 text-[#e8a97a]" />
            <span>{h.directionsCta}</span>
          </a>
        </div>
      </div>

      {/* Editorial Scroll Indicator: Desktop (Mouse) & Mobile (Hand / Finger Swipe) */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8bbf8b]/70 hover:text-[#8bbf8b] transition-colors cursor-pointer group"
        aria-label="Aşağı kaydır"
      >
        {/* Desktop View: Sleek Computer Mouse with animated scroll wheel */}
        <div className="hidden sm:flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-medium text-[#8bbf8b]/70 group-hover:text-[#8bbf8b] transition-colors">
            {h.discover}
          </span>
          <div className="w-5 h-8 rounded-full border border-[#8bbf8b]/40 flex items-start justify-center p-1 group-hover:border-[#8bbf8b]/70 transition-colors shadow-xs">
            <div className="w-1 h-2 rounded-full bg-[#e8a97a] animate-bounce" />
          </div>
        </div>

        {/* Mobile View: Minimalist Hand Silhouette with Upward Swipe Gesture */}
        <div className="flex sm:hidden flex-col items-center gap-1 select-none">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-medium text-[#8bbf8b]/90">
            {h.discover}
          </span>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="relative animate-swipe-up-flick flex flex-col items-center">
              <Image
                src="/swipe-gesture.png"
                alt="Yukarı kaydır"
                width={34}
                height={42}
                className="w-7.5 h-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>
          </div>
        </div>
      </button>
    </section>
  );
}
