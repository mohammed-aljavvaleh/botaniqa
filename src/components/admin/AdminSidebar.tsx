'use client';

import React from 'react';
import Link from 'next/link';
import {
  Coffee,
  Camera,
  Clock,
  MapPin,
  Share2,
  Shield,
  X,
  LogOut,
  Eye,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { AdminTab } from './adminHelpers';
import { adminTranslations } from '@/data/adminTranslations';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
  menuCount: number;
  hoursCount: number;
  galleryCount: number;
  lang: 'tr' | 'en';
  setLang: (lang: 'tr' | 'en') => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  onLogout,
  menuCount,
  hoursCount,
  galleryCount,
  lang,
  setLang,
}: AdminSidebarProps) {
  const t = adminTranslations[lang];

  const navTabs = [
    { id: 'menu' as AdminTab, label: t.tabs.menu, icon: Coffee, count: menuCount },
    { id: 'gallery' as AdminTab, label: t.tabs.gallery, icon: Camera, count: galleryCount },
    { id: 'hours' as AdminTab, label: t.tabs.hours, icon: Clock, count: hoursCount },
    { id: 'contact' as AdminTab, label: t.tabs.contact, icon: MapPin },
    { id: 'socials' as AdminTab, label: t.tabs.socials, icon: Share2 },
    { id: 'security' as AdminTab, label: t.tabs.security, icon: Shield },
  ];

  return (
    <>
      {/* ── Mobile Slide-over Sidebar Drawer ─────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-72 max-w-full bg-white shadow-2xl z-10 flex flex-col justify-between p-5 animate-slide-right">
            <div>
              {/* Header with close */}
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ece1] mb-5">
                <div className="flex items-center gap-3">
                  <Logo variant="mark" size={38} />
                  <div>
                    <span className="font-extrabold text-lg text-[#1c351c] tracking-tight block">
                      botaniqa
                    </span>
                    <span className="text-[10px] text-[#677b67] tracking-wider uppercase">
                      {t.header.consoleSub}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-[#758a75] hover:text-[#1c2a1c] hover:bg-[#f2efe6] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6b806b] px-3 mb-2">
                  {lang === 'tr' ? 'YÖNETİM MENÜSÜ' : 'MANAGEMENT'}
                </div>
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                        ? 'bg-[#1c381c] text-white shadow-sm'
                        : 'text-[#4e624e] hover:text-[#1c381c] hover:bg-[#f4f1e8]'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#e8c68a]' : 'opacity-70'}`} />
                        <span>{tab.label}</span>
                      </div>
                      {typeof tab.count === 'number' && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#ede9df] text-[#5e735e]'
                            }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#f0ece1] space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-[#ded8cb] bg-[#fbfaf8] p-0.5 text-xs font-bold shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setLang('tr')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === 'tr'
                      ? 'bg-[#1c381c] text-white shadow-xs'
                      : 'text-[#607360] hover:text-[#1c381c]'
                      }`}
                  >
                    TR
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === 'en'
                      ? 'bg-[#1c381c] text-white shadow-xs'
                      : 'text-[#607360] hover:text-[#1c381c]'
                      }`}
                  >
                    EN
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 border border-[#ded8cb] hover:border-red-200 text-xs font-semibold text-[#607360] hover:text-red-700 transition-colors cursor-pointer"
                  title={t.header.logout}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.header.logout}</span>
                </button>
              </div>

              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#f4f1e8] hover:bg-[#e8e4da] text-xs font-semibold text-[#2c442c] transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.header.viewSite}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop Permanent Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 h-screen sticky top-0 bg-white border-r border-[#e8e4da] flex-col justify-between p-5 z-30 shadow-2xs">
        <div>
          {/* Top Brand & Logo */}
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 pb-5 border-b border-[#f0ece1] hover:opacity-95 transition-opacity"
            title={t.header.viewSite}
          >
            <Logo
              variant="mark"
              size={46}
              className="transition-transform group-hover:scale-105 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#1c351c] tracking-tight group-hover:text-[#c1713a] transition-colors truncate">
                  BOTANIQA
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#edf3ed] text-[#1c381c] border border-[#d2e0d2]">
                  {t.header.adminBadge}
                </span>
              </div>
              <p className="text-[10px] text-[#677b67] tracking-wider uppercase truncate">
                {t.header.consoleSub}
              </p>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 mt-6">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6b806b] px-3 mb-2">
              {lang === 'tr' ? 'YÖNETİM MENÜSÜ' : 'MANAGEMENT'}
            </div>
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                    ? 'bg-[#1c381c] text-white shadow-sm'
                    : 'text-[#4e624e] hover:text-[#1c381c] hover:bg-[#f4f1e8]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#e8c68a]' : 'opacity-70'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {typeof tab.count === 'number' && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#ede9df] text-[#5e735e]'
                        }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="pt-4 border-t border-[#f0ece1] space-y-3">
          {/* Language Switcher & Logout */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center rounded-full border border-[#ded8cb] bg-[#fbfaf8] p-0.5 text-xs font-bold shadow-2xs">
              <button
                type="button"
                onClick={() => setLang('tr')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === 'tr'
                  ? 'bg-[#1c381c] text-white shadow-xs'
                  : 'text-[#607360] hover:text-[#1c381c]'
                  }`}
                title="Türkçe"
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === 'en'
                  ? 'bg-[#1c381c] text-white shadow-xs'
                  : 'text-[#607360] hover:text-[#1c381c]'
                  }`}
                title="English"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 border border-[#ded8cb] hover:border-red-200 text-xs font-semibold text-[#607360] hover:text-red-700 transition-colors cursor-pointer"
              title={t.header.logout}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.header.logout}</span>
            </button>
          </div>

          {/* View Website Link */}
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#f4f1e8] hover:bg-[#e8e4da] text-xs font-semibold text-[#2c442c] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.header.viewSite}</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
