'use client';

import React from 'react';
import Image from 'next/image';
import { X, Upload, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { CategoryData, MenuItemData } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: MenuItemData | null;
  categories: CategoryData[];
  modalForm: Omit<MenuItemData, 'id'>;
  setModalForm: React.Dispatch<React.SetStateAction<Omit<MenuItemData, 'id'>>>;
  isUploadingMenuPhoto: boolean;
  onUploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  lang: 'tr' | 'en';
}

const TAG_OPTIONS: Array<{ tr: string; en: string }> = [
  { tr: 'Çok Satan', en: 'Bestseller' },
  { tr: 'İmza', en: 'Signature' },
  { tr: 'Mevsimlik', en: 'Seasonal' },
  { tr: 'Premium', en: 'Premium' },
  { tr: 'Yerel', en: 'Local' },
  { tr: 'Günün Özelliği', en: 'Daily Special' },
  { tr: 'Yeni', en: 'New' },
];

export default function MenuModal({
  isOpen,
  onClose,
  editingItem,
  categories,
  modalForm,
  setModalForm,
  isUploadingMenuPhoto,
  onUploadPhoto,
  onSubmit,
  lang,
}: MenuModalProps) {
  if (!isOpen) return null;
  const t = adminTranslations[lang];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-[#e8e4da] rounded-2xl p-5 sm:p-6 shadow-2xl my-auto text-[#1c2a1c] animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#f0ece1] mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1c2a1c] tracking-tight">
              {editingItem ? t.menuModal.titleEdit : t.menuModal.titleAdd}
            </h3>
            <p className="text-[11px] text-[#6b7f6b]">
              {lang === 'tr' ? 'Ürün detaylarını aşağıdan düzenleyebilirsiniz' : 'Configure menu item details below'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#758a75] hover:text-[#1c2a1c] hover:bg-[#f2efe6] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3.5">
          {/* Row 1: Category & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.menuModal.category}
              </label>
              <select
                value={modalForm.category}
                onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1c2a1c] outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.labelTr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.menuModal.price}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={modalForm.price}
                  onChange={(e) => {
                    const sanitized = e.target.value.replace(/[^0-9₺TLtl.,\s]/g, '');
                    setModalForm({ ...modalForm, price: sanitized });
                  }}
                  onBlur={() => {
                    let p = modalForm.price.trim();
                    if (!p) return;
                    if (/^\d+([.,]\d+)?$/.test(p)) {
                      p = `₺${p}`;
                    } else if (p.toLowerCase().endsWith('tl')) {
                      const num = p.replace(/tl/i, '').trim();
                      if (num) p = `₺${num}`;
                    }
                    setModalForm((prev) => ({ ...prev, price: p }));
                  }}
                  placeholder="₺120"
                  className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#b85e28] font-bold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Product Name (Single field) */}
          <div>
            <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
              {lang === 'tr' ? 'Ürün Adı' : 'Product Name'}
            </label>
            <input
              type="text"
              required
              value={modalForm.nameTr}
              onChange={(e) =>
                setModalForm({
                  ...modalForm,
                  nameTr: e.target.value,
                  nameEn: e.target.value,
                })
              }
              placeholder={lang === 'tr' ? 'örn. botaniqa İmza Latte' : 'e.g. botaniqa Signature Latte'}
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          {/* Row 3: Tag & Availability */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
                {t.menuModal.tag}
              </label>
              <select
                value={modalForm.tagTr || ''}
                onChange={(e) => {
                  const tag = e.target.value;
                  const matched = TAG_OPTIONS.find((t) => t.tr === tag);
                  setModalForm({
                    ...modalForm,
                    tagTr: tag,
                    tagEn: matched ? matched.en : '',
                  });
                }}
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1c2a1c] outline-none cursor-pointer"
              >
                <option value="">{t.menuModal.noTag}</option>
                {TAG_OPTIONS.map((tag) => (
                  <option key={tag.tr} value={tag.tr}>
                    {tag.tr} ({tag.en})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={modalForm.available !== false}
                  onChange={(e) => setModalForm({ ...modalForm, available: e.target.checked })}
                  className="w-4 h-4 rounded text-[#1c381c] accent-[#1c381c] cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#3c523c]">
                  {t.menuModal.available}
                </span>
              </label>
            </div>
          </div>

          {/* Row 4: Description (Single field) */}
          <div>
            <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
              {lang === 'tr' ? 'Açıklama' : 'Description'}
            </label>
            <textarea
              rows={2}
              value={modalForm.descTr}
              onChange={(e) =>
                setModalForm({
                  ...modalForm,
                  descTr: e.target.value,
                  descEn: e.target.value,
                })
              }
              placeholder={lang === 'tr' ? 'İçerik ve lezzet notları...' : 'Ingredients and flavor notes...'}
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl p-2.5 text-xs sm:text-sm text-[#1c2a1c] outline-none resize-none"
            />
          </div>

          {/* Row 5: Compact Image Upload */}
          <div>
            <label className="block text-[11px] font-bold text-[#445844] uppercase tracking-wider mb-1">
              {t.menuModal.image}
            </label>
            {modalForm.image ? (
              <div className="flex items-center justify-between gap-3 bg-[#fbfaf8] p-2 rounded-xl border border-[#d8d2c4]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#d8d2c4] bg-stone-100">
                    <Image
                      src={modalForm.image}
                      alt="Ürün"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] text-[#556955] truncate font-mono">
                    {modalForm.image}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setModalForm({ ...modalForm, image: '' })}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  title={t.menuModal.removeImage}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <label
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#d8d2c4] bg-[#fbfaf8] hover:bg-[#f3f0e8] text-xs font-semibold text-[#2c442c] cursor-pointer transition-colors shrink-0 ${
                    isUploadingMenuPhoto ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Upload className={`w-3.5 h-3.5 text-[#c1713a] ${isUploadingMenuPhoto ? 'animate-spin' : ''}`} />
                  <span>{isUploadingMenuPhoto ? t.menuModal.uploading : t.menuModal.uploadBtn}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onUploadPhoto}
                    disabled={isUploadingMenuPhoto}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={modalForm.image || ''}
                  onChange={(e) => setModalForm({ ...modalForm, image: e.target.value })}
                  placeholder={t.menuModal.urlPlaceholder}
                  className="flex-1 bg-[#fbfaf8] border border-[#d8d2c4] focus:border-[#1c381c] rounded-xl px-3 py-2 text-xs text-[#1c2a1c] outline-none"
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-[#f0ece1]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#d8d2c4] hover:bg-[#f2efe6] text-[#3c503c] text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.menuModal.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1c381c] hover:bg-[#254625] text-white text-xs font-semibold transition-all shadow-md shadow-[#1c381c]/20 cursor-pointer"
            >
              {editingItem ? t.menuModal.saveEdit : t.menuModal.saveAdd}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
