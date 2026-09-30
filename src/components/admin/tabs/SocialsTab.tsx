'use client';

import React from 'react';
import { Info } from 'lucide-react';
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
  };
  onUpdateSocials: (updates: Partial<SocialsTabProps['socials']>) => void;
  lang: 'tr' | 'en';
}

export default function SocialsTab({
  socials,
  onUpdateSocials,
  lang,
}: SocialsTabProps) {
  const t = adminTranslations[lang];

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
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {t.socialsTab.title}
          </h2>
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
                }}
                placeholder="https://maps.google.com/?q=Botaniqa"
                className="w-full bg-white border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
