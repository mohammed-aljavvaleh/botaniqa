'use client';

import React from 'react';
import { Info, Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { adminTranslations } from '@/data/adminTranslations';
import { useSaveManager } from '@/components/admin/adminHelpers';

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
  const { saveStatus, isSaving, saveNow, saveOnBlur } = useSaveManager(onSaveToServer);

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

    // Update local state only — no server request on keystroke
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

    // Update local state only — no server request on keystroke
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

  const handleSaveNow = async () => {
    if (isIncomplete) {
      alert(lang === 'tr' ? 'Ana telefon numarası 11 haneli olmalıdır (05*********).' : 'Main phone number must be 11 digits.');
      return;
    }
    if (isSecIncomplete) {
      alert(lang === 'tr' ? 'İkinci telefon numarası 11 haneli olmalıdır (05*********).' : 'Secondary phone number must be 11 digits.');
      return;
    }
    await saveNow();
  };

  return (
    <section className="space-y-6 animate-fade-in max-w-4xl">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e4da] space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {t.contactTab.title}
          </h2>

          <div className="flex items-center gap-2.5">
            {/* Auto-save status pill */}
            {saveStatus !== 'idle' && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
                saveStatus === 'saving'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : saveStatus === 'saved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {saveStatus === 'saving' && <Loader2 className="w-3 h-3 animate-spin" />}
                {saveStatus === 'saved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                {saveStatus === 'error' && <AlertCircle className="w-3 h-3 text-red-600" />}
                {saveStatus === 'saving' && (t.contactTab.saving || (lang === 'tr' ? 'Kaydediliyor…' : 'Saving…'))}
                {saveStatus === 'saved' && (t.contactTab.saved || (lang === 'tr' ? 'Değişiklikler Kaydedildi ✓' : 'Changes Saved ✓'))}
                {saveStatus === 'error' && (lang === 'tr' ? 'Hata!' : 'Error!')}
              </span>
            )}

            {/* Dedicated Save Changes button */}
            <button
              type="button"
              onClick={handleSaveNow}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c381c] hover:bg-[#284f28] disabled:opacity-75 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-98"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white/90" />
              ) : (
                <Save className="w-3.5 h-3.5 text-white/90" />
              )}
              <span>{isSaving ? t.contactTab.saving : t.contactTab.saveBtn}</span>
            </button>
          </div>
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
              onBlur={saveOnBlur}
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
            onBlur={saveOnBlur}
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
            onBlur={saveOnBlur}
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
                saveOnBlur();
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
              onBlur={saveOnBlur}
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

        {/* Bottom Save Action Bar */}
        <div className="pt-6 border-t border-[#f0ece1] flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-[#6e7d6e]">
            {lang === 'tr'
              ? 'Alanlar odak dışına çıktığında otomatik kaydedilir veya butona tıklayabilirsiniz.'
              : 'Fields auto-save on blur, or click Save Changes.'}
          </span>
          <button
            type="button"
            onClick={handleSaveNow}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c381c] hover:bg-[#284f28] disabled:opacity-75 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-98"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white/90" />
            ) : (
              <Save className="w-3.5 h-3.5 text-white/90" />
            )}
            <span>{isSaving ? t.contactTab.saving : t.contactTab.saveBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
