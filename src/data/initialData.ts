export interface CategoryData {
  id: string;
  labelTr: string;
  labelEn: string;
}

export interface MenuItemData {
  id: string;
  category: string;
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  price: string;
  tagTr?: string;
  tagEn?: string;
  image?: string;
  available?: boolean;
}

export interface GalleryItemData {
  id: string;
  slot?: number; // 1 to 6 (fixed slot)
  src: string;
  altTr: string;
  altEn: string;
  className?: string;
  aspectClass?: string;
  mobileFirst?: boolean;
}

export interface WorkingHourItem {
  id: string;
  dayTr: string;
  dayEn: string;
  time: string;
  openHour: number; // e.g. 8 for 08:00
  closeHour: number; // e.g. 22 for 22:00
}

export interface ContactData {
  phone: string;
  phoneRaw: string; // e.g. +905422979262
  phoneSecondary?: string;
  phoneSecondaryRaw?: string;
  email: string;
  addressTr: string;
  addressEn: string;
  mapsUrl: string;
  embedUrl: string;
}

export interface SocialsData {
  instagramHandle?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  whatsappUrl?: string;
  tiktokUrl?: string;
  twitterUrl?: string; // X
  facebookUrl?: string;
  youtubeUrl?: string;
  tripadvisorUrl?: string;
  googleMapsUrl?: string;
}

export interface AdminAuthData {
  username: string;
  passwordHash: string; // Plain or hashed string for verification
}

export interface HeroVideoData {
  url?: string;
  poster?: string;
  enabled?: boolean;
}

export interface CafeStoreData {
  categories?: CategoryData[];
  menu: MenuItemData[];
  hours: WorkingHourItem[];
  contact: ContactData;
  socials: SocialsData;
  gallery: GalleryItemData[];
  auth: AdminAuthData;
  heroVideo?: HeroVideoData;
  aboutImage?: string;
  aboutSecondaryImage?: string;
}

export const defaultCategories: CategoryData[] = [
  {
    "id": "nargile",
    "labelTr": "Nargile",
    "labelEn": "Hookah & Shisha"
  },
  {
    "id": "sicak-icecekler",
    "labelTr": "Sıcak İçecekler",
    "labelEn": "Hot Beverages"
  },
  {
    "id": "yoresel-kahveler",
    "labelTr": "Yöresel Kahveler",
    "labelEn": "Traditional & Local Coffees"
  },
  {
    "id": "bitki-caylari",
    "labelTr": "Bitki Çayları",
    "labelEn": "Herbal Teas"
  },
  {
    "id": "taze-icecekler",
    "labelTr": "Vitamin & Taze İçecekler",
    "labelEn": "Fresh & Vitamin Drinks"
  },
  {
    "id": "soguk-icecekler",
    "labelTr": "Soğuk İçecekler",
    "labelEn": "Cold Beverages"
  },
  {
    "id": "soguk-kahveler",
    "labelTr": "Soğuk Kahveler",
    "labelEn": "Iced Coffees"
  },
  {
    "id": "dunya-kahveleri",
    "labelTr": "Dünya Kahveleri",
    "labelEn": "Specialty World Coffees"
  },
  {
    "id": "yemekler",
    "labelTr": "Yemekler",
    "labelEn": "Main Dishes & Food"
  },
  {
    "id": "tatlilar",
    "labelTr": "Pastalar & Tatlılar",
    "labelEn": "Cakes & Desserts"
  },
  {
    "id": "mesrubatlar",
    "labelTr": "Meşrubatlar",
    "labelEn": "Soft Drinks"
  },
  {
    "id": "ekstralar",
    "labelTr": "Ekstralar",
    "labelEn": "Extras"
  },
  {
    "id": "dondurmalar",
    "labelTr": "Dondurmalar",
    "labelEn": "Ice Cream"
  }
];

