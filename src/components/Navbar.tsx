'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import Logo from '@/components/Logo';

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      if (pathname === '/') {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const navLinks = [
    { label: t.nav.about, href: '#about', widthClass: 'w-[102px]' },
    { label: t.nav.gallery, href: '#gallery', widthClass: 'w-[82px]' },
    { label: t.nav.menu, href: '/menu', widthClass: 'w-[68px]' },
    { label: t.nav.location, href: '#location', widthClass: 'w-[86px]' },
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 sm:h-20 flex items-center justify-between relative">
          {/* Logo (Left) */}
          <div className="shrink-0 z-20 flex items-center">
            <button
              onClick={handleLogoClick}
              className="group cursor-pointer flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
              aria-label="botaniqa ana sayfa"
            >
              <Logo
                variant="compact"
                size={42}
                className="opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          {/* 1. Navbar: Perfectly centered in the page with fixed slot widths to eliminate language switch shifts */}
          <nav className="hidden md:flex items-center pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-[350px] flex items-center justify-between p-1 rounded-full bg-[#182d18]/50 border border-[#2d4d2d]/35 backdrop-blur-md shadow-xs">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`${link.widthClass} h-7 flex items-center justify-center rounded-full text-[#c1dec1] hover:text-white hover:bg-white/8 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer text-center`}
                >
                  <span className="truncate">{link.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right-side desktop controls: Separated 2. Language Toggle & 3. Visit Us Button with fixed bounding boxes */}
          <div className="hidden md:flex items-center gap-3.5 z-20 shrink-0">
            {/* 2. Language toggle with locked dimensions */}
            <div className="w-[78px] h-9 p-1 rounded-full bg-[#182d18]/50 border border-[#2d4d2d]/40 flex items-center justify-between shrink-0 select-none">
              <button
                id="lang-toggle-tr"
                onClick={() => lang !== 'tr' && toggle()}
                aria-label="Türkçe"
                className={`w-[34px] h-7 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center ${
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
                className={`w-[34px] h-7 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  lang === 'en'
                    ? 'bg-[#3d6e3d] text-white shadow-xs'
                    : 'text-[#8ebf8e] hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* 3. Visit Us button with locked dimensions so text changes never shift the toggle */}
            <button
              onClick={() => handleNav('#location')}
              className="w-[155px] h-9 group relative shrink-0 rounded-full bg-gradient-to-r from-[#c1713a] to-[#d6854d] text-[#fffef9] text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(193,113,58,0.45)] hover:-translate-y-0.5 cursor-pointer overflow-hidden flex items-center justify-center text-center select-none"
            >
              <span className="relative z-10 block text-center truncate px-2">{t.nav.visitUs}</span>
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile right-side controls with locked toggle box */}
          <div className="md:hidden flex items-center gap-2 z-20">
            {/* Mobile language toggle with locked width */}
            <div className="w-[66px] h-7 p-0.5 rounded-full bg-[#182d18]/60 border border-[#2d4d2d]/40 flex items-center justify-between shrink-0">
              <button
                id="lang-toggle-mobile-tr"
                onClick={() => lang !== 'tr' && toggle()}
                aria-label="Türkçe"
                className={`w-7 h-6 rounded-full text-[11px] font-semibold transition-colors flex items-center justify-center ${
                  lang === 'tr' ? 'bg-[#3d6e3d] text-white' : 'text-[#8ebf8e]'
                }`}
              >
                TR
              </button>
              <button
                id="lang-toggle-mobile-en"
                onClick={() => lang !== 'en' && toggle()}
                aria-label="English"
                className={`w-7 h-6 rounded-full text-[11px] font-semibold transition-colors flex items-center justify-center ${
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
