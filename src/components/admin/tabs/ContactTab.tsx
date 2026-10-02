'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { adminTranslations } from '@/data/adminTranslations';

interface ContactTabProps {
  contact: {
    addressTr: string;
    addressEn: string;
    phone: string;
    phoneRaw?: string;
    phoneSecondary?: string;
    phoneSecondaryRaw?: string;
    email: string;
    mapsUrl: string;
    embedUrl: string;
  };
  onUpdateContact: (updates: Partial<ContactTabProps['contact']>) => void;
  onSaveToServer: () => Promise<boolean>;
  lang: 'tr' | 'en';
}

export default function ContactTab({
  contact,
  onUpdateContact,
  onSaveToServer,
  lang,
}: ContactTabProps) {
  const t = adminTranslations[lang];

  // Helper to extract 05XXXXXXXXX for the input
  const to05Digits = (str: string): string => {
    if (!str) return '';
    const digits = str.replace(/\D/g, '');
    if (digits.startsWith('905') && digits.length === 12) {
      return '0' + digits.slice(2);
    }
    if (digits.startsWith('5') && digits.length === 10) {
      return '0' + digits;
    }
    if (digits.startsWith('05')) {
      return digits.slice(0, 11);
    }
    return digits.slice(0, 11);
  };

  // ── Main Phone State ────────────────────────────────────────────────
  const [phoneInput, setPhoneInput] = React.useState(() => to05Digits(contact.phone || ''));

  React.useEffect(() => {
    const formatted = to05Digits(contact.phone || '');
    if (to05Digits(phoneInput) !== formatted && to05Digits(contact.phone || '') !== phoneInput) {
      setPhoneInput(formatted);
    }
  }, [contact.phone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.startsWith('905') && raw.length === 12) {
      raw = '0' + raw.slice(2);
    } else if (raw.startsWith('5') && !raw.startsWith('05') && raw.length === 10) {
      raw = '0' + raw;
    }
    if (raw.length > 11) {
      raw = raw.slice(0, 11);
    }
    setPhoneInput(raw);

    onUpdateContact({
      phone: raw,
      phoneRaw: raw.startsWith('05') && raw.length === 11 ? `+90${raw.slice(1)}` : raw,
    });
  };

  const trimmed = phoneInput.trim();
  const isInputEmpty = trimmed.length === 0;
  const isInvalidStart = trimmed.length >= 2 && !trimmed.startsWith('05');
  const isSingleDigitNotZero = trimmed.length === 1 && trimmed !== '0';
  const isIncomplete = trimmed.startsWith('05') && trimmed.length < 11;
  const isComplete = trimmed.startsWith('05') && trimmed.length === 11;

  // ── Secondary Phone State ───────────────────────────────────────────
  const [phoneSecondaryInput, setPhoneSecondaryInput] = React.useState(() => to05Digits(contact.phoneSecondary || ''));

  React.useEffect(() => {
    const formatted = to05Digits(contact.phoneSecondary || '');
    if (to05Digits(phoneSecondaryInput) !== formatted && to05Digits(contact.phoneSecondary || '') !== phoneSecondaryInput) {
      setPhoneSecondaryInput(formatted);
    }
  }, [contact.phoneSecondary]);

  const handlePhoneSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.startsWith('905') && raw.length === 12) {
      raw = '0' + raw.slice(2);
    } else if (raw.startsWith('5') && !raw.startsWith('05') && raw.length === 10) {
      raw = '0' + raw;
    }
    if (raw.length > 11) {
      raw = raw.slice(0, 11);
    }
    setPhoneSecondaryInput(raw);

    onUpdateContact({
      phoneSecondary: raw,
      phoneSecondaryRaw: raw.startsWith('05') && raw.length === 11 ? `+90${raw.slice(1)}` : raw,
    });
  };

  const trimmedSec = phoneSecondaryInput.trim();
  const isSecEmpty = trimmedSec.length === 0;
  const isSecInvalidStart = trimmedSec.length >= 2 && !trimmedSec.startsWith('05');
  const isSecSingleDigitNotZero = trimmedSec.length === 1 && trimmedSec !== '0';
  const isSecIncomplete = trimmedSec.startsWith('05') && trimmedSec.length < 11;
  const isSecComplete = trimmedSec.startsWith('05') && trimmedSec.length === 11;

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

        {/* Phone Numbers Grid (Main & Secondary) */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Main Phone */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#eee8db] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider">
                {t.contactTab.phone}
              </label>
              <span className="text-[11px] text-[#718771] font-mono">
                {trimmed.length}/11
              </span>
            </div>
            <p className="text-[11px] text-[#6d7f6d] leading-snug">
              {t.contactTab.phoneDesc}
            </p>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={11}
              value={phoneInput}
              onChange={handlePhoneChange}
              placeholder={t.contactTab.phonePlaceholder || "05*********"}
              className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors ${isInvalidStart || isSingleDigitNotZero
                ? 'border-rose-400 bg-rose-50/30 text-rose-950 focus:border-rose-500'
                : isComplete
                  ? 'border-emerald-500 bg-emerald-50/20 text-[#1c2a1c] focus:border-emerald-600'
                  : 'border-[#d8d2c4] bg-[#fbfaf8] text-[#1c2a1c] focus:border-[#1c381c] focus:bg-white'
                }`}
            />

            {/* Validation & Feedback messages */}
            {(isInvalidStart || isSingleDigitNotZero) && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                {t.contactTab.phoneWarningStart || 'Numara "05" ile başlamalıdır (Örn: 05344402028)'}
              </p>
            )}

            {isIncomplete && (
              <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5 mt-1">
                {lang === 'tr' ? `11 haneli olmalıdır (${trimmed.length}/11)` : `Must be 11 digits (${trimmed.length}/11)`}
              </p>
            )}

            {isInputEmpty && (
              <p className="text-[11px] text-[#718771] mt-1">
                {t.contactTab.phoneRule || 'Numara "05" ile başlamalı ve en fazla 11 haneli olmalıdır'}
              </p>
            )}
          </div>

          {/* Secondary Phone */}
          <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#eee8db] space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider">
                {t.contactTab.phoneSecondary}
              </label>
              <span className="text-[11px] text-[#718771] font-mono">
                {trimmedSec.length}/11
              </span>
            </div>
            <p className="text-[11px] text-[#6d7f6d] leading-snug">
              {t.contactTab.phoneSecondaryDesc}
            </p>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={11}
              value={phoneSecondaryInput}
              onChange={handlePhoneSecondaryChange}
              placeholder={t.contactTab.phonePlaceholder || "05*********"}
              className={`w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors ${isSecInvalidStart || isSecSingleDigitNotZero
                ? 'border-rose-400 bg-rose-50/30 text-rose-950 focus:border-rose-500'
                : isSecComplete
                  ? 'border-emerald-500 bg-emerald-50/20 text-[#1c2a1c] focus:border-emerald-600'
                  : 'border-[#d8d2c4] bg-[#fbfaf8] text-[#1c2a1c] focus:border-[#1c381c] focus:bg-white'
                }`}
            />

            {/* Validation & Feedback messages */}
            {(isSecInvalidStart || isSecSingleDigitNotZero) && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                {t.contactTab.phoneWarningStart || 'Numara "05" ile başlamalıdır (Örn: 05344402028)'}
              </p>
            )}

            {isSecIncomplete && (
              <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5 mt-1">
                {lang === 'tr' ? `11 haneli olmalıdır (${trimmedSec.length}/11)` : `Must be 11 digits (${trimmedSec.length}/11)`}
              </p>
            )}

            {isSecEmpty && (
              <p className="text-[11px] text-[#718771] mt-1">
                {lang === 'tr' ? 'İsteğe bağlı. Boş bırakılırsa ana numara kullanılır.' : 'Optional. If blank, main number is used.'}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
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

        <div>
          <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
            {t.contactTab.address || (lang === 'tr' ? 'Kafe Adresi' : 'Cafe Address')}
          </label>
          <textarea
            rows={3}
            value={contact.addressTr || contact.addressEn || ''}
            onChange={(e) => {
              const val = e.target.value;
              onUpdateContact({
                addressTr: val,
                addressEn: val,
              });
            }}
            placeholder={
              lang === 'tr'
                ? '50 metre yolu üzeri Cadının evi yukarısı, Karaköprü, Şanlıurfa'
                : '50 metre yolu üzeri Cadının evi yukarısı, Karaköprü, Şanlıurfa'
            }
            className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl p-3.5 text-sm text-[#1c2a1c] outline-none leading-relaxed"
          />
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
