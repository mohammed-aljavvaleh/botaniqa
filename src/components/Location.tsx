'use client';

import { MapPin, Clock, ExternalLink, Compass } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';

function getLiveStatus(hours: { dayTr: string; openHour: number; closeHour: number }[], lang: 'tr' | 'en') {
  if (!hours || hours.length === 0) {
    return { isOpen: true, label: lang === 'tr' ? 'Açık' : 'Open' };
  }

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const jsDay = now.getDay();
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNames[jsDay];

  const todaySchedule = hours.find((h) => h.dayTr.includes(todayName)) || hours[0];

  if (!todaySchedule) {
    return { isOpen: false, label: lang === 'tr' ? 'Kapalı' : 'Closed' };
  }

  const { openHour = 8, closeHour = 22 } = todaySchedule;
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  if (isOpen) {
    return {
      isOpen: true,
      label: lang === 'tr' ? `Şu an Açık · ${closeHour}:00'a kadar` : `Open Now · until ${closeHour}:00`,
    };
  }

  return {
    isOpen: false,
    label: lang === 'tr' ? `Şu an Kapalı · Açılış ${openHour}:00` : `Closed Now · Opens at ${openHour}:00`,
  };
}

export default function Location() {
  const { t, lang } = useLang();
  const { data: cafeData } = useCafeData();
  const l = t.location;
  const contact = cafeData.contact;
  const addressText = lang === 'tr' ? contact.addressTr : contact.addressEn;
  const mapsUrl = contact.mapsUrl;
  const embedUrl = contact.embedUrl;

  const { isOpen, label: statusLabel } = getLiveStatus(cafeData.hours, lang);

  return (
    <section id="location" className="py-14 sm:py-28 md:py-36 bg-[#132413] text-[#fdf8f0] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#4a7a4a]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-[#c1713a]/8 rounded-full blur-[130px] pointer-events-none" />

      {/* Atmospheric Top Hairline Divider */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8 sm:mb-18">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#385a38]/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Asymmetrical Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-20">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#a8d5a8] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#e8a97a]" />
              <span>04 / {l.label}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#fffef9] tracking-tight leading-[1.08] font-normal">
              {l.heading1}{' '}
              <span className="italic font-serif text-[#e8a97a] font-normal">
                {l.heading2}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[#a4cca4] text-base sm:text-lg leading-relaxed font-light max-w-md">
              {l.subheading}
            </p>
          </div>
        </div>

        {/* Layout: Map on left, Refined Visiting Ledger on right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Architectural Map Frame (7 cols) */}
          <div className="lg:col-span-7">
            {embedUrl?.trim() ? (
              <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#2b4b2b] aspect-[4/3] sm:aspect-[16/11] relative group">
                <iframe
                  title="botaniqa café Konum Haritası"
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full grayscale-[25%] contrast-[1.05] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
              </div>
            ) : (
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#2b4b2b] aspect-[4/3] sm:aspect-[16/11] relative bg-[#182c18] flex items-center justify-center p-8 text-center">
                <div className="space-y-3 max-w-xs">
                  <MapPin className="w-10 h-10 text-[#e8a97a] mx-auto opacity-70" />
                  <p className="text-[#a8d5a8] text-sm whitespace-pre-line leading-relaxed">
                    {addressText || 'Karaköprü, Şanlıurfa'}
                  </p>
                  {mapsUrl?.trim() && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#e8a97a] hover:underline font-medium"
                    >
                      {l.openInMaps}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Editorial Visiting Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Status Badge */}
            {cafeData.hours?.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#182e18] to-[#142614] border border-[#2d4e2d] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      isOpen ? 'bg-emerald-400 pulse-dot' : 'bg-[#c1713a]'
                    }`}
                  />
                  <span
                    className={`font-semibold text-sm sm:text-base tracking-wide ${
                      isOpen ? 'text-emerald-300' : 'text-[#e8a97a]'
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <Compass className="w-4 h-4 text-[#759f75]" />
              </div>
            )}

            {/* Address & Direction Card */}
            {addressText?.trim() && (
              <div className="p-6 rounded-3xl bg-[#162a16]/80 border border-[#294829] backdrop-blur-md space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#223d22] border border-[#345934] flex items-center justify-center shrink-0 text-[#e8a97a]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-medium text-[#fffef9] mb-1">
                      {l.addressTitle}
                    </h3>
                    <p className="text-[#a4cca4] text-sm leading-relaxed font-light whitespace-pre-line">
                      {addressText}
                    </p>
                  </div>
                </div>

                {mapsUrl?.trim() && (
                  <div className="pt-3 border-t border-[#233d23]">
                    <a
                      id="location-google-maps"
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#e8a97a] hover:text-white transition-colors"
                    >
                      <span>{l.openInMaps}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Working Hours Ledger */}
            {cafeData.hours && cafeData.hours.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#162a16]/80 border border-[#294829] backdrop-blur-md space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#223d22] border border-[#345934] flex items-center justify-center shrink-0 text-[#a8d5a8]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#fffef9]">
                    {l.hoursTitle}
                  </h3>
                </div>

                <div className="space-y-2.5 pt-2">
                  {cafeData.hours.map((h, i) => (
                    <div
                      key={h.id || i}
                      className="flex items-baseline justify-between text-xs sm:text-sm py-1 border-b border-[#223b22]/70 last:border-0"
                    >
                      <span className="text-[#a4cca4] font-light">
                        {lang === 'tr' ? h.dayTr : h.dayEn}
                      </span>
                      <span className="font-mono text-[#fdf8f0] font-medium tracking-tight">
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
