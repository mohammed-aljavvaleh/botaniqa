'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'tr' | 'en';

export interface NavDay { day: string; time: string; }
export interface FooterLink { label: string; href: string; }
export interface Pillar { title: string; desc: string; }

export interface Translations {
  lang: Lang;
  nav: {
    about: string; menu: string; gallery: string;
    location: string; visitUs: string; location_sub: string;
  };
  hero: {
    badge: string; heading1: string; heading2: string; heading3: string;
    tagline: string; exploreCta: string; directionsCta: string; discover: string;
  };
  about: {
    label: string; heading1: string; heading2: string; intro: string;
    p1: string; p2: string; quote: string; quoteAuthor: string;
    rating: string; pillars: Pillar[];
  };
  menu: {
    label: string; heading1: string; heading2: string;
    subheading: string; note: string;
    viewFullMenu: string;
    viewFullMenuDesc: string;
    digitalMenu: string;
    allCategories: string;
    searchPlaceholder: string;
    noResults: string;
    backToHome: string;
    tableServiceNote: string;
    filterAll: string;
    highlights: string;
    highlightsSub: string;
  };
  gallery: {
    label: string; heading1: string; heading2: string;
    subheading: string; instagramCta: string; images: string[];
  };
  location: {
    label: string; heading1: string; heading2: string; subheading: string;
    openNow: string; closingSoon: string; closed: (time: string) => string;
    addressTitle: string; address: string; openInMaps: string;
    hoursTitle: string; hours: NavDay[];
    reservationsTitle: string; walkIns: string; getDirections: string;
  };
  footer: {
    tagline: string; explore: string; contact: string;
    instagram: string; email: string; phone: string; address: string;
    addressValue: string; copyright: string; madeWith: string;
    links: FooterLink[];
  };
}

