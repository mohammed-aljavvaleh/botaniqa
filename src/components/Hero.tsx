'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BookOpen } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';

export default function Hero() {
  const { t, lang } = useLang();
  const { data } = useCafeData();
  const h = t.hero;

  const [isMounted, setIsMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroVideo = data.heroVideo;
  const isVideoEnabled = heroVideo?.enabled !== false && Boolean(heroVideo?.url);

  // Ensure video autoplays when visible and pauses when scrolled off-screen
  // to free up 100% of GPU decoders and layer memory for smooth momentum scrolling
  useEffect(() => {
    if (!isMounted || !isVideoEnabled || !heroVideo?.url) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMounted, heroVideo?.url, isVideoEnabled]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 gpu-accelerated"
    >
      {/* Background Media: High-Res Image with Authentic Lighting Scrims */}
      <div className="absolute inset-0 overflow-hidden bg-[#0d1a0d] gpu-accelerated will-change-transform">
        {/* Fallback image always active beneath so there is never a black flicker */}
        <Image
          src={heroVideo?.poster || "/hero_coffee.webp"}
          alt="botaniqa kafe atmosferi — botanik sarmaşıklar ve sıcak pour over"
          fill
          priority
          quality={85}
          className="object-cover object-center scale-102"
          sizes="100vw"
        />

        {/* Video mounts strictly AFTER hydration to eliminate any hydration mismatch */}
        {isMounted && isVideoEnabled && heroVideo?.url ? (
          <video
            ref={videoRef}
            key={heroVideo.url}
            src={heroVideo.url}
            poster={heroVideo.poster || '/hero_coffee.webp'}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onPlaying={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Multilayered ambient gradient scrims for atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1d0f]/85 via-[#132413]/65 to-[#0e1b0e]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#102210]/40 to-[#0b160b]/80" />
        {/* Soft sunlight conservatory ray (zero-blur radial shader for 60/120fps mobile scrolling) */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(217,131,72,0.14)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(63,109,63,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto flex flex-col items-center">
        {/* Location & Ethos Tag Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8bbf8b]/30 bg-[#162916]/80 sm:bg-[#162916]/60 backdrop-blur-xs sm:backdrop-blur-md mb-6 shadow-xs">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full border border-white/20 hover:border-white/40 text-[#f0f6f0] hover:text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-200 bg-white/10 hover:bg-white/15 backdrop-blur-xs sm:backdrop-blur-md active:scale-[0.99]"
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
                priority
                className="w-7.5 h-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>
        </div>
      </button>
    </section>
  );
}
