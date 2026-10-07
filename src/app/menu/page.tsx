'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  LeafyGreen,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ArrowUp,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';
import { defaultCategories, initialCafeData } from '@/data/initialData';

// Tag styling map with refined botanical palette
const tagStyles: Record<string, { bg: string; dot: string; text: string; border: string }> = {
  'Çok Satan': {
    bg: 'bg-[#c1713a]/15',
    text: 'text-[#9c5222]',
    border: 'border-[#c1713a]/30',
    dot: 'bg-[#c1713a]',
  },
  'Bestseller': {
    bg: 'bg-[#c1713a]/15',
    text: 'text-[#9c5222]',
    border: 'border-[#c1713a]/30',
    dot: 'bg-[#c1713a]',
  },
  'İmza': {
    bg: 'bg-[#2d5a2d]/15',
    text: 'text-[#204520]',
    border: 'border-[#2d5a2d]/30',
    dot: 'bg-[#2d5a2d]',
  },
  'Signature': {
    bg: 'bg-[#2d5a2d]/15',
    text: 'text-[#204520]',
    border: 'border-[#2d5a2d]/30',
    dot: 'bg-[#2d5a2d]',
  },
  'Mevsimlik': {
    bg: 'bg-[#8b7355]/15',
    text: 'text-[#6b553c]',
    border: 'border-[#8b7355]/30',
    dot: 'bg-[#8b7355]',
  },
  'Seasonal': {
    bg: 'bg-[#8b7355]/15',
    text: 'text-[#6b553c]',
    border: 'border-[#8b7355]/30',
    dot: 'bg-[#8b7355]',
  },
  'Premium': {
    bg: 'bg-[#6b4c8a]/15',
    text: 'text-[#53386e]',
    border: 'border-[#6b4c8a]/30',
    dot: 'bg-[#6b4c8a]',
  },
  'Yerel': {
    bg: 'bg-[#3d6e3d]/15',
    text: 'text-[#2a502a]',
    border: 'border-[#3d6e3d]/30',
    dot: 'bg-[#3d6e3d]',
  },
  'Local': {
    bg: 'bg-[#3d6e3d]/15',
    text: 'text-[#2a502a]',
    border: 'border-[#3d6e3d]/30',
    dot: 'bg-[#3d6e3d]',
  },
  'Günün Özelliği': {
    bg: 'bg-[#b8860b]/15',
    text: 'text-[#8a6508]',
    border: 'border-[#b8860b]/30',
    dot: 'bg-[#b8860b]',
  },
  'Daily Special': {
    bg: 'bg-[#b8860b]/15',
    text: 'text-[#8a6508]',
    border: 'border-[#b8860b]/30',
    dot: 'bg-[#b8860b]',
  },
  'Yeni': {
    bg: 'bg-[#15803d]/15',
    text: 'text-[#166534]',
    border: 'border-[#15803d]/30',
    dot: 'bg-[#15803d]',
  },
  'New': {
    bg: 'bg-[#15803d]/15',
    text: 'text-[#166534]',
    border: 'border-[#15803d]/30',
    dot: 'bg-[#15803d]',
  },
};

