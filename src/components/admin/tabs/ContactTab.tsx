'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { adminTranslations } from '@/data/adminTranslations';

interface ContactTabProps {
  contact: {
    addressTr: string;
    addressEn: string;
    phone: string;
    email: string;
    mapsUrl: string;
    embedUrl: string;
  };
  onUpdateContact: (updates: Partial<ContactTabProps['contact']>) => void;
  lang: 'tr' | 'en';
}

export default function ContactTab({
  contact,
  onUpdateContact,
  lang,
}: ContactTabProps) {
  const t = adminTranslations[lang];

  return (
    <section className="space-y-6 animate-fade-in max-w-4xl">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e4da] space-y-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {t.contactTab.title}
          </h2>
        </div>

        {/* Informational badge */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-900 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <span>{t.contactTab.emptyNotice}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.contactTab.phone}
            </label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => {
                // Allow only phone characters: digits, spaces, +, -, (, )
                const val = e.target.value.replace(/[^0-9+\s\-()]/g, '');
                onUpdateContact({ phone: val });
              }}
              placeholder="+90 542 297 92 62"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.contactTab.email}
            </label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => onUpdateContact({ email: e.target.value.trim().toLowerCase() })}
              placeholder="info@botaniqacafe.com"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.contactTab.addressTr}
            </label>
            <textarea
              rows={3}
              value={contact.addressTr}
              onChange={(e) => onUpdateContact({ addressTr: e.target.value })}
              placeholder="Atatürk Bulvarı No:42, Karaköprü, Şanlıurfa"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl p-3 text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.contactTab.addressEn}
            </label>
            <textarea
              rows={3}
              value={contact.addressEn}
              onChange={(e) => onUpdateContact({ addressEn: e.target.value })}
              placeholder="Atatürk Boulevard No:42, Karaköprü, Şanlıurfa"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl p-3 text-sm text-[#1c2a1c] outline-none"
            />
          </div>
        </div>

        <div className="space-y-5 pt-4 border-t border-[#f0ece1]">
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.contactTab.mapsUrl}
            </label>
            <input
              type="url"
              value={contact.mapsUrl}
              onChange={(e) => onUpdateContact({ mapsUrl: e.target.value.trim() })}
              onBlur={() => {
                const url = contact.mapsUrl.trim();
                if (url && !/^https?:\/\//i.test(url)) {
                  onUpdateContact({ mapsUrl: `https://${url}` });
                }
              }}
              placeholder="https://maps.google.com/?q=..."
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            />
            <p className="text-[11px] text-[#718771] mt-1">
              {lang === 'tr'
                ? 'Kullanıcıların "Yol Tarifi Al" butonuna bastığında Google Haritalar uygulamasında açılacak bağlantı.'
                : 'The link that opens in Google Maps app when users click "Get Directions".'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider">
                {t.contactTab.embedUrl}
              </label>
              <span className="text-[11px] text-[#c1713a] font-medium">
                {lang === 'tr' ? 'Doğrudan iframe kodunu yapıştırabilirsiniz' : 'You can paste full iframe code directly'}
              </span>
            </div>

            <input
              type="text"
              value={contact.embedUrl}
              onChange={(e) => {
                const val = e.target.value;
                const match = val.match(/src=["'](.*?)["']/);
                const cleanUrl = match ? match[1] : val.trim();
                onUpdateContact({ embedUrl: cleanUrl });
              }}
              placeholder='https://www.google.com/maps/embed?pb=... veya <iframe src="..." ...> yapıştırın'
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none font-mono text-xs"
            />

            {/* Step-by-step help card */}
            <div className="mt-2.5 p-3.5 bg-[#f6f3eb] rounded-2xl border border-[#e4ded2] text-xs text-[#526652] space-y-1.5">
              <p className="font-bold text-[#1c2a1c]">
                {lang === 'tr' ? '📍 Google Maps Embed Kodu Nasıl Alınır?' : '📍 How to get Google Maps Embed Code?'}
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#405240]">
                <li>{lang === 'tr' ? 'Google Maps’te mekanınızı aratın ve açın.' : 'Search and open your cafe on Google Maps.'}</li>
                <li>{lang === 'tr' ? '"Paylaş" (Share) butonuna tıklayın.' : 'Click the "Share" button.'}</li>
                <li>{lang === 'tr' ? '"Harita yerleştirme" (Embed a map) sekmesini seçin.' : 'Select the "Embed a map" tab.'}</li>
                <li>{lang === 'tr' ? '"HTML’yi Kopyala" (Copy HTML) butonuna basıp yukarıdaki kutucuğa yapıştırın.' : 'Click "Copy HTML" and paste it into the box above.'}</li>
              </ol>
            </div>

            {/* Live Map Preview */}
            {contact.embedUrl?.trim() && (
              <div className="mt-4 space-y-1.5">
                <span className="text-[11px] font-bold text-[#445844] uppercase tracking-wider">
                  {lang === 'tr' ? 'Harita Önizlemesi' : 'Live Map Preview'}
                </span>
                <div className="rounded-2xl overflow-hidden border border-[#d8d2c4] aspect-video w-full max-w-lg bg-[#f0ebe0] shadow-xs relative">
                  <iframe
                    src={contact.embedUrl}
                    title="Google Harita Önizleme"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
