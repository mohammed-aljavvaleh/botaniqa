'use client';

import React from 'react';
import { X, Clock, ArrowRight } from 'lucide-react';
import { WorkingHourItem } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';
import {
  TIME_OPTIONS,
  SINGLE_DAYS,
  DAY_PRESETS,
  getDurationText,
} from '../adminHelpers';

interface WorkingHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingHour: WorkingHourItem | null;
  hourForm: {
    dayTr: string;
    dayEn: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
    customText: string;
  };
  setHourForm: React.Dispatch<
    React.SetStateAction<{
      dayTr: string;
      dayEn: string;
      openTime: string;
      closeTime: string;
      isClosed: boolean;
      customText: string;
    }>
  >;
  dayRangeStart: number | null;
  dayRangeEnd: number | null;
  isCustomDay: boolean;
  setIsCustomDay: (val: boolean) => void;
  handleDayClick: (idx: number) => void;
  handlePresetClick: (preset: { id: string; tr: string; en: string; start: number; end: number }) => void;
  onSubmit: (e: React.FormEvent) => void;
  lang: 'tr' | 'en';
}

export default function WorkingHoursModal({
  isOpen,
  onClose,
  editingHour,
  hourForm,
  setHourForm,
  dayRangeStart,
  dayRangeEnd,
  isCustomDay,
  setIsCustomDay,
  handleDayClick,
  handlePresetClick,
  onSubmit,
  lang,
}: WorkingHoursModalProps) {
  if (!isOpen) return null;
  const t = adminTranslations[lang];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-[#ded8cb] rounded-3xl p-4 sm:p-5 shadow-2xl text-[#1c2a1c] my-auto max-h-[92vh] flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#f0ece1] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f2efe6] flex items-center justify-center text-[#1c381c]">
              <Clock className="w-4 h-4 text-[#c1713a]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1c2a1c] tracking-tight">
              {editingHour ? t.hourModal.titleEdit : t.hourModal.titleAdd}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#758a75] hover:text-[#1c2a1c] hover:bg-[#f2efe6] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1 overflow-hidden mt-1">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 py-1 space-y-2.5">
            {/* ── SECTION 1: DAY RANGE SELECTION ── */}
            <div className="p-3 rounded-2xl bg-[#faf8f4] border border-[#ebe5d8]">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#445844] uppercase tracking-wider">
                  {lang === 'tr' ? 'Gün veya Aralık Seçin' : 'Select Day or Range'}
                </label>
                <span className="text-[11px] text-[#788e78]">
                  {dayRangeStart !== null && dayRangeEnd === null
                    ? (lang === 'tr' ? '2. günü seçin' : 'Pick 2nd day')
                    : (lang === 'tr' ? '2 gün = aralık' : '2 days = range')}
                </span>
              </div>

              {/* 7 Days of the Week Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-2">
                {SINGLE_DAYS.map((d, idx) => {
                  const isStart = !isCustomDay && dayRangeStart === idx;
                  const isEnd = !isCustomDay && dayRangeEnd === idx;
                  const isInRange =
                    !isCustomDay &&
                    dayRangeStart !== null &&
                    dayRangeEnd !== null &&
                    idx >= dayRangeStart &&
                    idx <= dayRangeEnd;

                  let btnStyle = 'bg-[#fbfaf8] text-[#3d503d] border-[#ded8cb] hover:bg-[#f2efe6] hover:border-[#cfc7b7]';

                  if (isStart || isEnd) {
                    btnStyle = 'bg-[#1c381c] text-white border-[#1c381c] shadow-sm font-bold scale-[1.02] z-10';
                  } else if (isInRange) {
                    btnStyle = 'bg-[#e5eee5] text-[#1c381c] font-bold border-[#b4ccb4]';
                  }

                  return (
                    <button
                      key={d.short}
                      type="button"
                      onClick={() => handleDayClick(idx)}
                      className={`py-1.5 px-0.5 rounded-xl text-xs transition-all text-center cursor-pointer border ${btnStyle}`}
                    >
                      <span className="block text-xs font-bold leading-tight">{d.short}</span>
                      <span
                        className={`block text-[9px] truncate leading-tight ${isStart || isEnd
                            ? 'text-emerald-200'
                            : isInRange
                              ? 'text-[#2e472e]'
                              : 'text-[#7d917d]'
                          }`}
                      >
                        {lang === 'tr' ? d.tr.slice(0, 3) : d.en.slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Presets & Custom Toggle Row */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] font-bold text-[#778b77] uppercase mr-0.5">
                    {lang === 'tr' ? 'Hazır:' : 'Quick:'}
                  </span>
                  {DAY_PRESETS.map((p) => {
                    const isPresetActive =
                      !isCustomDay && dayRangeStart === p.start && dayRangeEnd === p.end;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePresetClick(p)}
                        className={`text-xs px-2 py-0.5 rounded-lg border transition-all cursor-pointer font-medium ${isPresetActive
                            ? 'bg-[#1c381c] text-white border-[#1c381c] shadow-2xs font-bold'
                            : 'bg-[#fbfaf8] text-[#445844] border-[#ded8cb] hover:bg-[#f2efe6]'
                          }`}
                      >
                        {lang === 'tr' ? p.label : p.en}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomDay(!isCustomDay);
                    if (!isCustomDay) {
                      handleDayClick(0);
                    }
                  }}
                  className="text-[11px] text-[#b85e28] hover:underline font-medium cursor-pointer"
                >
                  {isCustomDay
                    ? (lang === 'tr' ? '← Günler' : '← Days')
                    : (lang === 'tr' ? '+ Özel Gün' : '+ Custom')}
                </button>
              </div>

              {/* Selected Day Confirmation Badge */}
              <div className="p-2 rounded-xl bg-[#f2eee3] border border-[#e4ded0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-[#6d816d]">{lang === 'tr' ? 'Seçilen:' : 'Selected:'}</span>
                  <span className="font-bold text-[#1c381c] truncate">{hourForm.dayTr}</span>
                  {hourForm.dayEn && hourForm.dayEn !== hourForm.dayTr && (
                    <span className="text-[11px] text-[#708470] italic truncate">({hourForm.dayEn})</span>
                  )}
                </div>

                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                  {dayRangeStart !== null && dayRangeEnd !== null
                    ? (lang === 'tr' ? 'Aralık' : 'Range')
                    : (lang === 'tr' ? 'Tek Gün' : 'Single Day')}
                </span>
              </div>

              {/* Optional Custom Holiday input */}
              {isCustomDay && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 animate-fade-in">
                  <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                    {lang === 'tr' ? 'Özel Gün veya Bayram Adı' : 'Custom Holiday or Special Day Name'}
                  </label>
                  <input
                    type="text"
                    value={hourForm.dayTr}
                    onChange={(e) =>
                      setHourForm({ ...hourForm, dayTr: e.target.value, dayEn: e.target.value })
                    }
                    placeholder="örn. Ramazan Bayramı, Yılbaşı..."
                    className="w-full bg-white border border-amber-300 focus:border-amber-600 rounded-lg px-2.5 py-1 text-xs text-[#1c2a1c] outline-none"
                  />
                </div>
              )}
            </div>

            {/* ── SECTION 2: TIME RANGE SELECTION ── */}
            <div className="p-3 rounded-2xl bg-[#faf8f4] border border-[#ebe5d8] space-y-2">
              {/* Closed Toggle Switch */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#445844] uppercase tracking-wider">
                  {lang === 'tr' ? 'Çalışma Saatleri' : 'Working Time'}
                </span>

                <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-xs font-medium text-[#657965]">
                  <input
                    type="checkbox"
                    checked={hourForm.isClosed}
                    onChange={(e) =>
                      setHourForm({ ...hourForm, isClosed: e.target.checked })
                    }
                    className="w-3.5 h-3.5 rounded text-red-600 focus:ring-red-500 border-gray-300 cursor-pointer"
                  />
                  <span className={hourForm.isClosed ? 'text-red-700 font-semibold' : ''}>
                    {t.hourModal.isClosed}
                  </span>
                </label>
              </div>

              {!hourForm.isClosed ? (
                <div className="bg-white p-2.5 rounded-xl border border-[#ded8cb] shadow-2xs">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    {/* Open Time */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#667a66] uppercase mb-1">
                        {t.hourModal.openTime}
                      </label>
                      <select
                        value={hourForm.openTime}
                        onChange={(e) =>
                          setHourForm({
                            ...hourForm,
                            openTime: e.target.value,
                            customText: '',
                          })
                        }
                        className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-2 py-1.5 text-sm font-semibold font-mono text-[#1c2a1c] outline-none cursor-pointer"
                      >
                        {TIME_OPTIONS.map((time) => (
                          <option key={`open-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Arrow separator */}
                    <div className="pt-3.5 text-[#889c88]">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    {/* Close Time */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#667a66] uppercase mb-1">
                        {t.hourModal.closeTime}
                      </label>
                      <select
                        value={hourForm.closeTime}
                        onChange={(e) =>
                          setHourForm({
                            ...hourForm,
                            closeTime: e.target.value,
                            customText: '',
                          })
                        }
                        className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-2 py-1.5 text-sm font-semibold font-mono text-[#b85e28] outline-none cursor-pointer"
                      >
                        {TIME_OPTIONS.map((time) => (
                          <option key={`close-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Duration Info Badge */}
                  {(() => {
                    const dur = getDurationText(
                      hourForm.openTime,
                      hourForm.closeTime,
                      hourForm.isClosed
                    );
                    return dur ? (
                      <div className="mt-1.5 pt-1.5 border-t border-[#f0ece1] flex items-center justify-between text-xs">
                        <span className="text-[#6d816d] text-[11px]">
                          {lang === 'tr' ? 'Hizmet süresi:' : 'Total duration:'}
                        </span>
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                          ✓ {dur}
                        </span>
                      </div>
                    ) : null;
                  })()}
                </div>
              ) : (
                <div className="bg-red-50/80 border border-red-200 p-2.5 rounded-xl text-xs text-red-800 leading-relaxed">
                  {lang === 'tr'
                    ? 'Bu saat aralığı web sitesinde "Kapalı" olarak görünecektir.'
                    : 'This schedule will appear as "Closed" on the website.'}
                </div>
              )}
            </div>

            {/* ── SECTION 3: COMPACT LIVE PREVIEW STRIP ── */}
            <div className="bg-[#f6f4ee] border border-[#ded7c8] px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 truncate">
                <Clock className="w-3.5 h-3.5 text-[#c1713a] shrink-0" />
                <span className="font-bold text-[#1c2a1c] truncate">
                  {hourForm.dayTr || (lang === 'tr' ? 'Örn. Hafta İçi' : 'e.g. Weekdays')}
                </span>
                {hourForm.dayEn && (
                  <span className="text-[11px] text-[#637763] italic truncate">({hourForm.dayEn})</span>
                )}
              </div>

              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg border shrink-0 ${hourForm.isClosed
                    ? 'text-red-700 bg-red-100/70 border-red-300'
                    : 'text-[#b85e28] bg-white border-[#e0dad0]'
                  }`}
              >
                {hourForm.isClosed
                  ? (lang === 'tr' ? 'Kapalı' : 'Closed')
                  : `${hourForm.openTime} – ${hourForm.closeTime}`}
              </span>
            </div>
          </div>

          {/* Form Action Buttons (Sticky in Footer, Never Overflows) */}
          <div className="pt-2.5 mt-1 border-t border-[#f0ece1] flex justify-end gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#f2efe6] hover:bg-[#e6e2d6] text-[#3c503c] text-xs font-medium transition-colors cursor-pointer"
            >
              {t.hourModal.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1c381c] hover:bg-[#284f28] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              {editingHour ? t.hourModal.save : t.hourModal.add}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
