'use client';

import { Mail, Phone, Heart } from 'lucide-react';
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
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';
import { useCafeData } from '@/context/CafeDataContext';
import Logo from '@/components/Logo';

export default function Footer() {
  const { t, lang } = useLang();
  const { data: cafeData } = useCafeData();
  const f = t.footer;
  const contact = cafeData.contact;
  const socials = cafeData.socials;
  const currentYear = new Date().getFullYear();
  const addressText = lang === 'tr' ? contact.addressTr : contact.addressEn;

  return (
    <footer className="bg-[#0f1f0f] text-[#8bbf8b]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo
                variant="compact"
                size={44}
              />
            </div>
            <p className="text-[#6a9e6a] text-sm leading-relaxed max-w-xs mb-6">{f.tagline}</p>
            {/* Socials - only rendered if provided */}
            <div className="flex flex-wrap gap-2.5">
              {socials.instagramUrl?.trim() && (
                <a
                  id="footer-instagram"
                  href={socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-[#c1713a] hover:bg-[#c1713a]/10 text-[#6a9e6a] hover:text-[#e8a97a] flex items-center justify-center transition-all duration-300"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
              )}
              {socials.whatsappUrl?.trim() && (
                <a
                  id="footer-whatsapp"
                  href={socials.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-emerald-500 hover:bg-emerald-500/10 text-[#6a9e6a] hover:text-emerald-400 flex items-center justify-center transition-all duration-300"
                >
                  <SiWhatsapp className="w-4 h-4" />
                </a>
              )}
              {socials.tiktokUrl?.trim() && (
                <a
                  id="footer-tiktok"
                  href={socials.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-pink-500 hover:bg-pink-500/10 text-[#6a9e6a] hover:text-pink-400 flex items-center justify-center transition-all duration-300"
                >
                  <SiTiktok className="w-4 h-4" />
                </a>
              )}
              {socials.twitterUrl?.trim() && (
                <a
                  id="footer-twitter"
                  href={socials.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-white hover:bg-white/10 text-[#6a9e6a] hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <SiX className="w-3.5 h-3.5" />
                </a>
              )}
              {socials.facebookUrl?.trim() && (
                <a
                  id="footer-facebook"
                  href={socials.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-blue-500 hover:bg-blue-500/10 text-[#6a9e6a] hover:text-blue-400 flex items-center justify-center transition-all duration-300"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
              )}
              {socials.youtubeUrl?.trim() && (
                <a
                  id="footer-youtube"
                  href={socials.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-red-500 hover:bg-red-500/10 text-[#6a9e6a] hover:text-red-400 flex items-center justify-center transition-all duration-300"
                >
                  <SiYoutube className="w-4 h-4" />
                </a>
              )}
              {socials.tripadvisorUrl?.trim() && (
                <a
                  id="footer-tripadvisor"
                  href={socials.tripadvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TripAdvisor"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-emerald-500 hover:bg-emerald-500/10 text-[#6a9e6a] hover:text-emerald-400 flex items-center justify-center transition-all duration-300"
                >
                  <SiTripadvisor className="w-4 h-4" />
                </a>
              )}
              {socials.googleMapsUrl?.trim() && (
                <a
                  id="footer-maps"
                  href={socials.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={lang === 'tr' ? 'Google Haritalar' : 'Google Maps'}
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-[#c8aa6e] hover:bg-[#c8aa6e]/10 text-[#6a9e6a] hover:text-[#c8aa6e] flex items-center justify-center transition-all duration-300"
                >
                  <SiGooglemaps className="w-4 h-4" />
                </a>
              )}
              {contact.email?.trim() && (
                <a
                  id="footer-email"
                  href={`mailto:${contact.email}`}
                  aria-label="Email Botaniqa"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-[#8bbf8b] hover:bg-[#4a7a4a]/10 text-[#6a9e6a] hover:text-[#8bbf8b] flex items-center justify-center transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {contact.phone?.trim() && (
                <a
                  id="footer-phone"
                  href={`tel:${contact.phoneRaw || contact.phone.replace(/\s+/g, '')}`}
                  aria-label="Botaniqa Telefon"
                  className="w-10 h-10 rounded-full bg-[#1e3a1e] border border-[#2d4a2d] hover:border-[#8bbf8b] hover:bg-[#4a7a4a]/10 text-[#6a9e6a] hover:text-[#8bbf8b] flex items-center justify-center transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-[#fdf8f0] mb-4 tracking-wide text-sm uppercase">{f.explore}</h3>
            <ul className="flex flex-col gap-2.5">
              {f.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#6a9e6a] hover:text-[#b8d9b8] text-sm transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (empty slots will not show) */}
          <div>
            <h3 className="font-semibold text-[#fdf8f0] mb-4 tracking-wide text-sm uppercase">{f.contact}</h3>
            <div className="flex flex-col gap-3">
              {socials.instagramUrl?.trim() && socials.instagramHandle?.trim() && (
                <div>
                  <div className="text-[#4a7a4a] text-xs uppercase tracking-widest mb-1">{f.instagram}</div>
                  <a href={socials.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#6a9e6a] hover:text-[#b8d9b8] text-sm transition-colors">
                    {socials.instagramHandle}
                  </a>
                </div>
              )}
              {contact.email?.trim() && (
                <div>
                  <div className="text-[#4a7a4a] text-xs uppercase tracking-widest mb-1">{f.email}</div>
                  <a href={`mailto:${contact.email}`} className="text-[#6a9e6a] hover:text-[#b8d9b8] text-sm transition-colors">
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone?.trim() && (
                <div>
                  <div className="text-[#4a7a4a] text-xs uppercase tracking-widest mb-1">{f.phone}</div>
                  <a href={`tel:${contact.phoneRaw || contact.phone.replace(/\s+/g, '')}`} className="text-[#6a9e6a] hover:text-[#b8d9b8] text-sm transition-colors">
                    {contact.phone}
                  </a>
                </div>
              )}
              {addressText?.trim() && (
                <div>
                  <div className="text-[#4a7a4a] text-xs uppercase tracking-widest mb-1">{f.address}</div>
                  <p className="text-[#6a9e6a] text-sm leading-relaxed whitespace-pre-line">{addressText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a2e1a] py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3d5c3d]">
          <div>
            <p>© {currentYear} BOTANİQA CAFE. {f.copyright}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#4d704d] font-light tracking-wider uppercase">
              {lang === 'tr' ? 'Geliştirici' : 'Crafted by'}
            </span>
            <div className="flex items-center gap-2 group/sig">
              <span className="text-xs font-medium tracking-wider text-[#b8d9b8] group-hover/sig:text-white transition-colors font-mono">
                MBN
              </span>
              <Image
                src="/signature-light.png"
                alt="MBN Signature"
                width={120}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain opacity-75 group-hover/sig:opacity-100 transition-all duration-300 group-hover/sig:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
