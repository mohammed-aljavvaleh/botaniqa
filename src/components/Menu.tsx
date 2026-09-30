'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, X, Layers } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';
import Logo from '@/components/Logo';

// Tag styles with rich botanical colors and indicator dots
const tagStyles: Record<string, { bg: string; dot: string }> = {
  // TR Tags
  'Çok Satan': {
    bg: 'bg-[#c1713a]/20 text-[#f5b892] border-[#c1713a]/40',
    dot: 'bg-[#e8a97a]',
  },
  'İmza': {
    bg: 'bg-[#4a7a4a]/25 text-[#a8d5a8] border-[#4a7a4a]/50',
    dot: 'bg-[#66b366]',
  },
  'Mevsimlik': {
    bg: 'bg-[#8b7355]/25 text-[#e0cfbe] border-[#8b7355]/50',
    dot: 'bg-[#d4b996]',
  },
  'Premium': {
    bg: 'bg-[#7a559e]/25 text-[#d9c5ee] border-[#7a559e]/50',
    dot: 'bg-[#b694dd]',
  },
  'Yerel': {
    bg: 'bg-[#3d6e3d]/30 text-[#b5e2b5] border-[#4a7a4a]/50',
    dot: 'bg-[#73c973]',
  },
  'Günün Özelliği': {
    bg: 'bg-[#b8860b]/25 text-[#fae19c] border-[#b8860b]/50',
    dot: 'bg-[#ffd700]',
  },
  'Yeni': {
    bg: 'bg-[#2d5a2d]/30 text-[#9fe69f] border-[#4a8a4a]/50',
    dot: 'bg-[#4ade80]',
  },
  // EN Tags
  'Bestseller': {
    bg: 'bg-[#c1713a]/20 text-[#f5b892] border-[#c1713a]/40',
    dot: 'bg-[#e8a97a]',
  },
  'Signature': {
    bg: 'bg-[#4a7a4a]/25 text-[#a8d5a8] border-[#4a7a4a]/50',
    dot: 'bg-[#66b366]',
  },
  'Seasonal': {
    bg: 'bg-[#8b7355]/25 text-[#e0cfbe] border-[#8b7355]/50',
    dot: 'bg-[#d4b996]',
  },
  'Local': {
    bg: 'bg-[#3d6e3d]/30 text-[#b5e2b5] border-[#4a7a4a]/50',
    dot: 'bg-[#73c973]',
  },
  'Daily Special': {
    bg: 'bg-[#b8860b]/25 text-[#fae19c] border-[#b8860b]/50',
    dot: 'bg-[#ffd700]',
  },
  'New': {
    bg: 'bg-[#2d5a2d]/30 text-[#9fe69f] border-[#4a8a4a]/50',
    dot: 'bg-[#4ade80]',
  },
};