export const initialCafeData: CafeStoreData = {
  aboutImage: '/cafe_interior.jpg',
  aboutSecondaryImage: '/gallery_1.jpg',
  auth: {
    username: 'bunyamin',
    passwordHash: 'botaniqa2024',
  },
  categories: defaultCategories,
  contact: {
    phone: '+90 542 297 92 62',
    phoneRaw: '+905422979262',
    phoneSecondary: '',
    phoneSecondaryRaw: '',
    email: '',
    addressTr: '50 metre yolu üzeri Cadının evi yukarısı',
    addressEn: '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Botaniqa+Cafe+Karakopru+Sanliurfa+Turkey',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5815.513985989682!2d38.81199891281124!3d37.23321390805891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15347beaec888aeb%3A0x47db6777a30b7a43!2sBotanica%20Cafe-Botanik!5e1!3m2!1sen!2sus!4v1790779030414!5m2!1sen!2sus',
  },
  socials: {
    instagramHandle: '@botaniqa.coffee',
    instagramUrl: 'https://instagram.com/botaniqa.coffee',
    whatsappNumber: '+90 542 297 92 62',
    whatsappUrl: '',
    tiktokUrl: 'https://www.tiktok.com/@botaniqa.coffee?_r=1&_t=ZS-9AAwyQLRckJ',
    twitterUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    tripadvisorUrl: '',
    googleMapsUrl: 'https://maps.app.goo.gl/ZviCM2js2bHiWS7cA',
  },
  heroVideo: {
    url: '/uploads/1790808304676-Botaniqa_Cafe_Olarak_Ac__k_Havan_n_Oyun_Keyfinin_Tad_n__C__karman_z_I_c_in_Sizleri_Botaniqa_Cafeye_B.mp4',
    poster: '',
    enabled: true,
  },
  gallery: [
    {
      id: 'slot-1',
      slot: 1,
      src: '/uploads/1790797253480-IMG_2096_2.webp',
      altTr: "Doğayla iç içe olun. Botaniqa Cafe'de açık havanın huzurunun mükemmel kahveyle buluştuğu terasımızda yerinizi alın.",
      altEn: "Immerse yourself in nature. Join us outdoors at Botaniqa Cafe, where exceptional coffee meets the tranquility of the open air",
    },
    {
      id: 'slot-2',
      slot: 2,
      src: '/uploads/1790806275564-IMG_2094.webp',
      altTr: 'Tüm pasta çeşitleriyle Botaniqa cafe olarak acik havanin oyun keyfinin tadını çıkarmanız için sizleri Botaniqa cafeye bekleriz...',
      altEn: 'We invite you to Botaniqa Cafe to enjoy the open air and the fun of playing games, accompanied by our wide variety of cakes.',
    },
    {
      id: 'slot-3',
      slot: 3,
      src: '/uploads/1790806284190-IMG_2099.webp',
      altTr: 'Botaniqa Cafe olarak açık Havanın nargilenin ve oyun keyfinin tadını Çıkarmanız için sizleri Botaniqa Cafeye bekleriz...',
      altEn: 'At Botaniqa Cafe, we invite you to come and enjoy the open air, hookah, and gaming fun...',
    },
    {
      id: 'slot-4',
      slot: 4,
      src: '/uploads/1790797546785-IMG_2098.webp',
      altTr: 'Botaniqa Cafe olarak açık Havanın nargilenin ve oyun keyfinin tadını Çıkarmanız için sizleri Botaniqa Cafeye bekleriz...',
      altEn: 'At Botaniqa Cafe, we invite you to come and enjoy the open air, hookah, and gaming fun...',
    },
    {
      id: 'slot-5',
      slot: 5,
      src: '/uploads/1790797806543-IMG_2097.webp',
      altTr: 'botaniqa Deneyimi',
      altEn: 'botaniqa Experience',
    },
    {
      id: 'slot-6',
      slot: 6,
      src: '/uploads/1790857414342-WhatsApp_Image_2026-10-01_at_12.38.43_PM.webp',
      altTr: 'Geleneksel Türk Kahvesi ve Lokum Keyfi — Botaniqa Cafe',
      altEn: 'Traditional Turkish Coffee and Turkish Delight Experience — Botaniqa Cafe',
    },
    {
      id: 'slot-7',
      slot: 7,
      src: '/uploads/1790857402308-WhatsApp_Image_2026-10-01_at_12.38.43_PM__6_.webp',
      altTr: 'Botaniqa Açık Hava Bahçe Terası ve Sıcak Işıklar',
      altEn: 'Botaniqa Open-Air Garden Terrace and Warm Lights',
    },
  ],
  hours: [
    {
      id: 'h1',
      dayTr: 'Pazartesi – Perşembe',
      dayEn: 'Monday – Thursday',
      time: '08:00 – 22:00',
      openHour: 8,
      closeHour: 22,
    },
    {
      id: 'h2',
      dayTr: 'Cuma',
      dayEn: 'Friday',
      time: '08:00 – 23:00',
      openHour: 8,
      closeHour: 23,
    },
    {
      id: 'h3',
      dayTr: 'Cumartesi',
      dayEn: 'Saturday',
      time: '09:00 – 23:30',
      openHour: 9,
      closeHour: 23.5,
    },
    {
      id: 'h4',
      dayTr: 'Pazar',
      dayEn: 'Sunday',
      time: '09:00 – 22:00',
      openHour: 9,
      closeHour: 22,
    },
  ],
  menu: [
  {
    "id": "nargile-1",
    "category": "nargile",
    "nameTr": "Nargile Anason",
    "nameEn": "Nargile Anason",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd500de2956.47727701.jpg",
    "available": true
  },
  {
    "id": "nargile-2",
    "category": "nargile",
    "nameTr": "Nargile Dondurma",
    "nameEn": "Nargile Dondurma",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd50aacfab1.54487209.jpg",
    "available": true
  },
  {
    "id": "nargile-3",
    "category": "nargile",
    "nameTr": "Nargile Bisküvi",
    "nameEn": "Nargile Bisküvi",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd514a92f89.54690259.jpg",
    "available": true
  },
  {
    "id": "nargile-4",
    "category": "nargile",
    "nameTr": "Nargile Dejavu",
    "nameEn": "Nargile Dejavu",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd51fd77911.85664617.jpg",
    "available": true
  },
  {
    "id": "nargile-5",
    "category": "nargile",
    "nameTr": "Nargile Pink",
    "nameEn": "Nargile Pink",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd52f8dc6a2.27872650.jpg",
    "available": true
  },
  {
    "id": "nargile-6",
    "category": "nargile",
    "nameTr": "Nargile Barbiy",
    "nameEn": "Nargile Barbiy",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd53c2e58a1.29427294.jpg",
    "available": true
  },
  {
    "id": "nargile-7",
    "category": "nargile",
    "nameTr": "Nargile Limon",
    "nameEn": "Nargile Limon",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd5441169e3.53639361.jpg",
    "available": true
  },
  {
    "id": "nargile-8",
    "category": "nargile",
    "nameTr": "Nargile Üzüm",
    "nameEn": "Nargile Üzüm",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd5503fdcd0.82551285.jpg",
    "available": true
  },
  {
    "id": "nargile-9",
    "category": "nargile",
    "nameTr": "Nargile Honolulu",
    "nameEn": "Nargile Honolulu",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd557e6af73.64377952.jpg",
    "available": true
  },
  {
    "id": "nargile-10",
    "category": "nargile",
    "nameTr": "Nargile Moskova",
    "nameEn": "Nargile Moskova",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd561aee981.35327149.jpg",
    "available": true
  },
  {
    "id": "nargile-11",
    "category": "nargile",
    "nameTr": "Nargile İzmir",
    "nameEn": "Nargile İzmir",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd5e67c26d0.35896066.jpg",
    "available": true
  },
  {
    "id": "nargile-12",
    "category": "nargile",
    "nameTr": "Nargile Pişmiş Şeftali",
    "nameEn": "Nargile Pişmiş Şeftali",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd5f66ad1a0.74239988.jpg",
    "available": true
  },
  {
    "id": "nargile-13",
    "category": "nargile",
    "nameTr": "Nargile Low 66",
    "nameEn": "Nargile Low 66",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd604cb3087.28505114.jpg",
    "available": true
  },
  {
    "id": "nargile-14",
    "category": "nargile",
    "nameTr": "Nargile Merlin",
    "nameEn": "Nargile Merlin",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c24b4c97446.42314927.jpg",
    "available": true
  },
  {
    "id": "nargile-15",
    "category": "nargile",
    "nameTr": "Nargile Leydi",
    "nameEn": "Nargile Leydi",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c24c1c7ce72.64662931.jpg",
    "available": true
  },
  {
    "id": "nargile-16",
    "category": "nargile",
    "nameTr": "Nargile Nakla",
    "nameEn": "Nargile Nakla",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c24cd661e67.55852876.jpg",
    "available": true
  },
  {
    "id": "nargile-17",
    "category": "nargile",
    "nameTr": "Nargile Siweps",
    "nameEn": "Nargile Siweps",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2510955b58.43654847.jpg",
    "available": true
  },
  {
    "id": "nargile-18",
    "category": "nargile",
    "nameTr": "Nargile Excalibu",
    "nameEn": "Nargile Excalibu",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c251bf27d56.78523684.jpg",
    "available": true
  },
  {
    "id": "nargile-19",
    "category": "nargile",
    "nameTr": "Nargile Magic",
    "nameEn": "Nargile Magic",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2528d67f23.84991071.jpg",
    "available": true
  },
  {
    "id": "nargile-20",
    "category": "nargile",
    "nameTr": "Nargile Tarçın Sakız",
    "nameEn": "Nargile Tarçın Sakız",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c253743a449.41855660.jpg",
    "available": true
  },
  {
    "id": "nargile-21",
    "category": "nargile",
    "nameTr": "Nargile Kola",
    "nameEn": "Nargile Kola",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c25434d1cf1.35388800.jpg",
    "available": true
  },
  {
    "id": "nargile-22",
    "category": "nargile",
    "nameTr": "Nargile Karpuz",
    "nameEn": "Nargile Karpuz",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c25533339c3.81630007.jpg",
    "available": true
  },
  {
    "id": "nargile-23",
    "category": "nargile",
    "nameTr": "Nargile Çilek",
    "nameEn": "Nargile Çilek",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c255f5ab887.84840252.jpg",
    "available": true
  },
  {
    "id": "nargile-24",
    "category": "nargile",
    "nameTr": "Nargile Göbekli Tepe",
    "nameEn": "Nargile Göbekli Tepe",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c256b6bc5f5.08592717.jpg",
    "available": true
  },
  {
    "id": "nargile-25",
    "category": "nargile",
    "nameTr": "Nargile Cappy",
    "nameEn": "Nargile Cappy",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2575e7ea85.11032458.jpg",
    "available": true
  },
  {
    "id": "nargile-26",
    "category": "nargile",
    "nameTr": "Nargile Botanik Special",
    "nameEn": "Nargile Botanik Special",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c258b740730.54119396.jpg",
    "available": true
  },
  {
    "id": "nargile-27",
    "category": "nargile",
    "nameTr": "Nargile Nakla Capy",
    "nameEn": "Nargile Nakla Capy",
    "descTr": "",
    "descEn": "",
    "price": "₺350",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2597bc25c4.32478009.jpg",
    "available": true
  },
  {
    "id": "nargile-28",
    "category": "nargile",
    "nameTr": "Nargile Babayaga",
    "nameEn": "Nargile Babayaga",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c25ab012ab7.88542833.jpg",
    "available": true
  },
  {
    "id": "sicak-icecekler-1",
    "category": "sicak-icecekler",
    "nameTr": "Çay",
    "nameEn": "Çay",
    "descTr": "",
    "descEn": "",
    "price": "₺35",
    "tagTr": "Çok Satan",
    "tagEn": "Bestseller",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd64b01aa14.97618931.jpg",
    "available": true
  },
  {
    "id": "sicak-icecekler-2",
    "category": "sicak-icecekler",
    "nameTr": "Sıcak Çikolata",
    "nameEn": "Sıcak Çikolata",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd67828f313.87697565.jpg",
    "available": true
  },
  {
    "id": "sicak-icecekler-3",
    "category": "sicak-icecekler",
    "nameTr": "Beyaz Sıcak Çikolata",
    "nameEn": "Beyaz Sıcak Çikolata",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c26178e9a98.28034382.jpg",
    "available": true
  },
  {
    "id": "sicak-icecekler-4",
    "category": "sicak-icecekler",
    "nameTr": "Çikolatalı Salep",
    "nameEn": "Çikolatalı Salep",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2661b2e639.19504473.png",
    "available": true
  },
  {
    "id": "sicak-icecekler-5",
    "category": "sicak-icecekler",
    "nameTr": "Salep",
    "nameEn": "Salep",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd6f9c8e241.46207704.jpg",
    "available": true
  },
  {
    "id": "sicak-icecekler-6",
    "category": "sicak-icecekler",
    "nameTr": "Fıstıklı Salep",
    "nameEn": "Fıstıklı Salep",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c26800a8ba2.42536876.png",
    "available": true
  },
  {
    "id": "yoresel-kahveler-1",
    "category": "yoresel-kahveler",
    "nameTr": "Türk Kahvesi",
    "nameEn": "Türk Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "tagTr": "İmza",
    "tagEn": "Signature",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd6caec88c3.06631771.jpg",
    "available": true
  },
  {
    "id": "yoresel-kahveler-2",
    "category": "yoresel-kahveler",
    "nameTr": "Double Türk Kahvesi",
    "nameEn": "Double Türk Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c26a5548ed1.56414637.jpg",
    "available": true
  },
  {
    "id": "yoresel-kahveler-3",
    "category": "yoresel-kahveler",
    "nameTr": "Süvari Türk Kahvesi",
    "nameEn": "Süvari Türk Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺80",
    "tagTr": "Yerel",
    "tagEn": "Local",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c26bb3c57e0.50627031.jpg",
    "available": true
  },
  {
    "id": "yoresel-kahveler-4",
    "category": "yoresel-kahveler",
    "nameTr": "Damla Sakızlı Türk Kahvesi",
    "nameEn": "Damla Sakızlı Türk Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺100",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c26c75594f4.25576699.jpg",
    "available": true
  },
  {
    "id": "yoresel-kahveler-5",
    "category": "yoresel-kahveler",
    "nameTr": "Menengiç Kahvesi",
    "nameEn": "Menengiç Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "tagTr": "Yerel",
    "tagEn": "Local",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd6e23de813.57782481.jpg",
    "available": true
  },
  {
    "id": "yoresel-kahveler-6",
    "category": "yoresel-kahveler",
    "nameTr": "Sütlü Türk Kahvesi",
    "nameEn": "Sütlü Türk Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd776840d29.60014110.jpg",
    "available": true
  },
  {
    "id": "yoresel-kahveler-7",
    "category": "yoresel-kahveler",
    "nameTr": "Dibek Kahvesi",
    "nameEn": "Dibek Kahvesi",
    "descTr": "",
    "descEn": "",
    "price": "₺100",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c26d76af1b3.46873049.jpg",
    "available": true
  },
  {
    "id": "bitki-caylari-1",
    "category": "bitki-caylari",
    "nameTr": "Ihlamur",
    "nameEn": "Ihlamur",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a5128bcc84f37.56779027.webp",
    "available": true
  },
  {
    "id": "bitki-caylari-2",
    "category": "bitki-caylari",
    "nameTr": "Yeşil Çay",
    "nameEn": "Yeşil Çay",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a5128e694e873.00922714.jpg",
    "available": true
  },
  {
    "id": "bitki-caylari-3",
    "category": "bitki-caylari",
    "nameTr": "Nane Limon Çayı",
    "nameEn": "Nane Limon Çayı",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c274447cb42.62463921.jpg",
    "available": true
  },
  {
    "id": "bitki-caylari-4",
    "category": "bitki-caylari",
    "nameTr": "Kış Çayı",
    "nameEn": "Kış Çayı",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2733a63162.47407798.jpg",
    "available": true
  },
  {
    "id": "bitki-caylari-5",
    "category": "bitki-caylari",
    "nameTr": "Papatya Çayı",
    "nameEn": "Papatya Çayı",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c275b1dcec5.26983127.jpg",
    "available": true
  },
  {
    "id": "bitki-caylari-6",
    "category": "bitki-caylari",
    "nameTr": "Kuşburnu Çayı",
    "nameEn": "Kuşburnu Çayı",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c276a6cb6e9.85753903.jpg",
    "available": true
  },
  {
    "id": "taze-icecekler-1",
    "category": "taze-icecekler",
    "nameTr": "Portakal Suyu",
    "nameEn": "Portakal Suyu",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "tagTr": "Çok Satan",
    "tagEn": "Bestseller",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2797393a80.22603337.jpg",
    "available": true
  },
  {
    "id": "taze-icecekler-2",
    "category": "taze-icecekler",
    "nameTr": "Churchil",
    "nameEn": "Churchil",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c27ba4609d4.62660702.jpg",
    "available": true
  },
  {
    "id": "taze-icecekler-3",
    "category": "taze-icecekler",
    "nameTr": "Meyve Tabağı",
    "nameEn": "Meyve Tabağı",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c284ca3cbf4.99459585.png",
    "available": true
  },
  {
    "id": "taze-icecekler-4",
    "category": "taze-icecekler",
    "nameTr": "Limonata",
    "nameEn": "Limonata",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2e8b435370.68450889.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-1",
    "category": "soguk-icecekler",
    "nameTr": "ANANAS FROZEN",
    "nameEn": "ANANAS FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57b7f9743289.54169343.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-2",
    "category": "soguk-icecekler",
    "nameTr": "ANANAS SMHOOTHİE",
    "nameEn": "ANANAS SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57ba4ac829f8.01524749.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-3",
    "category": "soguk-icecekler",
    "nameTr": "BÖĞÜRTLEN FROZEN",
    "nameEn": "BÖĞÜRTLEN FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57b82c33c1a2.91498332.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-4",
    "category": "soguk-icecekler",
    "nameTr": "BOTANİQA KOKTEYL",
    "nameEn": "BOTANİQA KOKTEYL",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bed870bd35.11453337.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-5",
    "category": "soguk-icecekler",
    "nameTr": "ELMALI SMHOOTHİE",
    "nameEn": "ELMALI SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57baf606aca3.24812898.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-6",
    "category": "soguk-icecekler",
    "nameTr": "KARPUZ FROZEN",
    "nameEn": "KARPUZ FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bb42515486.46409464.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-7",
    "category": "soguk-icecekler",
    "nameTr": "KAVUN SMHOOTHİE",
    "nameEn": "KAVUN SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bb3113c438.96927471.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-8",
    "category": "soguk-icecekler",
    "nameTr": "KOKTEYL BOLO",
    "nameEn": "KOKTEYL BOLO",
    "descTr": "",
    "descEn": "",
    "price": "₺0",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bef36fc5e0.11847209.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-9",
    "category": "soguk-icecekler",
    "nameTr": "LİMON SMHOOTHİE",
    "nameEn": "LİMON SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bb1c2c6e08.13848466.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-10",
    "category": "soguk-icecekler",
    "nameTr": "MANGO FROZEN",
    "nameEn": "MANGO FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57b7c44a0f32.85338429.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-11",
    "category": "soguk-icecekler",
    "nameTr": "MANGO SMHOOTHİE",
    "nameEn": "MANGO SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57ba278ba643.58418146.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-12",
    "category": "soguk-icecekler",
    "nameTr": "MUZ SMHOOTHİE",
    "nameEn": "MUZ SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bab0361db5.45167104.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-13",
    "category": "soguk-icecekler",
    "nameTr": "ORMAN MEYVELİ SMHOOTHİE",
    "nameEn": "ORMAN MEYVELİ SMHOOTHİE",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57ba0274aab8.22422409.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-14",
    "category": "soguk-icecekler",
    "nameTr": "Vanilya Milkshake",
    "nameEn": "Vanilya Milkshake",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a51285e1d0413.59408381.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-15",
    "category": "soguk-icecekler",
    "nameTr": "Çilekli Milkshake",
    "nameEn": "Çilekli Milkshake",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c287f842319.50514034.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-16",
    "category": "soguk-icecekler",
    "nameTr": "Çikolatalı Milkshake",
    "nameEn": "Çikolatalı Milkshake",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bf09ed83991.12214786.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-17",
    "category": "soguk-icecekler",
    "nameTr": "Karamelli Milkshake",
    "nameEn": "Karamelli Milkshake",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c28cc3abb12.85334371.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-18",
    "category": "soguk-icecekler",
    "nameTr": "Muzlu Milkshake",
    "nameEn": "Muzlu Milkshake",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c290e941da6.51143060.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-19",
    "category": "soguk-icecekler",
    "nameTr": "MUZLU FROZEN",
    "nameEn": "MUZLU FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57b883dc7407.74963680.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-20",
    "category": "soguk-icecekler",
    "nameTr": "KAVUNLU FROZEN",
    "nameEn": "KAVUNLU FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57b8d37d45e8.62190412.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-21",
    "category": "soguk-icecekler",
    "nameTr": "Böğürtlen Smoothie",
    "nameEn": "Böğürtlen Smoothie",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c295a156700.36320098.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-22",
    "category": "soguk-icecekler",
    "nameTr": "Çilek Smoothie",
    "nameEn": "Çilek Smoothie",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2993c62127.98375348.webp",
    "available": true
  },
  {
    "id": "soguk-icecekler-23",
    "category": "soguk-icecekler",
    "nameTr": "KARPUZ FROZEN",
    "nameEn": "KARPUZ FROZEN",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57b90519ad83.81737497.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-24",
    "category": "soguk-icecekler",
    "nameTr": "Orman Meyveli Frozen",
    "nameEn": "Orman Meyveli Frozen",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c29cc478291.43890180.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-25",
    "category": "soguk-icecekler",
    "nameTr": "Çilekli Frozen",
    "nameEn": "Çilekli Frozen",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c29efe7c9c0.90898610.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-26",
    "category": "soguk-icecekler",
    "nameTr": "MİX FROZEN",
    "nameEn": "MİX FROZEN",
    "descTr": "DİLEĞİNİZ KARIŞIMI VEYA İŞİNDE UZMAN BARİSTALARIMIZA BIRAKIN :)",
    "descEn": "DİLEĞİNİZ KARIŞIMI VEYA İŞİNDE UZMAN BARİSTALARIMIZA BIRAKIN :)",
    "price": "₺180",
    "available": true
  },
  {
    "id": "soguk-icecekler-27",
    "category": "soguk-icecekler",
    "nameTr": "Yeşil Elma Frozen",
    "nameEn": "Yeşil Elma Frozen",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2a2fc7e870.87466517.jpg",
    "available": true
  },
  {
    "id": "soguk-icecekler-28",
    "category": "soguk-icecekler",
    "nameTr": "Klasik Mojito",
    "nameEn": "Klasik Mojito",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2a8a026d68.67870942.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-1",
    "category": "soguk-kahveler",
    "nameTr": "İCE WHİTE MOCHA",
    "nameEn": "İCE WHİTE MOCHA",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bbbc3802a2.35872473.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-2",
    "category": "soguk-kahveler",
    "nameTr": "Karamel Frappe",
    "nameEn": "Karamel Frappe",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bc9e9ec583.18377397.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-3",
    "category": "soguk-kahveler",
    "nameTr": "Ice Americano",
    "nameEn": "Ice Americano",
    "descTr": "",
    "descEn": "",
    "price": "₺160",
    "tagTr": "Çok Satan",
    "tagEn": "Bestseller",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2ae3a28698.33608876.webp",
    "available": true
  },
  {
    "id": "soguk-kahveler-4",
    "category": "soguk-kahveler",
    "nameTr": "Ice Latte",
    "nameEn": "Ice Latte",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2b28d56456.34829406.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-5",
    "category": "soguk-kahveler",
    "nameTr": "Cold Brew",
    "nameEn": "Cold Brew",
    "descTr": "",
    "descEn": "",
    "price": "₺170",
    "tagTr": "İmza",
    "tagEn": "Signature",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bc11b7f4f7.50389673.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-6",
    "category": "soguk-kahveler",
    "nameTr": "Karamelli Ice Latte",
    "nameEn": "Karamelli Ice Latte",
    "descTr": "",
    "descEn": "",
    "price": "₺190",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2b5809e4e2.22968325.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-7",
    "category": "soguk-kahveler",
    "nameTr": "Ice Coffee",
    "nameEn": "Ice Coffee",
    "descTr": "",
    "descEn": "",
    "price": "₺180",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2b6aef7374.52854048.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-8",
    "category": "soguk-kahveler",
    "nameTr": "Ice Mocha",
    "nameEn": "Ice Mocha",
    "descTr": "",
    "descEn": "",
    "price": "₺190",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2b7a2ae799.19962070.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-9",
    "category": "soguk-kahveler",
    "nameTr": "Vanilyalı Frappe",
    "nameEn": "Vanilyalı Frappe",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bc850c6e13.60958810.jpg",
    "available": true
  },
  {
    "id": "soguk-kahveler-10",
    "category": "soguk-kahveler",
    "nameTr": "Çikolatalı Frappe",
    "nameEn": "Çikolatalı Frappe",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2bf741ecc6.90062975.webp",
    "available": true
  },
  {
    "id": "soguk-kahveler-11",
    "category": "soguk-kahveler",
    "nameTr": "Fındıklı Frappe",
    "nameEn": "Fındıklı Frappe",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2c15003556.43945939.webp",
    "available": true
  },
  {
    "id": "dunya-kahveleri-1",
    "category": "dunya-kahveleri",
    "nameTr": "Klasik Filtre Kahve",
    "nameEn": "Klasik Filtre Kahve",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bc424664e1.40769934.jpg",
    "available": true
  },
  {
    "id": "dunya-kahveleri-2",
    "category": "dunya-kahveleri",
    "nameTr": "Sütlü Filtre Kahve",
    "nameEn": "Sütlü Filtre Kahve",
    "descTr": "",
    "descEn": "",
    "price": "₺170",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bbe97b58f7.94878634.jpg",
    "available": true
  },
  {
    "id": "dunya-kahveleri-3",
    "category": "dunya-kahveleri",
    "nameTr": "Sade Kahve",
    "nameEn": "Sade Kahve",
    "descTr": "",
    "descEn": "",
    "price": "₺100",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd71db9ae42.96265185.jpg",
    "available": true
  },
  {
    "id": "dunya-kahveleri-4",
    "category": "dunya-kahveleri",
    "nameTr": "Sütlü Kahve",
    "nameEn": "Sütlü Kahve",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bc2f0a2679.93042149.jpg",
    "available": true
  },
  {
    "id": "dunya-kahveleri-5",
    "category": "dunya-kahveleri",
    "nameTr": "Double Espresso",
    "nameEn": "Double Espresso",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2cb4eaf601.47458054.jpg",
    "available": true
  },
  {
    "id": "dunya-kahveleri-6",
    "category": "dunya-kahveleri",
    "nameTr": "Klasik Americano",
    "nameEn": "Klasik Americano",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2cc9151f47.04570098.webp",
    "available": true
  },
  {
    "id": "dunya-kahveleri-7",
    "category": "dunya-kahveleri",
    "nameTr": "Cappuccino",
    "nameEn": "Cappuccino",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2ce8e5c143.60618012.webp",
    "available": true
  },
  {
    "id": "dunya-kahveleri-8",
    "category": "dunya-kahveleri",
    "nameTr": "Cafe Mocha",
    "nameEn": "Cafe Mocha",
    "descTr": "",
    "descEn": "",
    "price": "₺170",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2cf7c089e7.74767769.webp",
    "available": true
  },
  {
    "id": "dunya-kahveleri-9",
    "category": "dunya-kahveleri",
    "nameTr": "Espresso",
    "nameEn": "Espresso",
    "descTr": "",
    "descEn": "",
    "price": "₺80",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2d0f906886.59174265.webp",
    "available": true
  },
  {
    "id": "yemekler-1",
    "category": "yemekler",
    "nameTr": "KREMALI TAVUKLU MANTARLI MAKARNA",
    "nameEn": "KREMALI TAVUKLU MANTARLI MAKARNA",
    "descTr": "",
    "descEn": "",
    "price": "₺300",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945d506eae02.63609872.jpg",
    "available": true
  },
  {
    "id": "yemekler-2",
    "category": "yemekler",
    "nameTr": "ANNE MAKARNA",
    "nameEn": "ANNE MAKARNA",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945d81c20655.69470277.jpg",
    "available": true
  },
  {
    "id": "yemekler-3",
    "category": "yemekler",
    "nameTr": "BARBEKÜ SOSLU TAVUKLU MAKARNA MENÜ",
    "nameEn": "BARBEKÜ SOSLU TAVUKLU MAKARNA MENÜ",
    "descTr": "",
    "descEn": "",
    "price": "₺350",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945e517737f7.42169996.jpg",
    "available": true
  },
  {
    "id": "yemekler-4",
    "category": "yemekler",
    "nameTr": "BOTANİQA SPECİAL TAVUK MENÜ",
    "nameEn": "BOTANİQA SPECİAL TAVUK MENÜ",
    "descTr": "",
    "descEn": "",
    "price": "₺350",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945eac640fd5.34816161.jpg",
    "available": true
  },
  {
    "id": "yemekler-5",
    "category": "yemekler",
    "nameTr": "KEKİKLİ TAVUKLU MENÜ",
    "nameEn": "KEKİKLİ TAVUKLU MENÜ",
    "descTr": "",
    "descEn": "",
    "price": "₺350",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945e6b6cb206.76971774.jpg",
    "available": true
  },
  {
    "id": "yemekler-6",
    "category": "yemekler",
    "nameTr": "KÖRİ SOSLU TAVUK MENÜ",
    "nameEn": "KÖRİ SOSLU TAVUK MENÜ",
    "descTr": "",
    "descEn": "",
    "price": "₺350",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945e8951ea28.77347242.jpg",
    "available": true
  },
  {
    "id": "yemekler-7",
    "category": "yemekler",
    "nameTr": "KREMALI MAKARNA",
    "nameEn": "KREMALI MAKARNA",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945d66a8e9c7.54456705.jpg",
    "available": true
  },
  {
    "id": "yemekler-8",
    "category": "yemekler",
    "nameTr": "KREMALI MANTARLI MAKARNA",
    "nameEn": "KREMALI MANTARLI MAKARNA",
    "descTr": "",
    "descEn": "",
    "price": "₺270",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a945d38441250.06127524.jpg",
    "available": true
  },
  {
    "id": "tatlilar-1",
    "category": "tatlilar",
    "nameTr": "FIRIN SÜTLAÇ",
    "nameEn": "FIRIN SÜTLAÇ",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "available": true
  },
  {
    "id": "tatlilar-2",
    "category": "tatlilar",
    "nameTr": "FISTIK PASTA",
    "nameEn": "FISTIK PASTA",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57be72ae49e5.21696867.jpg",
    "available": true
  },
  {
    "id": "tatlilar-3",
    "category": "tatlilar",
    "nameTr": "Fıstık Rüyası",
    "nameEn": "Fıstık Rüyası",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "tagTr": "İmza",
    "tagEn": "Signature",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2f91599966.56144722.jpg",
    "available": true
  },
  {
    "id": "tatlilar-4",
    "category": "tatlilar",
    "nameTr": "FISTIKLI MAGNOLYA",
    "nameEn": "FISTIKLI MAGNOLYA",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a68b87daca985.58083327.jpg",
    "available": true
  },
  {
    "id": "tatlilar-5",
    "category": "tatlilar",
    "nameTr": "FRAMBUAZLI MAGNOLYA",
    "nameEn": "FRAMBUAZLI MAGNOLYA",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a68b8465e7546.85865650.jpg",
    "available": true
  },
  {
    "id": "tatlilar-6",
    "category": "tatlilar",
    "nameTr": "LİMON CHEESECAKE",
    "nameEn": "LİMON CHEESECAKE",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bd04e8cde3.59728225.jpg",
    "available": true
  },
  {
    "id": "tatlilar-7",
    "category": "tatlilar",
    "nameTr": "MANGO PASTA",
    "nameEn": "MANGO PASTA",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bea7227a11.30851540.jpg",
    "available": true
  },
  {
    "id": "tatlilar-8",
    "category": "tatlilar",
    "nameTr": "mozaik pasta",
    "nameEn": "mozaik pasta",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2fc87295e9.23738620.jpg",
    "available": true
  },
  {
    "id": "tatlilar-9",
    "category": "tatlilar",
    "nameTr": "OREOLU MAGNOLYA",
    "nameEn": "OREOLU MAGNOLYA",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a68b8ac78ef21.12473359.jpg",
    "available": true
  },
  {
    "id": "tatlilar-10",
    "category": "tatlilar",
    "nameTr": "Orman Meyveli cheesecake",
    "nameEn": "Orman Meyveli cheesecake",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c3032d24250.58066692.jpg",
    "available": true
  },
  {
    "id": "tatlilar-11",
    "category": "tatlilar",
    "nameTr": "PROFİTEROL",
    "nameEn": "PROFİTEROL",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a68b80c23aff9.75619147.jpg",
    "available": true
  },
  {
    "id": "tatlilar-12",
    "category": "tatlilar",
    "nameTr": "TİRAMİSU",
    "nameEn": "TİRAMİSU",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a57bcd8229e65.20746062.jpg",
    "available": true
  },
  {
    "id": "tatlilar-13",
    "category": "tatlilar",
    "nameTr": "Red velvet",
    "nameEn": "Red velvet",
    "descTr": "",
    "descEn": "",
    "price": "₺250",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2f67427562.23894876.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-1",
    "category": "mesrubatlar",
    "nameTr": "Su",
    "nameEn": "Su",
    "descTr": "",
    "descEn": "",
    "price": "₺35",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2d3e1ad244.51127597.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-2",
    "category": "mesrubatlar",
    "nameTr": "Kola",
    "nameEn": "Kola",
    "descTr": "",
    "descEn": "",
    "price": "₺110",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2d655720f2.08057086.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-3",
    "category": "mesrubatlar",
    "nameTr": "Fanta",
    "nameEn": "Fanta",
    "descTr": "",
    "descEn": "",
    "price": "₺110",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4bd75eabee62.95415401.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-4",
    "category": "mesrubatlar",
    "nameTr": "Fındıklı",
    "nameEn": "Fındıklı",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2d9a842552.03432408.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-5",
    "category": "mesrubatlar",
    "nameTr": "Tamek Vişne",
    "nameEn": "Tamek Vişne",
    "descTr": "",
    "descEn": "",
    "price": "₺100",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2e0a555798.55315566.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-6",
    "category": "mesrubatlar",
    "nameTr": "Tamek Şeftali",
    "nameEn": "Tamek Şeftali",
    "descTr": "",
    "descEn": "",
    "price": "₺100",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2e32c24420.84897428.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-7",
    "category": "mesrubatlar",
    "nameTr": "Redbull",
    "nameEn": "Redbull",
    "descTr": "",
    "descEn": "",
    "price": "₺150",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c0361b009e5.47094878.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-8",
    "category": "mesrubatlar",
    "nameTr": "Soda",
    "nameEn": "Soda",
    "descTr": "",
    "descEn": "",
    "price": "₺70",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c03fe09aba0.01199054.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-9",
    "category": "mesrubatlar",
    "nameTr": "Meyveli Soda",
    "nameEn": "Meyveli Soda",
    "descTr": "",
    "descEn": "",
    "price": "₺75",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c040bd588f7.47369792.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-10",
    "category": "mesrubatlar",
    "nameTr": "Fuse Tea",
    "nameEn": "Fuse Tea",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2e577cfa51.78489052.jpg",
    "available": true
  },
  {
    "id": "mesrubatlar-11",
    "category": "mesrubatlar",
    "nameTr": "Sprite",
    "nameEn": "Sprite",
    "descTr": "",
    "descEn": "",
    "price": "₺120",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2ecc354df9.76971978.jpeg",
    "available": true
  },
  {
    "id": "ekstralar-1",
    "category": "ekstralar",
    "nameTr": "Kafa",
    "nameEn": "Kafa",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "available": true
  },
  {
    "id": "ekstralar-2",
    "category": "ekstralar",
    "nameTr": "Çerez",
    "nameEn": "Çerez",
    "descTr": "",
    "descEn": "",
    "price": "₺200",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c2eef090656.21941663.jpg",
    "available": true
  },
  {
    "id": "ekstralar-3",
    "category": "ekstralar",
    "nameTr": "Extra",
    "nameEn": "Extra",
    "descTr": "",
    "descEn": "",
    "price": "₺0",
    "available": true
  },
  {
    "id": "dondurmalar-1",
    "category": "dondurmalar",
    "nameTr": "balbadem dondurma top",
    "nameEn": "balbadem dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c31b9752d12.44061309.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-2",
    "category": "dondurmalar",
    "nameTr": "çikolatalı dondurma top",
    "nameEn": "çikolatalı dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c30817fec66.28301070.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-3",
    "category": "dondurmalar",
    "nameTr": "çilekli dondurma top",
    "nameEn": "çilekli dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c30d23d7239.95451731.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-4",
    "category": "dondurmalar",
    "nameTr": "fıstıklı dondurma top",
    "nameEn": "fıstıklı dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c30a787fdb7.53531739.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-5",
    "category": "dondurmalar",
    "nameTr": "italyan karamelli dondurma top",
    "nameEn": "italyan karamelli dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c312a78c8e7.21005515.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-6",
    "category": "dondurmalar",
    "nameTr": "karadut dondurma top",
    "nameEn": "karadut dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c3196ecb8f3.69567336.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-7",
    "category": "dondurmalar",
    "nameTr": "kavun dondurma top",
    "nameEn": "kavun dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c3167bd8803.45996159.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-8",
    "category": "dondurmalar",
    "nameTr": "limonlu dondurma top",
    "nameEn": "limonlu dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c310756fb28.34616667.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-9",
    "category": "dondurmalar",
    "nameTr": "oreolu dondurma top",
    "nameEn": "oreolu dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c31492414f2.00785528.jpg",
    "available": true
  },
  {
    "id": "dondurmalar-10",
    "category": "dondurmalar",
    "nameTr": "sade dondurma top",
    "nameEn": "sade dondurma top",
    "descTr": "",
    "descEn": "",
    "price": "₺50",
    "image": "https://urfamenu.com/botanica/uploads/products/img_6a4c3212d4e2c2.88560978.jpg",
    "available": true
  }
],
};
