'use client';

import React, { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { adminTranslations } from '@/data/adminTranslations';

interface SecurityTabProps {
  auth: {
    username?: string;
    passwordHash?: string;
  };
  onUpdateAuth: (updates: { username?: string; passwordHash?: string }) => void;
  onReset: () => void;
  lang: 'tr' | 'en';
}

export default function SecurityTab({
  auth,
  onUpdateAuth,
  onReset,
  lang,
}: SecurityTabProps) {
  const [showPassword, setShowPassword] = useState(false);
  const t = adminTranslations[lang];

  return (
    <section className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e4da] space-y-6 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
          {t.securityTab.title}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.securityTab.username}
            </label>
            <input
              type="text"
              autoComplete="username"
              value={auth?.username || 'admin'}
              onChange={(e) => onUpdateAuth({ username: e.target.value.replace(/\s+/g, '') })}
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl py-3 px-4 text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.securityTab.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={auth?.passwordHash || 'botaniqa2024'}
                onChange={(e) => onUpdateAuth({ passwordHash: e.target.value.replace(/\s+/g, '') })}
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl py-3 pl-4 pr-11 text-sm text-[#1c2a1c] outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718771] hover:text-[#1c2a1c] p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#607560] mt-1.5">
              {t.securityTab.saveNotice}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#f0ece1]">
          <h3 className="text-sm font-semibold text-red-700 mb-1.5 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            {t.securityTab.resetTitle}
          </h3>
          <p className="text-xs text-[#5d725d] mb-4">
            {t.securityTab.resetDesc}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {t.securityTab.resetBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