export default function MenuPage() {
  const { t, lang } = useLang();
  const { data: cafeData } = useCafeData();
  const m = t.menu;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategorySelect = (catId: string) => {
    const el = document.getElementById('menu-categories');
    if (el) {
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80);
      if (window.scrollY > targetY + 30) {
        window.scrollTo({ top: targetY, behavior: 'instant' });
      }
    }
    setSelectedCategory(catId);
    requestAnimationFrame(() => {
      const updatedEl = document.getElementById('menu-categories');
      if (updatedEl) {
        const finalY = Math.max(0, updatedEl.getBoundingClientRect().top + window.scrollY - 80);
        window.scrollTo({ top: finalY, behavior: 'smooth' });
      }
    });
  };

  // Dynamic categories from admin or fallback
  const categories = useMemo(() => {
    const list =
      cafeData?.categories && cafeData.categories.length > 0
        ? cafeData.categories
        : defaultCategories;
    return list.map((c) => ({
      id: c.id,
      label: lang === 'tr' ? c.labelTr : c.labelEn || c.labelTr,
    }));
  }, [cafeData?.categories, lang]);

  // Build unified item list (syncs live with CafeDataContext)
  const allItems = useMemo(() => {
    const rawItems =
      cafeData?.menu && cafeData.menu.length > 0
        ? cafeData.menu
        : initialCafeData.menu;

    return rawItems.map((item) => ({
      id: item.id,
      category: item.category,
      name: lang === 'tr' ? item.nameTr : item.nameEn || item.nameTr,
      desc: lang === 'tr' ? item.descTr : item.descEn || item.descTr,
      price: item.price,
      tag: lang === 'tr' ? item.tagTr : item.tagEn || item.tagTr,
      image: item.image,
      available: item.available !== false,
    }));
  }, [cafeData?.menu, lang]);

  // Filtered items based on category and tag
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && item.tag !== selectedTag) {
        return false;
      }

      return true;
    });
  }, [allItems, selectedCategory, selectedTag]);

  // Available tags in current selection for quick chips
  const tagsList = useMemo(() => {
    const set = new Set<string>();
    allItems.forEach((it) => {
      if (it.tag?.trim()) set.add(it.tag.trim());
    });
    return Array.from(set);
  }, [allItems]);

  // Group items by category for structured display when "all" is selected
  const itemsGroupedByCategory = useMemo(() => {
    const map = new Map<string, typeof filteredItems>();
    categories.forEach((cat) => {
      const itemsInCat = filteredItems.filter((item) => item.category === cat.id);
      if (itemsInCat.length > 0) {
        map.set(cat.id, itemsInCat);
      }
    });

    // Also include any items in uncategorized or dynamic extra categories
    filteredItems.forEach((item) => {
      if (!categories.some((c) => c.id === item.category)) {
        const existing = map.get(item.category) || [];
        existing.push(item);
        map.set(item.category, existing);
      }
    });

    return map;
  }, [categories, filteredItems]);

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#1c2a1c] selection:bg-[#c8aa6e]/30 font-sans">
      <Navbar />

      {/* ── Top Atmospheric Banner ─────────────────────────────────── */}
      <section className="pt-24 sm:pt-36 pb-6 sm:pb-16 bg-gradient-to-b from-[#132313] via-[#1a331a] to-[#132313] text-[#fdf8f0] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#4a7a4a]/20 rounded-full blur-[120px] ambient-glow pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-[350px] h-[350px] bg-[#c1713a]/15 rounded-full blur-[100px] ambient-glow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          {/* Breadcrumb / Back button */}
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#a8d5a8] hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
              <span>{m.backToHome}</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#203d20] border border-[#335e33] text-[10px] sm:text-[11px] font-mono tracking-wider text-[#d0ecd0] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8a97a] animate-pulse" />
              {m.digitalMenu}
            </span>
          </div>

          {/* Title & Headline */}
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fdf8f0] tracking-tight font-normal leading-[1.08] mb-2 sm:mb-4">
              {m.heading1}{' '}
              <span className="italic font-serif text-[#e8a97a]">
                {m.heading2}
              </span>
            </h1>
            <p className="text-[#a4cca4] text-xs sm:text-lg leading-relaxed font-light max-w-2xl mb-3 sm:mb-8 line-clamp-2 sm:line-clamp-none">
              {m.subheading}
            </p>

            {/* Quick Highlights Info Strip (hidden on tiny mobile to avoid vertical bloat) */}
            <div className="hidden sm:flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-[#2d4d2d]/60 text-xs sm:text-sm text-[#c5e4c5]">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#e8a97a]" />
                <span>{lang === 'tr' ? 'Özel Kavrum & Taze Demleme' : 'Specialty Roast & Fresh Brews'}</span>
              </div>
              <div className="flex items-center gap-2">
                <LeafyGreen className="w-4 h-4 text-[#e8a97a]" />
                <span>{lang === 'tr' ? 'Doğal & Botanik Malzemeler' : 'Botanical & Organic Ingredients'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8a97a]" />
                <span>{m.tableServiceNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Navigation Bar ──────────────────────── */}
      <section id="menu-categories" className="relative z-10 bg-[#fcfbfa] border-y border-[#e8e4da] shadow-xs scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-4">
          {/* Category Pill Cloud (Wrapped, No Off-Screen Overflow) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 w-full">
            {/* "All" Pill */}
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1c381c] text-white shadow-md shadow-[#1c381c]/25 ring-1 ring-[#1c381c]'
                  : 'bg-[#f2efe9] text-[#4d634d] hover:bg-[#e7e3d8] hover:text-[#1c381c]'
              }`}
            >
              {m.filterAll} ({allItems.length})
            </button>

            {/* Dynamic Category Pills */}
            {categories.map((cat) => {
              const count = allItems.filter((it) => it.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${isSelected
                      ? 'bg-[#1c381c] text-white font-semibold shadow-md shadow-[#1c381c]/25 ring-1 ring-[#1c381c]'
                      : 'bg-[#f2efe9] text-[#4d634d] hover:bg-[#e7e3d8] hover:text-[#1c381c]'
                    }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-[#e2ddd0] text-[#556b55]'
                        }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Tag Filter Chips (Wrapped) */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-3 mt-3 border-t border-[#eae5d8]">
              <span className="text-[11px] font-semibold text-[#667d66] uppercase tracking-wider mr-1">
                {lang === 'tr' ? 'Filtrele:' : 'Filter:'}
              </span>
              {tagsList.map((tag) => {
                const isSelected = selectedTag === tag;
                const style = tagStyles[tag];

                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${isSelected
                        ? 'bg-[#c1713a] text-white shadow-xs'
                        : 'bg-white border border-[#ded8cb] text-[#556955] hover:border-[#b0c4b0]'
                      }`}
                  >
                    {style?.dot && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : style.dot
                          }`}
                      />
                    )}
                    <span>{tag}</span>
                  </button>
                );
              })}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs text-[#c1713a] hover:underline ml-1 font-medium cursor-pointer"
                >
                  {lang === 'tr' ? 'Filtreyi Temizle' : 'Clear Filter'}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Main Menu Items Content ─────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        {filteredItems.length === 0 ? (
          // Empty State
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f2efe9] text-[#758a75] mx-auto flex items-center justify-center mb-4">
              <Coffee className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1c2a1c] mb-2">{m.noResults}</h3>
            <p className="text-sm text-[#667d66] mb-6">
              {lang === 'tr'
                ? 'Farklı bir kategori seçebilir veya filtreleri sıfırlayabilirsiniz.'
                : 'Try selecting a different category or clearing selected filters.'}
            </p>
            <button
              onClick={() => {
                handleCategorySelect('all');
                setSelectedTag(null);
              }}
              className="px-6 py-2.5 rounded-full bg-[#1c381c] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#274e27] transition-all cursor-pointer"
            >
              {lang === 'tr' ? 'Tüm Menüyü Göster' : 'Show All Items'}
            </button>
          </div>
        ) : selectedCategory === 'all' && !selectedTag ? (
          // Grouped by Category View
          <div className="space-y-8 sm:space-y-16">
            {Array.from(itemsGroupedByCategory.entries()).map(([catId, items]) => {
              const catObj = categories.find((c) => c.id === catId);
              const catTitle = catObj?.label || catId.toUpperCase();

              return (
                <section key={catId} id={`cat-${catId}`} className="scroll-mt-24 sm:scroll-mt-28">
                  {/* Category Header with Aesthetic Botanical Line */}
                  <div className="flex items-center justify-between mb-3 sm:mb-8 pb-2 sm:pb-3 border-b border-[#e8e4da]">
                    <div>
                      <h2 className="font-serif text-xl sm:text-3xl text-[#1c2a1c] font-normal tracking-tight">
                        {catTitle}
                      </h2>
                      <p className="text-[11px] sm:text-sm text-[#697f69] font-light mt-0.5">
                        {items.length} {lang === 'tr' ? 'özel lezzet' : 'crafted selections'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCategorySelect(catId)}
                      className="text-xs font-semibold text-[#c1713a] hover:text-[#9e5525] inline-flex items-center gap-1 group cursor-pointer"
                    >
                      <span>{lang === 'tr' ? 'Yalnızca Bunu Gör' : 'Focus Category'}</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  {/* Grid of Menu Items */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                    {items.map((item) => (
                      <MenuItemCard key={item.id} item={item} lang={lang} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          // Flat Filtered Grid View
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-[#526652]">
                <span className="font-bold text-[#1c2a1c]">{filteredItems.length}</span>{' '}
                {lang === 'tr' ? 'ürün bulundu' : 'items found'}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} lang={lang} />
              ))}
            </div>
          </div>
        )}

        {/* ── Table Notice & Footer Banner ────────────────────────────── */}
        <div className="mt-10 sm:mt-20 p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#f3f0e6] to-[#faf8f2] border border-[#e4decb] text-center max-w-3xl mx-auto shadow-xs">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#ded8cb] mx-auto flex items-center justify-center text-[#1c381c] mb-3 sm:mb-4 shadow-xs">
            <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#1c2a1c] font-normal mb-1.5 sm:mb-2">
            {lang === 'tr' ? 'Kişiselleştirilmiş Servis' : 'Artisan Hospitality'}
          </h3>
          <p className="text-xs sm:text-sm text-[#5d735d] max-w-xl mx-auto leading-relaxed mb-5 sm:mb-6 font-light">
            {lang === 'tr'
              ? 'Bitkisel süt seçeneklerimiz (yulaf, badem), kafeinsiz kahve veya tatlı hassasiyetleriniz için lütfen baristamıza danışınız.'
              : 'Plant-based milks (oat, almond), decaf roasts, or dietary accommodations are happily prepared upon request.'}
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link
              href="/#location"
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#1c381c] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider hover:bg-[#284f28] transition-all shadow-md shadow-[#1c381c]/20"
            >
              {lang === 'tr' ? 'Bizi Ziyaret Et' : 'Visit Us'}
            </Link>
            <Link
              href="/"
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white border border-[#d8d2c4] text-[#1c2a1c] text-[11px] sm:text-xs font-semibold uppercase tracking-wider hover:bg-[#f6f4ee] transition-all"
            >
              {m.backToHome}
            </Link>
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button for Quick Mobile Navigation */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 sm:right-8 z-40 p-3 rounded-full bg-[#1c381c]/95 sm:bg-[#1c381c]/90 text-white shadow-lg sm:backdrop-blur-md active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#c8aa6e]/40 gpu-accelerated"
          aria-label={lang === 'tr' ? 'Yukarı Çık' : 'Scroll to Top'}
        >
          <ArrowUp className="w-5 h-5 text-[#f4eedb]" />
        </button>
      )}

      <Footer />
    </div>
  );
}

// ── Single Menu Item Card Component ──────────────────────────────────
function MenuItemCard({
  item,
  lang,
}: {
  item: {
    id: string;
    name: string;
    desc: string;
    price: string;
    tag?: string;
    image?: string;
    available?: boolean;
  };
  lang: 'tr' | 'en';
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isAvailable = item.available !== false;
  const tagStyle = item.tag ? tagStyles[item.tag] : null;

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [item.id, item.image]);

  return (
    <div
      className={`group relative bg-white border border-[#e8e4da] rounded-2xl p-2.5 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-[#1c2a1c]/5 hover:border-[#c8aa6e]/60 flex flex-col justify-between gpu-accelerated ${
        !isAvailable ? 'opacity-60 bg-[#f9f8f5]' : ''
      }`}
    >
      <div>
        {/* Item Image with Default Cafe Logo as Base */}
        <div className="relative w-full aspect-square mb-2.5 sm:mb-4 rounded-xl overflow-hidden bg-[#0d1c0d]">
          {/* Default Layer: Official Botaniqa Cafe Logo (Always instantly displayed) */}
          <Image
            src="/botaniqa-logo.webp"
            alt="Botaniqa Café"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Product Image Layer (Fades in over cafe logo when loaded) */}
          {item.image && !imgError && (
            <Image
              src={item.image}
              alt={item.name}
              fill
              unoptimized={item.image.includes('urfamenu.com') || item.image.startsWith('data:')}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`object-cover group-hover:scale-105 transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Top Header Row: Name & Tag */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3 mb-1 sm:mb-2">
          <h3 className="font-serif text-xs sm:text-lg md:text-xl font-medium text-[#1c2a1c] group-hover:text-[#c1713a] transition-colors leading-snug line-clamp-2">
            {item.name}
          </h3>

          {item.tag && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-semibold border flex-shrink-0 self-start ${tagStyle
                ? `${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`
                : 'bg-[#f4efe6] text-[#6d5a45] border-[#e4ded0]'
                }`}
            >
              {tagStyle?.dot && (
                <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${tagStyle.dot}`} />
              )}
              <span>{item.tag}</span>
            </span>
          )}
        </div>

        {/* Description */}
        {item.desc && (
          <p className="hidden xs:line-clamp-1 sm:line-clamp-2 text-[10px] sm:text-sm text-[#5f745f] leading-relaxed font-light mb-1.5 sm:mb-4">
            {item.desc}
          </p>
        )}
      </div>

      {/* Bottom Row: Price & Availability */}
      <div className="pt-1.5 sm:pt-3 border-t border-[#f0ebe0] flex items-center justify-between gap-1">
        <div>
          <span className="font-serif text-sm sm:text-xl font-bold text-[#1c381c]">
            {item.price}
          </span>
        </div>

        {!isAvailable && (
          <span className="text-[8px] sm:text-[11px] font-semibold text-stone-500 bg-stone-100 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-stone-200 shrink-0">
            {lang === 'tr' ? 'Tükendi' : 'Unavailable'}
          </span>
        )}
      </div>
    </div>
  );
}
