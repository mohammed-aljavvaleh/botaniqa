'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Eye, EyeOff, CheckCircle2, Lock, Save, Loader2 } from 'lucide-react';
import { adminTranslations } from '@/data/adminTranslations';

interface SecurityTabProps {
  auth: {
    username?: string;
    passwordHash?: string;
  };
  onUpdateAuth: (updates: { username?: string; passwordHash?: string }) => Promise<boolean> | Promise<void> | void;
  onReset: () => void;
  lang: 'tr' | 'en';
}

export default function SecurityTab({
  auth,
  onUpdateAuth,
  onReset,
  lang,
}: SecurityTabProps) {
  const t = adminTranslations[lang];
  const [showPassword, setShowPassword] = useState(false);

  // Local state for free typing without keystroke overwrites or snap-backs
  const [username, setUsername] = useState(auth?.username || 'admin');
  const [password, setPassword] = useState(auth?.passwordHash || 'botaniqa2024');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize when external auth changes (e.g. after initial DB fetch)
  useEffect(() => {
    if (auth?.username !== undefined) {
      setUsername(auth.username || 'admin');
    }
    if (auth?.passwordHash !== undefined) {
      setPassword(auth.passwordHash || 'botaniqa2024');
    }
  }, [auth?.username, auth?.passwordHash]);

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (cleanUser.length < 3) {
      setError(t.securityTab.usernameError);
      return;
    }

    if (cleanPass.length < 4) {
      setError(t.securityTab.passwordError);
      return;
    }

    setIsSaving(true);
    try {
      await onUpdateAuth({
        username: cleanUser,
        passwordHash: cleanPass,
      });
      setSuccessMsg(t.securityTab.saveSuccess);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch {
      setError(t.toasts.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-6 animate-fade-in max-w-2xl">
      <form onSubmit={handleSaveCredentials} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e4da] space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1c381c]/10 text-[#1c381c] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
                {t.securityTab.title}
              </h2>
              <p className="text-xs text-[#607560] mt-0.5">
                {t.securityTab.saveNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Feedback banners */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.securityTab.username}
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(null);
                setSuccessMsg(null);
              }}
              placeholder="admin"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl py-3 px-4 text-sm text-[#1c2a1c] outline-none transition-colors"
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] focus:bg-white rounded-xl py-3 pl-4 pr-11 text-sm text-[#1c2a1c] outline-none font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718771] hover:text-[#1c2a1c] p-1 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c381c] hover:bg-[#254625] text-white text-sm font-semibold shadow-md shadow-[#1c381c]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{t.securityTab.saveBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Factory Reset Danger Zone */}
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
      </form>
    </section>
  );
}