// ── Turkish ───────────────────────────────────────────────────────
export const tr: Translations = {
  lang: 'tr',
  nav: {
    about: 'Hakkımızda', menu: 'Menü', gallery: 'Galeri',
    location: 'Konum', visitUs: 'Bizi Ziyaret Et',
    location_sub: 'Karaköprü, Şanlıurfa',
  },
  hero: {
    badge: 'Karaköprü, Şanlıurfa',
    heading1: 'Doğanın Buluştuğu Yer',
    heading2: 'Olağanüstü Kahve',
    heading3: "Şanlıurfa'da",
    tagline: "Özenle hazırlanmış içeceklerin, yemyeşil bitkilerin ve sıcak misafirperverliğin bir araya geldiği botanik bir sığınak.",
    exploreCta: 'Menüyü Keşfet',
    directionsCta: 'Yol Tarifi Al',
    discover: 'Keşfet',
  },
  about: {
    label: 'Hikâyemiz',
    heading1: 'Doğaya ve Sanata',
    heading2: 'Köklü Bir Sığınak',
    intro: "Doğal dünyaya duyulan derin bir sevgiden doğan botaniqa; sıradan bir kafenin çok ötesinde, Karaköprü'nün kalbinde yaşayan nefes alan bir botanik kaçış noktası olarak tasarlandı.",
    p1: "Kapılarımızdan içeri adım atın ve iç mekânın sınırlarının eridiği bir dünyaya girin. Açık ahşap kirişlerden sarkan sarmaşıklar, güneş ışığına dolu köşelerde kümelenen seramik saksılar ve havada taze öğütülmüş kahve ile kurutulmuş otların fısıltısı sizi karşılar.",
    p2: "botaniqa'daki her menü öğesi özenerek yaratılmıştır; tek kökenli pour-over kahvelerimizden, taze otlar ve elle sıkılmış narenciyeyle katmanlanan botanik mocktail'lerimize kadar. En güzel anların, iyi kahvenin güzel bir mekânla buluştuğunda yaşandığına inanıyoruz.",
    quote: '"Her fincan, toprakla kurulan bir söyleşidir."',
    quoteAuthor: '— botaniqa Ekibi',
    rating: "Şanlıurfa'da 5.0 Değerlendirme",
    pillars: [
      { title: 'Botanik Ruh', desc: "Sarkan sarmaşıklar, asılı eğreltiotu ve seramik saksılarla dolu duvarlar — her köşe nefes alıyor." },
      { title: 'Özel Kahve', desc: "Dünyadan özenle seçilen tek kökenli çekirdekler, niyetle demlenir ve sanatla sunulur." },
      { title: 'Sığınak Atmosferi', desc: "Yumuşak kehribar ışık, hafif müzik ve samimi sıcaklık — en sevdiğin kaçış seni bekliyor." },
    ],
  },
  menu: {
    label: 'Tekliflerimiz',
    heading1: 'BOTANIQA',
    heading2: 'Menüsü',
    subheading: 'Her ürün; niyet, mevsimsel malzeme ve lezzete derin bir saygıyla hazırlanır.',
    note: '* Fiyatlara KDV dahildir. Menü mevsime göre değişebilir.',
    viewFullMenu: 'Tüm Menüyü İncele',
    viewFullMenuDesc: 'Eksiksiz kahve çeşitlerimiz, botanik mocktail’lerimiz ve günlük taze pastalarımız.',
    digitalMenu: 'Dijital Menü',
    allCategories: 'Tüm Çeşitler',
    searchPlaceholder: 'Menüde ara... (örn: Matcha, Kruvasan, Cold Brew)',
    noResults: 'Aramanıza uygun lezzet bulunamadı.',
    backToHome: 'Ana Sayfaya Dön',
    tableServiceNote: 'Tüm ürünlerimiz taze hazırlanır. Masa servisi mevcuttur.',
    filterAll: 'Tümü',
    highlights: 'Öne Çıkan Seçkiler',
    highlightsSub: 'botaniqa’nın en sevilen zanaatkar kahveleri ve imza tatları.',
  },
  gallery: {
    label: 'Görsel Yolculuk',
    heading1: "Botaniqa'da",
    heading2: 'Yaşam',
    subheading: 'Dünyamıza bir bakış — her köşe bir kompozisyon.',
    instagramCta: "@botaniqa.coffee'yı Instagram'da Takip Et",
    images: [
      'Asılı bitkiler ve Edison ampulleriyle botaniqa iç mekanı',
      'Botanik kurulumla pour-over kahve',
      'Seramik tabakta zanaatkâr kruvasan ve macaron',
      "Çiçek süslemeli canlı imza mocktail'ler",
      'Yenilebilir çiçeklerle botanik avokado tostu',
      'Yeşil minderler ve mum ışığıyla sıcak köşe',
    ],
  },
  location: {
    label: 'Bizi Bulun',
    heading1: 'Bizi',
    heading2: 'Ziyaret Edin',
    subheading: "Karaköprü'nün kalbinde sakin bir yeşil sığınak.",
    openNow: 'Şu an açık',
    closingSoon: 'Yakında kapanıyor',
    closed: (time: string) => `${time}'de açılıyor`,
    addressTitle: 'Adres',
    address: 'Karaköprü Mahallesi\nŞanlıurfa, Türkiye 63200',
    openInMaps: "Google Maps'te Aç",
    hoursTitle: 'Çalışma Saatleri',
    hours: [
      { day: 'Pazartesi – Perşembe', time: '08:00 – 22:00' },
      { day: 'Cuma', time: '08:00 – 23:00' },
      { day: 'Cumartesi', time: '09:00 – 23:30' },
      { day: 'Pazar', time: '09:00 – 22:00' },
    ],
    reservationsTitle: 'Rezervasyon',
    walkIns: 'Rezervasyonsuz müşteriler her zaman hoş karşılanır',
    getDirections: 'Yol Tarifi Al',
  },
  footer: {
    tagline: "Karaköprü, Şanlıurfa'da üst düzey bir botanik kafe sığınağı. Doğanın olağanüstü kahveyle buluştuğu yer.",
    explore: 'Keşfet', contact: 'İletişim',
    instagram: 'Instagram', email: 'E-posta', phone: 'Telefon', address: 'Adres',
    addressValue: "Karaköprü, Şanlıurfa\nTürkiye",
    copyright: 'Tüm hakları saklıdır.',
    madeWith: "Şanlıurfa'da",
    links: [
      { label: 'Hakkımızda', href: '/#about' },
      { label: 'Menü', href: '/menu' },
      { label: 'Galeri', href: '/#gallery' },
      { label: 'Konum', href: '/#location' },
    ],
  },
};

