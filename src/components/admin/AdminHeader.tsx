'use client';

import React from 'react';
import {
  Menu as MenuIcon,
  Loader2,
  Coffee,
  Camera,
  Clock,
  MapPin,
  Share2,
  Shield,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { AdminTab } from './adminHelpers';
import { adminTranslations } from '@/data/adminTranslations';

interface AdminHeaderProps {
  activeTab: AdminTab;
  isSaving: boolean;
  onToggleMobileSidebar: () => void;
  lang: 'tr' | 'en';
}

const TAB_ICONS: Record<AdminTab, any> = {
  menu: Coffee,
  gallery: Camera,
  hours: Clock,
  contact: MapPin,
  socials: Share2,
  security: Shield,
};

export default function AdminHeader({
  activeTab,
  isSaving,
  onToggleMobileSidebar,
  lang,
}: AdminHeaderProps) {
  const t = adminTranslations[lang];
  const Icon = TAB_ICONS[activeTab] || Coffee;
  const label = t.tabs[activeTab];

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#e7e3d8] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
      <div className="flex items-center gap-3">
        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#ded8cb] text-[#1c381c] hover:bg-[#f5f2e9] cursor-pointer"
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        {/* Mobile Logo Branding */}
        <div className="lg:hidden flex items-center gap-2">
          <Logo variant="mark" size={32} />
          <span className="font-bold text-base text-[#1c351c] tracking-tight">botaniqa</span>
        </div>

        {/* Desktop Active Tab Title & Icon */}
        <div className="hidden lg:flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f2efe6] flex items-center justify-center text-[#1c381c]">
              <Icon className="w-4 h-4 text-[#c1713a]" />
            </div>
            <span className="text-lg font-bold text-[#1c2a1c] tracking-tight">
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle saving spinner — only visible while a save is in progress */}
      {isSaving && (
        <Loader2 className="w-4 h-4 animate-spin text-[#c1713a]" />
      )}
    </header>
  );
}
