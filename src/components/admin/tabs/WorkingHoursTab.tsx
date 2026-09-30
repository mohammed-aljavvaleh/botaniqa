'use client';

import React from 'react';
import { Clock, Plus, Edit2, Trash2 } from 'lucide-react';
import { WorkingHourItem } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';

interface WorkingHoursTabProps {
  hours: WorkingHourItem[];
  onOpenAddHourModal: () => void;
  onOpenEditHourModal: (item: WorkingHourItem) => void;
  onDeleteHour: (id: string, day: string) => void;
  lang: 'tr' | 'en';
}

export default function WorkingHoursTab({
  hours,
  onOpenAddHourModal,
  onOpenEditHourModal,
  onDeleteHour,
  lang,
}: WorkingHoursTabProps) {
  const t = adminTranslations[lang];

  return (
    <section className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#e8e4da] shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {t.hoursTab.title}
          </h2>
          <p className="text-xs text-[#5d725d] mt-1">
            {t.hoursTab.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddHourModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c381c] hover:bg-[#284f28] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.hoursTab.addBtn}</span>
        </button>
      </div>

      <div className="space-y-3">
        {hours.map((hour) => {
          const isClosed =
            hour.time.toLowerCase().includes('kapalı') ||
            hour.time.toLowerCase().includes('closed');
          return (
            <div
              key={hour.id}
              className="bg-white border border-[#e8e4da] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#d0c9b8] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f2efe6] flex items-center justify-center text-[#1c381c] flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#c1713a]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1c2a1c]">{hour.dayTr}</h4>
                  {hour.dayEn && (
                    <p className="text-xs text-[#607560] italic">EN: {hour.dayEn}</p>
                  )}
                  <p className="text-[11px] text-[#7d917d] mt-0.5">
                    {isClosed
                      ? (lang === 'tr' ? 'İşletme Kapalı' : 'Closed all day')
                      : `${lang === 'tr' ? 'Açılış' : 'Opens'}: ${String(Math.floor(hour.openHour)).padStart(2, '0')}:00 • ${lang === 'tr' ? 'Kapanış' : 'Closes'}: ${String(Math.floor(hour.closeHour) % 24).padStart(2, '0')}:00`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <span
                  className={`font-mono text-sm font-semibold px-3 py-1 rounded-lg border ${
                    isClosed
                      ? 'text-red-700 bg-red-50 border-red-200'
                      : 'text-[#b85e28] bg-[#fbf5ea] border-[#f0dfc2]'
                  }`}
                >
                  {hour.time}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenEditHourModal(hour)}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1c381c] border border-emerald-200 transition-colors cursor-pointer"
                  title={t.hoursTab.edit}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteHour(hour.id, hour.dayTr)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                  title={t.hoursTab.delete}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
