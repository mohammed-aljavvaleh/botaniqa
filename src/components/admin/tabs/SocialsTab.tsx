'use client';

import React from 'react';
import { Info, Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import {
  SiInstagram,
  SiWhatsapp,
  SiTiktok,
  SiX,
  SiFacebook,
  SiYoutube,
  SiTripadvisor,
  SiGooglemaps,
} from 'react-icons/si';
import { adminTranslations } from '@/data/adminTranslations';
import { useSaveManager } from '@/components/admin/adminHelpers';

interface SocialsTabProps {
  socials: {
    instagramHandle?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
    tiktokUrl?: string;
    twitterUrl?: string;
    facebookUrl?: string;
    youtubeUrl?: string;
    tripadvisorUrl?: string;
    googleMapsUrl?: string;
    googlePlaceId?: string;
  };
  onUpdateSocials: (updates: Partial<SocialsTabProps['socials']>) => void;
  onSaveToServer: () => Promise<boolean>;
  lang: 'tr' | 'en';
}

export default function SocialsTab({
  socials,
  onUpdateSocials,
  onSaveToServer,
  lang,
}: SocialsTabProps) {
  const t = adminTranslations[lang];
  const { saveStatus, isSaving, saveNow, saveOnBlur } = useSaveManager(onSaveToServer);

  // Helper to ensure clean URLs with https://
  const normalizeUrl = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return '';
    if (!/^https?:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  // Helper to extract clean instagram handle (@handle)
  const normalizeInstagramHandle = (val: string) => {
    let cleaned = val.trim();
    const match = cleaned.match(/(?:instagram\.com\/)([a-zA-Z0-9._]+)/);
    if (match) {
      cleaned = match[1];
    }
    cleaned = cleaned.replace(/^@+/, '').replace(/\s+/g, '');
    return cleaned ? `@${cleaned}` : '';
  };

  // Helper to format WhatsApp (phone or wa.me)
  const normalizeWhatsapp = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('https://wa.me/')) return trimmed;
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length >= 7) {
      return `https://wa.me/${digits}`;
    }
    return normalizeUrl(trimmed);
  };

  return (
    <section className="space-y-6 animate-fade-in max-w-4xl">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e4da] space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {t.socialsTab.title}
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
                {saveStatus === 'saving' && (t.socialsTab.saving || (lang === 'tr' ? 'Kaydediliyor…' : 'Saving…'))}
                {saveStatus === 'saved' && (t.socialsTab.saved || (lang === 'tr' ? 'Değişiklikler Kaydedildi ✓' : 'Changes Saved ✓'))}
                {saveStatus === 'error' && (lang === 'tr' ? 'Hata!' : 'Error!')}
              </span>
            )}

            {/* Dedicated Save Changes button */}
            <button
              type="button"
              onClick={() => saveNow()}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c381c] hover:bg-[#284f28] disabled:opacity-75 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-98"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white/90" />
              ) : (
                <Save className="w-3.5 h-3.5 text-white/90" />
              )}
              <span>{isSaving ? t.socialsTab.saving : t.socialsTab.saveBtn}</span>
            </button>
          </div>
        </div>

        {/* Notice badge */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-900 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <span>{t.socialsTab.emptyNotice}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Instagram */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-xs">
                <SiInstagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.instagram}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.instagramDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.instagramHandle}
              </label>
              <input
                type="text"
                value={socials.instagramHandle || ''}
                onChange={(e) => onUpdateSocials({ instagramHandle: e.target.value })}
                onBlur={() => {
                  if (socials.instagramHandle) {
                    const normalized = normalizeInstagramHandle(socials.instagramHandle);
                    const updates: Partial<typeof socials> = { instagramHandle: normalized };
                    if (!socials.instagramUrl && normalized) {
                      updates.instagramUrl = `https://instagram.com/${normalized.replace('@', '')}`;
                    }
                    onUpdateSocials(updates);
                  }
                  saveOnBlur();
                }}
                placeholder="@botaniqa.coffee"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.instagramUrl}
              </label>
              <input
                type="url"
                value={socials.instagramUrl || ''}
                onChange={(e) => onUpdateSocials({ instagramUrl: e.target.value })}
                onBlur={() => {
                  if (socials.instagramUrl) {
                    onUpdateSocials({ instagramUrl: normalizeUrl(socials.instagramUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://instagram.com/botaniqa.coffee"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                <SiWhatsapp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.whatsapp}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.whatsappDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.whatsappUrl}
              </label>
              <input
                type="text"
                value={socials.whatsappUrl || ''}
                onChange={(e) => onUpdateSocials({ whatsappUrl: e.target.value })}
                onBlur={() => {
                  if (socials.whatsappUrl) {
                    onUpdateSocials({ whatsappUrl: normalizeWhatsapp(socials.whatsappUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder={t.socialsTab.whatsappPlaceholder}
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* TikTok */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                <SiTiktok className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.tiktok}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.tiktokDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.tiktokUrl}
              </label>
              <input
                type="url"
                value={socials.tiktokUrl || ''}
                onChange={(e) => onUpdateSocials({ tiktokUrl: e.target.value })}
                onBlur={() => {
                  if (socials.tiktokUrl) {
                    onUpdateSocials({ tiktokUrl: normalizeUrl(socials.tiktokUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://tiktok.com/@botaniqacafe"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* X / Twitter */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                <SiX className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.twitter}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.twitterDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.twitterUrl}
              </label>
              <input
                type="url"
                value={socials.twitterUrl || ''}
                onChange={(e) => onUpdateSocials({ twitterUrl: e.target.value })}
                onBlur={() => {
                  if (socials.twitterUrl) {
                    onUpdateSocials({ twitterUrl: normalizeUrl(socials.twitterUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://x.com/botaniqacafe"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* Facebook */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs">
                <SiFacebook className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.facebook}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.facebookDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.facebookUrl}
              </label>
              <input
                type="url"
                value={socials.facebookUrl || ''}
                onChange={(e) => onUpdateSocials({ facebookUrl: e.target.value })}
                onBlur={() => {
                  if (socials.facebookUrl) {
                    onUpdateSocials({ facebookUrl: normalizeUrl(socials.facebookUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://facebook.com/botaniqacafe"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center text-white shadow-xs">
                <SiYoutube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.youtube}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.youtubeDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.youtubeUrl}
              </label>
              <input
                type="url"
                value={socials.youtubeUrl || ''}
                onChange={(e) => onUpdateSocials({ youtubeUrl: e.target.value })}
                onBlur={() => {
                  if (socials.youtubeUrl) {
                    onUpdateSocials({ youtubeUrl: normalizeUrl(socials.youtubeUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://youtube.com/@botaniqa"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* TripAdvisor */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00AF87] flex items-center justify-center text-white shadow-xs">
                <SiTripadvisor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.tripadvisor}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.tripadvisorDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.tripadvisorUrl}
              </label>
              <input
                type="url"
                value={socials.tripadvisorUrl || ''}
                onChange={(e) => onUpdateSocials({ tripadvisorUrl: e.target.value })}
                onBlur={() => {
                  if (socials.tripadvisorUrl) {
                    onUpdateSocials({ tripadvisorUrl: normalizeUrl(socials.tripadvisorUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://tripadvisor.com/Restaurant_Review..."
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>

          {/* Google Maps / Reviews */}
          <div className="p-5 rounded-2xl bg-[#fbfaf8] border border-[#e8e4da] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e4da] flex items-center justify-center text-[#EA4335] shadow-xs">
                <SiGooglemaps className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1c2a1c]">{t.socialsTab.googleMaps}</h3>
                <p className="text-xs text-[#5d725d]">{t.socialsTab.googleMapsDesc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.googleMapsUrl}
              </label>
              <input
                type="url"
                value={socials.googleMapsUrl || ''}
                onChange={(e) => onUpdateSocials({ googleMapsUrl: e.target.value })}
                onBlur={() => {
                  if (socials.googleMapsUrl) {
                    onUpdateSocials({ googleMapsUrl: normalizeUrl(socials.googleMapsUrl) });
                  }
                  saveOnBlur();
                }}
                placeholder="https://maps.google.com/?q=Botaniqa"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.socialsTab.googlePlaceId}
              </label>
              <input
                type="text"
                value={socials.googlePlaceId || ''}
                onChange={(e) => onUpdateSocials({ googlePlaceId: e.target.value.trim() })}
                onBlur={saveOnBlur}
                placeholder="ChIJ..."
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none font-mono"
              />
              <p className="text-[10px] text-[#7a6a5a] mt-1.5 leading-relaxed">
                {t.socialsTab.googlePlaceIdHint}
              </p>
            </div>
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
            onClick={() => saveNow()}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c381c] hover:bg-[#284f28] disabled:opacity-75 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-98"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white/90" />
            ) : (
              <Save className="w-3.5 h-3.5 text-white/90" />
            )}
            <span>{isSaving ? t.socialsTab.saving : t.socialsTab.saveBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
