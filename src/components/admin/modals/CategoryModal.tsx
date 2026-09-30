'use client';

import React from 'react';
import { X, FolderPlus } from 'lucide-react';
import { CategoryData } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: CategoryData | null;
  categoryForm: {
    id: string;
    labelTr: string;
    labelEn: string;
  };
  setCategoryForm: React.Dispatch<
    React.SetStateAction<{
      id: string;
      labelTr: string;
      labelEn: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  lang: 'tr' | 'en';
}

export default function CategoryModal({
  isOpen,
  onClose,
  editingCategory,
  categoryForm,
  setCategoryForm,
  onSubmit,
  lang,
}: CategoryModalProps) {
  if (!isOpen) return null;
  const t = adminTranslations[lang];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white border border-[#ded8cb] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#1c2a1c]">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0ece1] mb-6">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[#c1713a]" />
            <h3 className="text-2xl font-bold text-[#1c2a1c] tracking-tight">
              {editingCategory ? t.categoryModal.titleEdit : t.categoryModal.titleAdd}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#758a75] hover:text-[#1c2a1c] hover:bg-[#f2efe6] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.categoryModal.labelTr}
            </label>
            <input
              type="text"
              required
              value={categoryForm.labelTr}
              onChange={(e) => setCategoryForm({ ...categoryForm, labelTr: e.target.value })}
              placeholder="örn. Kahvaltı veya Soğuk İçecekler"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.categoryModal.labelEn}
            </label>
            <input
              type="text"
              value={categoryForm.labelEn}
              onChange={(e) => setCategoryForm({ ...categoryForm, labelEn: e.target.value })}
              placeholder="e.g. Breakfast or Cold Drinks"
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            />
            <p className="text-[11px] text-[#607560] mt-1">
              {t.categoryModal.labelEnHint}
            </p>
          </div>

          {!editingCategory && (
            <div>
              <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
                {t.categoryModal.slug}
              </label>
              <input
                type="text"
                value={categoryForm.id}
                onChange={(e) => {
                  const sanitized = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '-');
                  setCategoryForm({ ...categoryForm, id: sanitized });
                }}
                placeholder="örn. kahvalti (boş bırakırsanız otomatik oluşturulur)"
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#1c2a1c] outline-none"
              />
              <p className="text-[11px] text-[#607560] mt-1">
                {t.categoryModal.slugHint}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-[#f0ece1]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#f2efe6] hover:bg-[#e6e2d6] text-[#3c503c] text-sm font-medium transition-colors cursor-pointer"
            >
              {t.categoryModal.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-sm font-semibold transition-all shadow-md shadow-[#c1713a]/20 cursor-pointer"
            >
              {editingCategory ? t.categoryModal.saveEdit : t.categoryModal.saveAdd}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