// ── English ───────────────────────────────────────────────────────
export const en: Translations = {
  lang: 'en',
  nav: {
    about: 'About', menu: 'Menu', gallery: 'Gallery',
    location: 'Location', visitUs: 'Visit Us',
    location_sub: 'Karaköprü, Şanlıurfa',
  },
  hero: {
    badge: 'Karaköprü, Şanlıurfa',
    heading1: 'Where Nature Meets',
    heading2: 'Exceptional Coffee',
    heading3: 'in Şanlıurfa',
    tagline: 'A botanical sanctuary where handcrafted beverages, lush greenery, and warm hospitality converge.',
    exploreCta: 'Explore Menu',
    directionsCta: 'Get Directions',
    discover: 'Discover',
  },
  about: {
    label: 'Our Story',
    heading1: 'A Sanctuary Rooted in',
    heading2: 'Nature & Craft',
    intro: "Born from a deep love for the natural world, botaniqa was conceived as more than a café — it's a living, breathing botanical retreat in the heart of Karaköprü.",
    p1: "Step through our doors and into a world where the boundaries between indoors and outdoors dissolve. Trailing vines cascade from exposed wooden beams, terracotta planters cluster in sunlit corners, and the air carries a whisper of ground coffee and dried herbs.",
    p2: "Every menu item at botaniqa is a considered creation — from our single-origin pour-overs to our botanical mocktails layered with garden-fresh herbs and hand-pressed citrus. We believe the best moments happen when good coffee meets a beautiful place.",
    quote: '"Every cup is a conversation with the earth."',
    quoteAuthor: '— the botaniqa team',
    rating: 'Rated 5.0 in Şanlıurfa',
    pillars: [
      { title: 'Botanical Soul', desc: 'Walls alive with trailing ivy, hanging ferns, and terracotta pots — every corner breathes.' },
      { title: 'Specialty Coffee', desc: 'Single-origin beans sourced globally, brewed with intention and poured with artistry.' },
      { title: 'Sanctuary Vibes', desc: 'Soft amber light, gentle music, and welcoming warmth — your favourite escape awaits.' },
    ],
  },
  menu: {
    label: 'Our Offerings',
    heading1: 'BOTANIQA',
    heading2: 'Menu',
    subheading: 'Every item is made with intention, seasonal ingredients, and a deep respect for flavour.',
    note: '* Prices are inclusive of VAT. Menu subject to seasonal changes.',
    viewFullMenu: 'Explore Full Menu',
    viewFullMenuDesc: 'Our complete collection of specialty coffees, botanical mocktails, and fresh artisan pastries.',
    digitalMenu: 'Digital Menu',
    allCategories: 'All Categories',
    searchPlaceholder: 'Search menu... (e.g., Matcha, Croissant, Cold Brew)',
    noResults: 'No items found matching your search.',
    backToHome: 'Back to Home',
    tableServiceNote: 'All items are handcrafted to order. Table service available.',
    filterAll: 'All',
    highlights: 'Signature Highlights',
    highlightsSub: 'A curated preview of botaniqa’s most celebrated artisan creations.',
  },
  gallery: {
    label: 'Visual Journey',
    heading1: 'Life at',
    heading2: 'Botaniqa',
    subheading: 'A glimpse into our world — where every corner is a composition.',
    instagramCta: 'Follow @botaniqa.coffee on Instagram',
    images: [
      'botaniqa interior with hanging plants and Edison bulbs',
      'Pour over coffee with botanical setup',
      'Artisan croissant and macaron on ceramic plate',
      'Vibrant signature mocktails with floral garnishes',
      'Botanical avocado toast with edible flowers',
      'Cozy nook with green cushions and candlelight',
    ],
  },
  location: {
    label: 'Find Us',
    heading1: 'Come',
    heading2: 'Visit Us',
    subheading: 'Nestled in the heart of Karaköprü — a tranquil green escape from the city.',
    openNow: 'Open now',
    closingSoon: 'Closing soon',
    closed: (time: string) => `Opens at ${time}`,
    addressTitle: 'Address',
    address: 'Karaköprü Mahallesi\nŞanlıurfa, Turkey 63200',
    openInMaps: 'Open in Google Maps',
    hoursTitle: 'Opening Hours',
    hours: [
      { day: 'Monday – Thursday', time: '08:00 – 22:00' },
      { day: 'Friday', time: '08:00 – 23:00' },
      { day: 'Saturday', time: '09:00 – 23:30' },
      { day: 'Sunday', time: '09:00 – 22:00' },
    ],
    reservationsTitle: 'Reservations',
    walkIns: 'Walk-ins always welcome',
    getDirections: 'Get Directions',
  },
  footer: {
    tagline: 'An upscale botanical café sanctuary in Karaköprü, Şanlıurfa. Where nature meets exceptional coffee.',
    explore: 'Explore', contact: 'Get In Touch',
    instagram: 'Instagram', email: 'Email', phone: 'Phone', address: 'Address',
    addressValue: 'Karaköprü, Şanlıurfa\nTurkey',
    copyright: 'All rights reserved.',
    madeWith: 'in Şanlıurfa',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Menu', href: '/menu' },
      { label: 'Gallery', href: '/#gallery' },
      { label: 'Location', href: '/#location' },
    ],
  },
};

// ── Context ───────────────────────────────────────────────────────
type LanguageContextType = {
  t: Translations;
  lang: Lang;
  toggle: () => void;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  t: tr,
  lang: 'tr',
  toggle: () => { },
  setLang: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('tr');
  const t = lang === 'tr' ? tr : en;
  const toggle = () => setLang((l) => (l === 'tr' ? 'en' : 'tr'));
  return (
    <LanguageContext.Provider value={{ t, lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
