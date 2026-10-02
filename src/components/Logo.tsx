'use client';

import Image from 'next/image';

interface LogoProps {
  /**
   * 'compact': Official logo image badge + BOTANIQA wordmark & tagline (ideal for Navbar & Footer)
   * 'mark': Just the official logo image (circular or rounded emblem)
   * 'full': Large official logo card showcase
   */
  variant?: 'compact' | 'mark' | 'full';
  className?: string;
  size?: number;
  showText?: boolean;
  priority?: boolean;
}

export default function Logo({
  variant = 'compact',
  className = '',
  size,
  showText = true,
  priority = false,
}: LogoProps) {
  // ── Full variant (showcase card) ──────────────────────────────────
  if (variant === 'full') {
    const cardSize = size || 180;
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#c8aa6e]/40 bg-[#023f04]"
          style={{ width: cardSize, height: cardSize }}
        >
          <Image
            src="/botaniqa-logo.jpg"
            alt="Botaniqa — Coffee & Nature"
            fill
            sizes={`${cardSize}px`}
            className="object-cover"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  // ── Mark only variant (just the official logo emblem) ─────────────
  if (variant === 'mark' || !showText) {
    const markSize = size || 44;
    return (
      <div
        className={`relative inline-block rounded-xl overflow-hidden shadow-md border border-[#c8aa6e]/40 bg-[#023f04] shrink-0 ${className}`}
        style={{ width: markSize, height: markSize }}
      >
        <Image
          src="/botaniqa-logo.jpg"
          alt="Botaniqa Logo"
          fill
          sizes={`${markSize}px`}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  // ── Compact variant (official logo emblem + brand typography) ─────
  const emblemSize = size || 42;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Logo image badge from /public/botaniqa-logo.jpg */}
      <div
        className="relative rounded-xl overflow-hidden shadow-md border border-[#c8aa6e]/40 bg-[#023f04] shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: emblemSize, height: emblemSize }}
      >
        <Image
          src="/botaniqa-logo.jpg"
          alt="Botaniqa Logo"
          fill
          sizes={`${emblemSize}px`}
          className="object-cover"
          priority={priority}
        />
      </div>

      {/* Typography pairing */}
      <div className="flex flex-col text-left">
        <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-[#f5e8d0] leading-none transition-colors group-hover:text-white">
          BOTANIQA
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#8bbf8b] uppercase font-medium mt-1">
          COFFEE &amp; NATURE
        </span>
      </div>
    </div>
  );
}