export default function Menu() {
  const { t, lang } = useLang();
  const { data: cafeData } = useCafeData();
  const m = t.menu;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);

  // Dynamic categories from admin with fallback
  const dynamicCategories = useMemo(() => {
    return cafeData?.categories && cafeData.categories.length > 0
      ? cafeData.categories.map((c) => ({
          id: c.id,
          label: lang === 'tr' ? c.labelTr : c.labelEn || c.labelTr,
        }))
      : m.categories;
  }, [cafeData?.categories, lang, m.categories]);

  const [activeTab, setActiveTab] = useState(dynamicCategories[0]?.id || 'espresso');

  // Ensure activeTab is valid
  const currentTab = dynamicCategories.some((c) => c.id === activeTab)
    ? activeTab
    : dynamicCategories[0]?.id || 'espresso';

  // Dynamic menu items pool
  const allDynamicItems = cafeData?.menu || [];

  // Current category items (available only)
  const categoryItems = useMemo(() => {
    const fromAdmin = allDynamicItems.filter(
      (item) => item.category === currentTab && item.available !== false
    );

    if (fromAdmin.length > 0) {
      return fromAdmin.map((item) => ({
        id: item.id,
        category: item.category,
        name: lang === 'tr' ? item.nameTr : item.nameEn || item.nameTr,
        desc: lang === 'tr' ? item.descTr : item.descEn || item.descTr,
        price: item.price,
        tag: lang === 'tr' ? item.tagTr : item.tagEn || item.tagTr,
        image: item.image,
      }));
    }

    // Fallback to static items
    const staticItems = m.items[currentTab as keyof typeof m.items] ?? [];
    return staticItems.map((item, idx) => ({
      id: `fallback-${currentTab}-${idx}`,
      category: currentTab,
      name: item.name,
      desc: item.desc,
      price: item.price,
      tag: item.tag,
      image: undefined,
    }));
  }, [allDynamicItems, currentTab, lang, m.items]);

  // Filter items by search query and tag
  const filteredItems = useMemo(() => {
    let result = categoryItems;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc?.toLowerCase().includes(q) ||
          item.tag?.toLowerCase().includes(q)
      );
    }

    if (selectedTagFilter) {
      result = result.filter((item) => item.tag === selectedTagFilter);
    }

    return result;
  }, [categoryItems, searchQuery, selectedTagFilter]);

  // Unique tags in the current category
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    categoryItems.forEach((item) => {
      if (item.tag?.trim()) tags.add(item.tag.trim());
    });
    return Array.from(tags);
  }, [categoryItems]);

  return (
    <section id="menu" className="py-28 sm:py-36 bg-[#132313] text-[#fdf8f0] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4a7a4a]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#c1713a]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Atmospheric Top Hairline Divider */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14 sm:mb-18">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#385a38]/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Asymmetrical Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#a8d5a8] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#e8a97a]" />
              <span>02 / {m.label}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#fdf8f0] tracking-tight leading-[1.08] font-normal">
              {m.heading1}{' '}
              <span className="italic font-serif text-[#e8a97a] font-normal">
                {m.heading2}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[#a4cca4] text-base sm:text-lg leading-relaxed font-light max-w-md">
              {m.subheading}
            </p>
          </div>
        </div>

        {/* Dynamic Category Pill Tabs (Clean, text-only) */}
        <div className="flex justify-start sm:justify-center mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="p-1.5 rounded-full bg-[#1c331c]/90 border border-[#2e502e]/60 shadow-xl backdrop-blur-xl inline-flex items-center gap-1.5 sm:gap-2">
            {dynamicCategories.map((cat) => {
              const isSelected = currentTab === cat.id;
              const count = allDynamicItems.filter(
                (item) => item.category === cat.id && item.available !== false
              ).length;

              return (
                <button
                  key={cat.id}
                  id={`menu-tab-${cat.id}`}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setSelectedTagFilter(null);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#c1713a] to-[#d6854d] text-white shadow-lg shadow-[#c1713a]/30 font-semibold'
                      : 'text-[#a2c4a2] hover:text-white hover:bg-[#254225]/70'
                  }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-[#2b4c2b] text-[#86af86]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#729c72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'tr' ? 'Menüde ara (lezzet veya içerik)...' : 'Search menu items or ingredients...'}
              className="w-full bg-[#1a2e1a]/80 border border-[#2d4c2d] hover:border-[#416841] focus:border-[#c1713a] rounded-2xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#fdf8f0] placeholder-[#6b916b] outline-none transition-all shadow-inner backdrop-blur-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#729c72] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Tag Filter Pills */}
          {availableTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedTagFilter(null)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTagFilter === null
                    ? 'bg-[#2c4e2c] text-white border-[#457345]'
                    : 'bg-[#182918] text-[#86af86] border-[#294229] hover:bg-[#203620]'
                }`}
              >
                {lang === 'tr' ? 'Tümü' : 'All'}
              </button>
              {availableTags.map((tag) => {
                const isTagActive = selectedTagFilter === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedTagFilter(isTagActive ? null : tag)
                    }
                    className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors cursor-pointer ${
                      isTagActive
                        ? 'bg-[#c1713a] text-white border-[#c1713a]'
                        : 'bg-[#182918] text-[#86af86] border-[#294229] hover:bg-[#203620]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Menu Cards Grid with Organic Visual Rhythm */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const tagConfig = item.tag ? tagStyles[item.tag] : null;
            const isFeatured =
              item.tag &&
              (item.tag.includes('İmza') ||
                item.tag.includes('Signature') ||
                item.tag.includes('Çok Satan') ||
                item.tag.includes('Bestseller'));

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 overflow-hidden backdrop-blur-md ${
                  isFeatured
                    ? 'border border-[#c1713a]/40 bg-gradient-to-b from-[#1b311b]/95 to-[#122112]/95 shadow-[0_12px_36px_-12px_rgba(193,113,58,0.22)] hover:border-[#c1713a]/70 hover:shadow-[0_20px_48px_-15px_rgba(193,113,58,0.35)]'
                    : 'border border-[#274427]/70 bg-gradient-to-b from-[#172c17]/90 to-[#111f11]/95 hover:border-[#406840] hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Subtle top ambient glow on hover */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#c1713a]/0 group-hover:bg-[#c1713a]/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Card Visual: Either Real Photo OR Clean Botanical Badge */}
                  {item.image ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-black/40 border border-[#2d4c2d] shadow-inner">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Tag floating badge on photo */}
                      {item.tag?.trim() && (
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border backdrop-blur-md shadow-xs ${
                              tagConfig?.bg ||
                              'bg-black/60 text-white border-white/20'
                            }`}
                          >
                            {tagConfig?.dot && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${tagConfig.dot} animate-pulse`}
                              />
                            )}
                            <span>{item.tag}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Bespoke Botanical Emblem Placeholder */
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-[#2b492b]/70 bg-gradient-to-br from-[#1a331a] via-[#142614] to-[#0e1c0e] flex flex-col items-center justify-center p-4 text-center group-hover:border-[#c1713a]/40 transition-colors shadow-inner">
                      {/* Ambient background watermark dots */}
                      <div className="absolute inset-0 bg-[radial-gradient(#4a7a4a_1px,transparent_1px)] opacity-15 [background-size:12px_12px] pointer-events-none" />

                      {/* Tag floating badge on placeholder */}
                      {item.tag?.trim() && (
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border backdrop-blur-md shadow-xs ${
                              tagConfig?.bg ||
                              'bg-[#192b19]/80 text-[#8bbf8b] border-[#385638]'
                            }`}
                          >
                            {tagConfig?.dot && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${tagConfig.dot} animate-pulse`}
                              />
                            )}
                            <span>{item.tag}</span>
                          </span>
                        </div>
                      )}

                      {/* Botaniqa Brand Emblem */}
                      <Logo
                        variant="mark"
                        size={42}
                        className="mb-2 opacity-90 group-hover:scale-105 transition-transform duration-300"
                      />

                      <span className="text-[10px] tracking-widest uppercase font-mono font-medium text-[#76a076]/90">
                        botaniqa • Karaköprü
                      </span>
                    </div>
                  )}

                  {/* Item Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#fdf8f0] mb-2 group-hover:text-[#e8a97a] transition-colors font-medium tracking-tight">
                    {item.name}
                  </h3>

                  {/* Item Description */}
                  {item.desc?.trim() && (
                    <p className="text-[#96bc96] text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 font-light">
                      {item.desc}
                    </p>
                  )}
                </div>

                {/* Card Footer: Clean Price Presentation */}
                <div className="flex items-baseline justify-between pt-4 border-t border-[#264426]/70 mt-auto">
                  <span className="text-xs text-[#719871] font-medium tracking-wide">
                    {lang === 'tr' ? 'Fiyat' : 'Price'}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#e8a97a] tracking-tight">
                    {item.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#182b18]/60 rounded-3xl border border-[#2b4c2b] max-w-lg mx-auto p-8 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-[#264426] border border-[#3b623b] flex items-center justify-center mx-auto mb-3 text-[#a4cca4]">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-[#fdf8f0] mb-1 font-medium">
              {lang === 'tr' ? 'Ürün Bulunamadı' : 'No Items Found'}
            </h4>
            <p className="text-[#86af86] text-xs mb-4">
              {searchQuery || selectedTagFilter
                ? lang === 'tr'
                  ? 'Filtrenize uygun bir ürün bulunamadı. Lütfen arama teriminizi değiştirin.'
                  : 'No items match your active search or filter criteria.'
                : lang === 'tr'
                  ? 'Bu kategoride henüz aktif ürün bulunmuyor.'
                  : 'No active items in this category yet.'}
            </p>
            {(searchQuery || selectedTagFilter) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTagFilter(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-[#c1713a]/20"
              >
                {lang === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
              </button>
            )}
          </div>
        )}

        {/* Footer Note */}
        {m.note?.trim() && (
          <p className="text-center text-[#6e966e] text-xs sm:text-sm mt-12 italic tracking-wide">
            {m.note}
          </p>
        )}
      </div>

      {/* Atmospheric Bottom Hairline Divider */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-16 sm:mt-24">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#385a38]/60 to-transparent" />
      </div>
    </section>
  );
}
