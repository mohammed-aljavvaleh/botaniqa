import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CafeDataProvider } from "@/context/CafeDataContext";

export const metadata: Metadata = {
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
    icon: '/botaniqa-logo.jpg',
    apple: '/botaniqa-logo.jpg',
  },
  openGraph: {
    title: "botaniqa café — Şanlıurfa",
    description: "Karaköprü, Şanlıurfa'da üst düzey bir botanik kafe deneyimi.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="antialiased">
        <CafeDataProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </CafeDataProvider>
      </body>
    </html>
  );
}
