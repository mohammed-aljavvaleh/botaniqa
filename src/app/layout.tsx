import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CafeDataProvider } from "@/context/CafeDataContext";
import { getCafeDataFromDb } from "@/lib/redis";
import { CafeStoreData } from "@/data/initialData";

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0e1b0e",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://botaniqa.coffee'),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "botaniqa",
  },
  title: "botaniqa café — Doğanın Kahveyle Buluştuğu Yer | Şanlıurfa",
  description:
    "botaniqa, Karaköprü, Şanlıurfa'da üst düzey bir botanik kafedir. Özel espresso, el yapımı mocktail'ler, imza çaylar ve taze pastalar; yemyeşil bir sığınak atmosferinde.",
  keywords: [
    "botaniqa",
    "kafe Şanlıurfa",
    "Karaköprü kafe",
    "botanik kafe",
    "özel kahve Şanlıurfa",
    "botaniqa menü",
  ],
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/botaniqa-logo.jpg', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/botaniqa-logo.jpg' },
    ],
  },
  openGraph: {
    title: "botaniqa café — Doğanın Kahveyle Buluştuğu Yer | Şanlıurfa",
    description: "Karaköprü, Şanlıurfa'da üst düzey bir botanik kafe deneyimi. Özel kahve, el yapımı tatlılar, eşsiz botanik atmosfer.",
    url: 'https://botaniqa.coffee',
    siteName: 'botaniqa café',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'botaniqa café logo',
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: 'summary_large_image',
    title: "botaniqa café — Doğanın Kahveyle Buluştuğu Yer | Şanlıurfa",
    description: "Karaköprü, Şanlıurfa'da üst düzey bir botanik kafe deneyimi.",
    images: ['/og-image.jpg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let serverData: CafeStoreData | undefined = undefined;
  try {
    const dbData = await getCafeDataFromDb();
    if (dbData) {
      serverData = dbData;
    }
  } catch (err) {
    console.warn('Failed to load server cafe data in RootLayout:', err);
  }

  return (
    <html lang="tr" className="scroll-smooth">
      <body className="antialiased">
        <CafeDataProvider initialData={serverData}>
          <LanguageProvider>{children}</LanguageProvider>
        </CafeDataProvider>
      </body>
    </html>
  );
}
