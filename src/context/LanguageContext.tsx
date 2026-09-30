'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'tr' | 'en';

// ── Shared shape (all strings, no literal narrowing) ──────────────
export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}
export interface NavDay { day: string; time: string; }
export interface FooterLink { label: string; href: string; }
export interface Pillar { title: string; desc: string; }
export interface MenuCategory { id: string; label: string; }
export interface MenuItems {
  espresso: MenuItem[];
  mocktails: MenuItem[];
  teas: MenuItem[];
  pastries: MenuItem[];
}

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
    categories: MenuCategory[];
    items: MenuItems;
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
    heading1: 'botaniqa',
    heading2: 'Menüsü',
    subheading: 'Her ürün; niyet, mevsimsel malzeme ve lezzete derin bir saygıyla hazırlanır.',
    note: '* Fiyatlara KDV dahildir. Menü mevsime göre değişebilir.',
    categories: [
      { id: 'espresso', label: 'Espresso Bar' },
      { id: 'mocktails', label: "Özel Mocktail'ler" },
      { id: 'teas', label: 'İmza Çaylar' },
      { id: 'pastries', label: 'Taze Pastalar' },
    ],
    items: {
      espresso: [
        { name: 'botaniqa İmza Latte', desc: 'Çift ristretto, yulaf sütü, kakule ve gülden ipuçlarıyla ev yapımı botanik şurup', price: '₺120', tag: 'Çok Satan' },
        { name: 'Orman Cappuccino', desc: 'Kadifemsi mikro-köpük, tek kökenli Etiyopya espresso, bitter kakao ile toz şeker', price: '₺110' },
        { name: 'Cortado Noir', desc: 'Eşit oranda espresso ve sıcak ipeksi buharlanmış süt, seramik bardakta servis edilir', price: '₺95' },
        { name: 'Cold Brew Rezerv', desc: '20 saatlik soğuk demleme, kristal buz üzerinde bir kabuk narenciyesiyle sunulur', price: '₺130', tag: 'Mevsimlik' },
        { name: 'Affogato Verde', desc: 'Kremalı vanilyalı dondurmanın üzerine dökülen zengin espresso, ezilmiş antep fıstığıyla', price: '₺145' },
        { name: 'Flat White', desc: 'Hassasiyetle dökülen ristretto, ipeksi buharlı tam yağlı süt, lale latte art', price: '₺105' },
      ],
      mocktails: [
        { name: 'Bahçe Elixir', desc: 'Salatalık, taze nane, limon, maden suyu ve üzerinde yüzen mürver çiçeği şurubu', price: '₺95', tag: 'Çok Satan' },
        { name: 'Botanik Gün Batımı', desc: 'Passion fruit, mango püresi, zencefilli bira, yenilebilir viola süslemesiyle', price: '₺110' },
        { name: 'Gül & Meyve Spritz', desc: 'Hibiskus, karışık meyveler, gül suyu, soda, kurutulmuş gül yapraklarıyla', price: '₺100', tag: 'İmza' },
        { name: 'Narenciye Ormanı', desc: 'Kan portakalı, taze fesleğen, agave, kırık buz üzerinde tonik su', price: '₺105' },
        { name: 'Karpuz & Adaçayı', desc: 'Taze sıkılmış karpuz, adaçayı şurubu, limon, maden suyu', price: '₺95' },
        { name: 'Demirhindi Soğuğu', desc: 'Urfa lezzetlerine selam — demirhindi, acı-lime tuzu, taze nane, maden suyu', price: '₺110', tag: 'Yerel' },
      ],
      teas: [
        { name: "Botanist'in Harmanı", desc: 'Papatya, lavanta, limon melisası ve porsuk çiçeği — ev yapımı sakinleştirici harmanımız', price: '₺85', tag: 'Çok Satan' },
        { name: 'Baharatlı Chai Pot', desc: 'Loose-leaf Assam, kakule, tarçın, zencefil, karanfil — seramik çaydanlıkta sunulur', price: '₺90' },
        { name: 'Jade Matcha Ritüel', desc: 'Tökezlemeye köpürtülmüş seremoni kalitesinde matcha, yulaf sütüyle birlikte', price: '₺120', tag: 'Premium' },
        { name: 'Gül Bahçesi Beyaz Çay', desc: "Fujian'dan ince beyaz çay, kurutulmuş gül yaprakları, hafif ve efsanevi", price: '₺95' },
        { name: 'Urfa Ot İnfüzyonu', desc: 'Urfa yaylalarından yabani kekik, adaçayı ve dağ otları, sıcak servis edilir', price: '₺80', tag: 'Yerel' },
        { name: 'Gece Yarısı Oolong', desc: "Kavrulmuş fındık ve bal notalarıyla koyu oolong, öğleden sonra 3'ten sonra en iyi", price: '₺100' },
      ],
      pastries: [
        { name: 'Bademli Kruvasan', desc: 'İki kez pişirilmiş, frangipane dolgulu, pudra şekeri ve dilimlenmiş bademlerle', price: '₺85', tag: 'Çok Satan' },
        { name: 'Fıstıklı Düğüm', desc: 'Türk antep fıstığı kreması ve bal sırıyla bükülmüş tereyağlı mayalı hamur', price: '₺90', tag: 'İmza' },
        { name: 'Matcha Financier', desc: 'Seremoni kalitesinde matcha ile narin Fransız badem keki, nemli ve aromatik', price: '₺80' },
        { name: 'Çikolatalı Tahin Brownie', desc: 'Susam girdaplı yoğun ve fudge brownie, gevrek Maldon tuzu ile', price: '₺95' },
        { name: 'Lavanta Kurabiyeleri', desc: 'Mutfak lavantası ve limon kabuğuyla zenginleştirilmiş İskoç tereyağlı kurabiye', price: '₺70' },
        { name: 'Mevsim Tartu', desc: 'Tereyağlı pâte sablée tabanında her gün değişen meyveli ya da kremalı tart', price: '₺110', tag: 'Günün Özelliği' },
      ],
    },
  },
  gallery: {
    label: 'Görsel Yolculuk',
    heading1: "botaniqa'da",
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
      { label: 'Hakkımızda', href: '#about' },
      { label: 'Menü', href: '#menu' },
      { label: 'Galeri', href: '#gallery' },
      { label: 'Konum', href: '#location' },
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
    heading1: 'the botaniqa',
    heading2: 'Menu',
    subheading: 'Every item is made with intention, seasonal ingredients, and a deep respect for flavour.',
    note: '* Prices are inclusive of VAT. Menu subject to seasonal changes.',
    categories: [
      { id: 'espresso', label: 'Espresso Bar' },
      { id: 'mocktails', label: 'Specialty Mocktails' },
      { id: 'teas', label: 'Signature Teas' },
      { id: 'pastries', label: 'Fresh Pastries' },
    ],
    items: {
      espresso: [
        { name: 'botaniqa Signature Latte', desc: 'Double ristretto, oat milk, house botanical syrup with hints of cardamom and rose', price: '₺120', tag: 'Bestseller' },
        { name: 'Forest Cappuccino', desc: 'Velvety micro-foam, single-origin Ethiopian espresso, dusted with dark cacao', price: '₺110' },
        { name: 'Cortado Noir', desc: 'Equal parts espresso and warm silky steamed milk, served in a ceramic glass', price: '₺95' },
        { name: 'Cold Brew Reserve', desc: '20-hour cold steep, served over crystal ice with a citrus peel', price: '₺130', tag: 'Seasonal' },
        { name: 'Affogato Verde', desc: 'Rich espresso poured over creamy vanilla gelato, finished with crushed pistachios', price: '₺145' },
        { name: 'Flat White', desc: 'Precision-poured ristretto with silky steamed whole milk, tulip latte art', price: '₺105' },
      ],
      mocktails: [
        { name: 'Garden Elixir', desc: 'Cucumber, fresh mint, lemon, sparkling water, and a float of elderflower cordial', price: '₺95', tag: 'Bestseller' },
        { name: 'Botanical Sunset', desc: 'Passionfruit, mango purée, ginger beer, edible viola garnish', price: '₺110' },
        { name: 'Rose & Berry Spritz', desc: 'Hibiscus, mixed berries, rose water, soda, with dried rose petals', price: '₺100', tag: 'Signature' },
        { name: 'Citrus Forest', desc: 'Blood orange, fresh basil, agave, tonic water over crushed ice', price: '₺105' },
        { name: 'Watermelon Sage', desc: 'Fresh-pressed watermelon, sage syrup, lime, sparkling mineral water', price: '₺95' },
        { name: 'Tamarind Cooler', desc: 'A nod to Urfa flavours — tamarind, chili-lime salt, fresh mint, sparkling water', price: '₺110', tag: 'Local' },
      ],
      teas: [
        { name: "Botanist's Blend", desc: 'Chamomile, lavender, lemon balm, and calendula — our house calming blend', price: '₺85', tag: 'Bestseller' },
        { name: 'Spiced Chai Pot', desc: 'Loose-leaf Assam, cardamom, cinnamon, ginger, clove — served in a ceramic pot', price: '₺90' },
        { name: 'Jade Matcha Ritual', desc: 'Ceremonial grade matcha whisked to a froth, served with a side of oat milk', price: '₺120', tag: 'Premium' },
        { name: 'Rose Garden White Tea', desc: 'Delicate white tea from Fujian, petals of dried rose, light and ethereal', price: '₺95' },
        { name: 'Urfa Herb Infusion', desc: 'Wild thyme, sage, and mountain herbs from the Urfa highlands, served hot', price: '₺80', tag: 'Local' },
        { name: 'Midnight Oolong', desc: 'Dark roasted oolong with notes of toasted nuts and honey, best after 3pm', price: '₺100' },
      ],
      pastries: [
        { name: 'Almond Croissant', desc: 'Twice-baked, frangipane-filled, dusted with powdered sugar and flaked almonds', price: '₺85', tag: 'Bestseller' },
        { name: 'Pistachio Knot', desc: 'Buttery yeasted dough twisted with Turkish pistachio cream and honey glaze', price: '₺90', tag: 'Signature' },
        { name: 'Matcha Financier', desc: 'Delicate French almond cake with ceremonial matcha, moist and aromatic', price: '₺80' },
        { name: 'Chocolate Tahini Brownie', desc: 'Dense, fudgy brownie with sesame swirl and flaky Maldon salt', price: '₺95' },
        { name: 'Lavender Shortbread', desc: 'Scottish butter shortbread infused with culinary lavender and lemon zest', price: '₺70' },
        { name: 'Seasonal Tart', desc: 'Daily rotating fruit or cream tart on a buttery pâte sablée base', price: '₺110', tag: 'Daily Special' },
      ],
    },
  },
  gallery: {
    label: 'Visual Journey',
    heading1: 'Life at',
    heading2: 'botaniqa',
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
      { label: 'About', href: '#about' },
      { label: 'Menu', href: '#menu' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Location', href: '#location' },
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
  toggle: () => {},
  setLang: () => {},
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
