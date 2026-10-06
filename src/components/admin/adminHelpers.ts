import { useCallback, useEffect, useRef, useState } from 'react';

export type AdminTab = 'menu' | 'hours' | 'gallery' | 'contact' | 'socials' | 'security';

export const TIME_OPTIONS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30',
  '02:00', '02:30', '03:00',
];

export const DAY_PRESETS = [
  { id: 'weekdays', label: 'Hafta İçi', tr: 'Hafta İçi', en: 'Weekdays', start: 0, end: 4 },
  { id: 'weekends', label: 'Hafta Sonu', tr: 'Hafta Sonu', en: 'Weekends', start: 5, end: 6 },
  { id: 'everyday', label: 'Her Gün', tr: 'Her Gün', en: 'Every Day', start: 0, end: 6 },
];

export const DAY_OPTIONS = [
  { id: 'mon-thu', label: 'Pazartesi – Perşembe', tr: 'Pazartesi – Perşembe', en: 'Monday – Thursday' },
  ...DAY_PRESETS,
];

export const SINGLE_DAYS = [
  { short: 'Pzt', tr: 'Pazartesi', en: 'Monday' },
  { short: 'Sal', tr: 'Salı', en: 'Tuesday' },
  { short: 'Çar', tr: 'Çarşamba', en: 'Wednesday' },
  { short: 'Per', tr: 'Perşembe', en: 'Thursday' },
  { short: 'Cum', tr: 'Cuma', en: 'Friday' },
  { short: 'Cmt', tr: 'Cumartesi', en: 'Saturday' },
  { short: 'Paz', tr: 'Pazar', en: 'Sunday' },
];

export const parseDayRangeIndices = (dayStr: string): { start: number; end: number | null } => {
  if (!dayStr) return { start: -1, end: null };
  const lower = dayStr.toLowerCase().trim();
  if (lower.includes('hafta içi') || lower.includes('weekdays')) return { start: 0, end: 4 };
  if (lower.includes('hafta sonu') || lower.includes('weekends')) return { start: 5, end: 6 };
  if (lower.includes('her gün') || lower.includes('every day')) return { start: 0, end: 6 };

  const parts = dayStr.split(/\s*[–\-—]\s*/);
  if (parts.length >= 2) {
    const sIdx = SINGLE_DAYS.findIndex(
      (d) => d.tr.toLowerCase() === parts[0].trim().toLowerCase() || d.en.toLowerCase() === parts[0].trim().toLowerCase()
    );
    const eIdx = SINGLE_DAYS.findIndex(
      (d) => d.tr.toLowerCase() === parts[1].trim().toLowerCase() || d.en.toLowerCase() === parts[1].trim().toLowerCase()
    );
    if (sIdx !== -1 && eIdx !== -1) {
      return { start: Math.min(sIdx, eIdx), end: Math.max(sIdx, eIdx) };
    }
  }

  const sIdx = SINGLE_DAYS.findIndex(
    (d) => d.tr.toLowerCase() === lower || d.en.toLowerCase() === lower
  );
  if (sIdx !== -1) {
    return { start: sIdx, end: null };
  }

  return { start: -1, end: null };
};

export const parseTimeToNumber = (timeStr: string): number => {
  if (!timeStr) return 8;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) + (m ? m / 60 : 0);
};

export const parseCloseTimeToNumber = (closeStr: string, openVal: number): number => {
  if (!closeStr) return 22;
  let val = parseTimeToNumber(closeStr);
  if (val <= openVal && val <= 6) {
    val += 24;
  }
  return val;
};

export const getDurationText = (openStr: string, closeStr: string, isClosed: boolean): string | null => {
  if (isClosed) return null;
  const o = parseTimeToNumber(openStr);
  const c = parseCloseTimeToNumber(closeStr, o);
  const diff = c - o;
  if (diff <= 0) return null;
  const hours = Math.floor(diff);
  const mins = Math.round((diff - hours) * 60);
  if (mins === 0) return `${hours} saat`;
  return `${hours} saat ${mins} dk`;
};

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressed = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                resolve(compressed);
              } else {
                resolve(file);
              }
            },
            'image/webp',
            0.82
          );
        } else {
          resolve(file);
        }
      };
    };
    reader.readAsDataURL(file);
  });
};

// ─── Hybrid save manager hook ───────────────────────────────────────────────
// Provides:
// 1. saveNow(): Immediate save when user clicks "Değişiklikleri Kaydet"
// 2. saveOnBlur(): Debounced auto-save (350ms) when user finishes editing a field
// 3. saveStatus & isSaving: UI feedback ('idle' | 'saving' | 'saved' | 'error')

export type SaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

const SAVED_DISPLAY_MS = 2500;
const BLUR_DEBOUNCE_MS = 350;

export function useSaveManager(saveToServer: () => Promise<boolean>) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const saveNow = useCallback(async (): Promise<boolean> => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);

    setSaveStatus('saving');
    try {
      const ok = await saveToServer();
      if (!isMountedRef.current) return ok;
      setSaveStatus(ok ? 'saved' : 'error');

      savedTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) setSaveStatus('idle');
      }, SAVED_DISPLAY_MS);

      return ok;
    } catch {
      if (isMountedRef.current) setSaveStatus('error');
      return false;
    }
  }, [saveToServer]);

  const saveOnBlur = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (!isMountedRef.current) return;
      await saveNow();
    }, BLUR_DEBOUNCE_MS);
  }, [saveNow]);

  return {
    saveStatus,
    isSaving: saveStatus === 'saving',
    saveNow,
    saveOnBlur,
    triggerSave: saveNow, // alias for backwards compatibility
  };
}

export const useDebouncedSave = useSaveManager;

