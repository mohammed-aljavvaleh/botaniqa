'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import Logo from '@/components/Logo';

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.location, href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#142614]/85 backdrop-blur-xl border-b border-[#2b442b]/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]'
            : 'bg-gradient-to-b from-[#0e1b0e]/70 via-[#0e1b0e]/20 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group cursor-pointer flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="botaniqa ana sayfa"
          >
            <Logo
              variant="compact"
              size={42}
              className="opacity-95 group-hover:opacity-100 transition-opacity"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#182d18]/40 border border-[#2d4d2d]/30 backdrop-blur-md">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-1.5 rounded-full text-[#c1dec1] hover:text-white hover:bg-white/5 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Language toggle pill */}
            <div className="p-1 rounded-full bg-[#182d18]/50 border border-[#2d4d2d]/40 flex items-center">
              <button
                id="lang-toggle-tr"
                onClick={() => lang !== 'tr' && toggle()}
                aria-label="Türkçe"
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  lang === 'tr'
                    ? 'bg-[#3d6e3d] text-white shadow-xs'
                    : 'text-[#8ebf8e] hover:text-white'
                }`}
              >
                TR
              </button>
              <button
                id="lang-toggle-en"
                onClick={() => lang !== 'en' && toggle()}
                aria-label="English"
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#3d6e3d] text-white shadow-xs'
                    : 'text-[#8ebf8e] hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => handleNav('#location')}
              className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c1713a] to-[#d6854d] text-[#fffef9] text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(193,113,58,0.45)] hover:-translate-y-0.5 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">{t.nav.visitUs}</span>
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </nav>

          {/* Mobile right-side controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile language toggle */}
            <div className="p-0.5 rounded-full bg-[#182d18]/60 border border-[#2d4d2d]/40 flex items-center">
              <button
                id="lang-toggle-mobile-tr"
                onClick={() => lang !== 'tr' && toggle()}
                aria-label="Türkçe"
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  lang === 'tr' ? 'bg-[#3d6e3d] text-white' : 'text-[#8ebf8e]'
                }`}
              >
                TR
              </button>
              <button
                id="lang-toggle-mobile-en"
                onClick={() => lang !== 'en' && toggle()}
                aria-label="English"
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  lang === 'en' ? 'bg-[#3d6e3d] text-white' : 'text-[#8ebf8e]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#203a20]/70 border border-[#325632]/50 text-[#c2dfc2] hover:text-white hover:bg-[#2b4c2b] transition-all"
              aria-label="Menüyü aç/kapat"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-[#142614] border-l border-[#264426] shadow-2xl transition-transform duration-300 flex flex-col justify-between ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="mb-8 pb-6 border-b border-[#254225]">
              <Logo
                variant="compact"
                size={40}
                className="mb-2"
              />
              <p className="text-[#84b284] text-xs tracking-wider uppercase mt-2 font-mono">
                {t.nav.location_sub}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 px-4 rounded-2xl text-[#dbeef0] hover:bg-[#203a20] hover:text-white font-medium tracking-wide transition-all text-base cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-[#254225] bg-[#0f1d0f]/60">
            <button
              onClick={() => handleNav('#location')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#c1713a] to-[#d6854d] text-white font-semibold text-center text-sm uppercase tracking-wider hover:opacity-95 transition-opacity shadow-lg shadow-[#c1713a]/25"
            >
              {t.nav.visitUs}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
