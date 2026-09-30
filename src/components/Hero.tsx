'use client';

import Image from 'next/image';
import { ArrowDown, MapPin, BookOpen, Sparkles } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Background image & authentic lighting depth */}
      <div className="absolute inset-0">
        <Image
          src="/hero_coffee.jpg"
          alt="botaniqa kafe atmosferi — botanik sarmaşıklar ve sıcak pour over"
          fill
          priority
          quality={92}
          className="object-cover object-center scale-102"
          sizes="100vw"
        />
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
          <span className="text-[#8bbf8b]/40">•</span>
          <span className="text-[#a4cca4] text-xs font-mono tracking-wider">
            Şanlıurfa
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            id="hero-explore-menu"
            onClick={() => scrollToSection('#menu')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#c1713a] to-[#d6854d] hover:from-[#b0612c] hover:to-[#c6763f] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-300 shadow-xl shadow-[#c1713a]/30 hover:shadow-2xl hover:shadow-[#c1713a]/40 hover:-translate-y-1 active:scale-98 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-white/90" />
            <span>{h.exploreCta}</span>
          </button>
          <a
            id="hero-get-directions"
            href="https://maps.google.com/?q=Botaniqa+Cafe+Karakopru+Sanliurfa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-[#8bbf8b]/40 hover:border-[#8bbf8b] text-[#e0f0e0] hover:text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-300 bg-[#162916]/40 hover:bg-[#203a20]/60 backdrop-blur-md hover:-translate-y-1 active:scale-98"
          >
            <MapPin className="w-4 h-4 text-[#e8a97a]" />
            <span>{h.directionsCta}</span>
          </a>
        </div>
      </div>

      {/* Editorial Scroll Indicator */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8bbf8b]/70 hover:text-[#8bbf8b] transition-colors cursor-pointer group"
        aria-label="Aşağı kaydır"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-medium">
          {h.discover}
        </span>
        <div className="w-5 h-8 rounded-full border border-[#8bbf8b]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#e8a97a] animate-bounce" />
        </div>
      </button>
    </section>
  );
}
