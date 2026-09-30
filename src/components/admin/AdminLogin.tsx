'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { adminTranslations } from '@/data/adminTranslations';

interface AdminLoginProps {
  usernameInput: string;
  setUsernameInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  loginError: string;
  onSubmit: (e: React.FormEvent) => void;
  lang: 'tr' | 'en';
  setLang: (lang: 'tr' | 'en') => void;
}

export default function AdminLogin({
  usernameInput,
  setUsernameInput,
  passwordInput,
  setPasswordInput,
  showPassword,
  setShowPassword,
  loginError,
  onSubmit,
  lang,
  setLang,
}: AdminLoginProps) {
  const t = adminTranslations[lang];

  return (
    <div className="font-admin min-h-screen bg-[#f8f7f4] text-[#1c2a1c] flex items-center justify-center p-4 selection:bg-[#c8aa6e]/30 relative overflow-hidden">
      {/* Subtle Ambient Decorative Circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-100/60 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-white border border-[#e6e2d8] rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-200/50">
        {/* Top Row: Language Toggle & Back to Site */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#f0ece1]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#5e735e] hover:text-[#1c381c] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.login.backToSite}</span>
          </Link>

          {/* Language Toggle Pill */}
          <div className="inline-flex items-center rounded-full border border-[#ded8cb] bg-[#fbfaf8] p-0.5 text-xs font-bold shadow-2xs">
            <button
              type="button"
              onClick={() => setLang('tr')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'tr'
                  ? 'bg-[#1c381c] text-white shadow-xs'
                  : 'text-[#607360] hover:text-[#1c381c]'
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#1c381c] text-white shadow-xs'
                  : 'text-[#607360] hover:text-[#1c381c]'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo
              variant="mark"
              size={70}
              className="shadow-lg shadow-black/10 hover:scale-105 transition-transform"
            />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#f3f0e6] border border-[#e4dfd2] text-[11px] font-semibold tracking-widest text-[#3d523d] uppercase mb-2">
            {t.login.badge}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c2a1c] tracking-tight">
            botaniqa café
          </h1>
          <p className="text-xs text-[#607560] mt-1.5 max-w-xs mx-auto leading-relaxed">
            {t.login.subtitle}
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          action="javascript:void(0);"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.login.usernameLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-base sm:text-sm text-[#1c2a1c] placeholder:text-[#9faaa0] outline-none transition-all shadow-xs"
              />
              <User className="w-4 h-4 text-[#758a75] absolute left-3.5 top-3.5 sm:top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.login.passwordLabel}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl py-3 pl-11 pr-11 text-base sm:text-sm text-[#1c2a1c] placeholder:text-[#9faaa0] outline-none transition-all shadow-xs"
              />
              <Lock className="w-4 h-4 text-[#758a75] absolute left-3.5 top-3.5 sm:top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-[#758a75] hover:text-[#1c2a1c] transition-colors cursor-pointer p-1"
                aria-label="Şifreyi Göster/Gizle"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            onClick={(e) => {
              if (usernameInput && passwordInput) {
                onSubmit(e);
              }
            }}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1c381c] hover:bg-[#254d25] text-white text-sm font-semibold transition-all shadow-md shadow-[#1c381c]/20 hover:shadow-lg hover:shadow-[#1c381c]/30 cursor-pointer"
          >
            {t.login.signInBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
