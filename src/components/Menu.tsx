'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Coffee, Cake, Flame, Citrus } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';

export default function Menu() {
  const { lang } = useLang();
  const { data: cafeData } = useCafeData();

  const totalItemsCount = cafeData?.menu?.length || 144;
  const totalCategoriesCount = cafeData?.categories?.length || 13;

  const highlights = [
    {
      id: 'coffee',
      icon: Coffee,
      titleTr: 'Yöresel & Dünya Kahveleri',
      titleEn: 'Local & World Coffees',
      descTr: 'Türk kahvesi, cold brew, süvari ve zengin filtre kahve çeşitleri.',
      descEn: 'Traditional Turkish coffee, 20-hr cold brew, and specialty pour-overs.',
      countTr: '27 Çeşit',
      countEn: '27 Items',
      priceTr: "₺100'den başlayan",
      priceEn: 'From ₺100',
      image: '/images/menu/coffee.webp',
      badgeTr: 'Popüler',
      badgeEn: 'Popular',
    },
    {
      id: 'pastries',
      icon: Cake,
      titleTr: 'Pastalar & Sütlü Tatlılar',
      titleEn: 'Artisan Pastries & Cakes',
      descTr: 'Fıstık Rüyası, fırın sütlaç, magnolya ve günlük taze tatlılar.',
      descEn: 'Signature pistachio cakes, traditional baked rice pudding, and fresh pastries.',
      countTr: '13 Çeşit',
      countEn: '13 Items',
      priceTr: "₺200'den başlayan",
      priceEn: 'From ₺200',
      image: '/images/menu/pastries.webp',
      badgeTr: 'İmza Tatlar',
      badgeEn: 'Signature',
    },
    {
      id: 'cold-drinks',
      icon: Citrus,
      titleTr: 'Frozen, Smoothie & İçecekler',
      titleEn: 'Frozens, Smoothies & Teas',
      descTr: 'Taze meyve frozenları, detoks içecekler ve botanik bitki çayları.',
      descEn: 'Fresh fruit frozens, natural smoothies, and soothing mountain herbal teas.',
      countTr: '38 Çeşit',
      countEn: '38 Items',
      priceTr: "₺120'den başlayan",
      priceEn: 'From ₺120',
      image: '/images/menu/cold-drinks.webp',
      badgeTr: 'Ferahlatıcı',
      badgeEn: 'Refreshing',
    },
    {
      id: 'nargile',
      icon: Flame,
      titleTr: 'Nargile & Özel Karışımlar',
      titleEn: 'Hookah & Premium Blends',
      descTr: '28 farklı tütün aroması, meyveli karışımlar ve özel sunumlar.',
      descEn: '28 distinct aromatic blends, fresh fruit infusions, and specialty presentations.',
      countTr: '28 Çeşit',
      countEn: '28 Items',
      priceTr: '₺300',
      priceEn: '₺300',
      image: '/images/menu/nargile.webp',
      badgeTr: 'Özel Seri',
      badgeEn: 'Special Series',
    },
  ];

  return (
    <section id="menu" className="relative pt-12 pb-20 sm:py-28 bg-[#0d180d] text-white overflow-hidden">
      {/* Ambient background glows (zero-blur radial shader) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(193,113,58,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[300px] bg-[radial-gradient(ellipse,rgba(45,90,45,0.22)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e341e] border border-[#2d4e2d] text-[#e0cfbe] text-xs font-semibold tracking-wider uppercase mb-4 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a97a]" />
            <span>03 / {lang === 'tr' ? 'Dijital Menü' : 'Digital Menu'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4efe6] mb-4">
            {lang === 'tr' ? (
              <>
                Zanaatkar Kahveler, <br className="hidden sm:inline" />
                <span className="text-[#e8a97a] font-serif italic">İmza Tatlar</span> & Lezzetler
              </>
            ) : (
              <>
                Artisan Coffees, <br className="hidden sm:inline" />
                <span className="text-[#e8a97a] font-serif italic">Signature Treats</span> & Flavors
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#9eb59e] leading-relaxed">
            {lang === 'tr'
              ? `Geleneksel Türk kahvesinden dünya kahvelerine, taze meyve frozenlarından imza tatlılara kadar ${totalCategoriesCount} kategoride ${totalItemsCount} zengin lezzet seçkisi.`
              : `From authentic Turkish roasts to world pour-overs, fresh fruit frozens, and signature pastries across ${totalCategoriesCount} categories with ${totalItemsCount} items.`}
          </p>
        </div>

        {/* 4 Featured Category Teasers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12 sm:mb-14">
          {highlights.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href="/menu"
                className="group relative bg-[#132213] border border-[#243c24] hover:border-[#c1713a]/70 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#c1713a]/10 overflow-hidden gpu-accelerated"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative w-full h-32 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-black/40 border border-[#284428]">
                    <Image
                      src={card.image}
                      alt={lang === 'tr' ? card.titleTr : card.titleEn}
                      fill
                      priority={idx < 2}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#132213]/90 text-[#f0caa8] border border-[#c1713a]/30">
                        {lang === 'tr' ? card.badgeTr : card.badgeEn}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold bg-white text-[#132213] shadow-md font-mono">
                        {lang === 'tr' ? card.countTr : card.countEn}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8a97a] shrink-0" />
                    <h3 className="text-xs sm:text-base font-bold text-white tracking-tight group-hover:text-[#f0caa8] transition-colors line-clamp-1">
                      {lang === 'tr' ? card.titleTr : card.titleEn}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#8da68d] leading-relaxed line-clamp-2">
                    {lang === 'tr' ? card.descTr : card.descEn}
                  </p>
                </div>

                {/* Card Footer: Starting Price & Link hint */}
                <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-[#203620] flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-[#e8a97a] font-semibold">
                    {lang === 'tr' ? card.priceTr : card.priceEn}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#8da68d] group-hover:text-white transition-colors font-medium">
                    <span className="hidden xs:inline">{lang === 'tr' ? 'İncele' : 'View'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Central Call-to-Action Bar */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#172c17] via-[#1b341b] to-[#172c17] border border-[#2b4c2b] p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(193,113,58,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {lang === 'tr'
                ? 'Tüm Ürünleri, Fiyatları & Detayları Görün'
                : 'Browse All Products, Prices & Details'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9eb59e]">
              {lang === 'tr'
                ? 'Anlık arama, kategori filtreleri ve zengin fotoğraflarla hazırladığımız tam dijital menümüzü hemen keşfedin.'
                : 'Explore our full digital catalog with instant live search, category filters, and detailed photos.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#c1713a] hover:bg-[#ad602d] text-white text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] cursor-pointer"
              >
                <span>
                  {lang === 'tr'
                    ? `Tüm Menüyü İncele (${totalItemsCount} Ürün)`
                    : `Explore Full Menu (${totalItemsCount} Items)`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick feature pill tags */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#86a686]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a97a]" />
                {lang === 'tr' ? '13 Farklı Kategori' : '13 Categories'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {lang === 'tr' ? 'Günlük Taze Hazırlık' : 'Made Fresh Daily'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a97a]" />
                {lang === 'tr' ? 'QR & Masa Servisi' : 'QR & Table Service'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
