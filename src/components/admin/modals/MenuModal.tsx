'use client';

import React from 'react';
import Image from 'next/image';
import { X, Upload } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#ded8cb] rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-[#1c2a1c]">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0ece1] mb-6">
          <h3 className="text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {editingItem ? t.menuModal.titleEdit : t.menuModal.titleAdd}
          </h3>
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
              {t.menuModal.category}
            </label>
            <select
              value={modalForm.category}
              onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.labelTr} {cat.labelEn && cat.labelEn !== cat.labelTr ? `(${cat.labelEn})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
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
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
                {t.menuModal.price}
              </label>
              <input
                type="text"
                required
                value={modalForm.price}
                onChange={(e) => {
                  // Allow only digits, currency symbol ₺/TL, decimal separator, and spaces
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
                placeholder="örn. ₺120"
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#b85e28] font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
                {t.menuModal.tag}
              </label>
              <select
                value={modalForm.tagTr}
                onChange={(e) => {
                  const tag = e.target.value;
                  const enMap: Record<string, string> = {
                    'Çok Satan': 'Bestseller',
                    'İmza': 'Signature',
                    'Mevsimlik': 'Seasonal',
                    'Premium': 'Premium',
                    'Yerel': 'Local',
                    'Günün Özelliği': 'Daily Special',
                    'Yeni': 'New',
                  };
                  setModalForm({
                    ...modalForm,
                    tagTr: tag,
                    tagEn: enMap[tag] || '',
                  });
                }}
                className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3.5 py-2.5 text-sm text-[#1c2a1c] outline-none"
              >
                <option value="">{t.menuModal.noTag}</option>
                <option value="Çok Satan">Çok Satan (Bestseller)</option>
                <option value="İmza">İmza (Signature)</option>
                <option value="Mevsimlik">Mevsimlik (Seasonal)</option>
                <option value="Premium">Premium</option>
                <option value="Yerel">Yerel (Local)</option>
                <option value="Günün Özelliği">Günün Özelliği (Daily Special)</option>
                <option value="Yeni">Yeni (New)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {lang === 'tr' ? 'Ürün Açıklaması' : 'Product Description'}
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
              className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl p-3 text-sm text-[#1c2a1c] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#445844] uppercase tracking-wider mb-1.5">
              {t.menuModal.image}
            </label>
            {modalForm.image ? (
              <div className="flex items-center gap-4 bg-[#fbfaf8] p-3 rounded-xl border border-[#d8d2c4]">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#d8d2c4]">
                  <Image
                    src={modalForm.image}
                    alt="Ürün önizleme"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#1c2a1c] truncate font-mono">{modalForm.image}</p>
                  <button
                    type="button"
                    onClick={() => setModalForm({ ...modalForm, image: '' })}
                    className="text-xs text-red-600 hover:text-red-700 mt-1 cursor-pointer underline"
                  >
                    {t.menuModal.removeImage}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-[#b8c7b8] bg-[#fbfaf8] hover:bg-[#f3f0e8] text-xs sm:text-sm text-[#2c442c] cursor-pointer transition-colors ${
                    isUploadingMenuPhoto ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Upload
                    className={`w-4 h-4 text-[#c1713a] ${
                      isUploadingMenuPhoto ? 'animate-spin' : ''
                    }`}
                  />
                  <span>
                    {isUploadingMenuPhoto ? t.menuModal.uploading : t.menuModal.uploadBtn}
                  </span>
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
                  className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3 py-2 text-xs text-[#1c2a1c] outline-none"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="itemAvailable"
              checked={modalForm.available !== false}
              onChange={(e) => setModalForm({ ...modalForm, available: e.target.checked })}
              className="w-4 h-4 rounded text-[#c1713a] focus:ring-0 border-[#d8d2c4]"
            />
            <label
              htmlFor="itemAvailable"
              className="text-xs text-[#3c523c] font-medium cursor-pointer"
            >
              {t.menuModal.available}
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-[#f0ece1]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#f2efe6] hover:bg-[#e6e2d6] text-[#3c503c] text-sm font-medium transition-colors cursor-pointer"
            >
              {t.menuModal.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-sm font-semibold transition-all shadow-md shadow-[#c1713a]/20 cursor-pointer"
            >
              {editingItem ? t.menuModal.saveEdit : t.menuModal.saveAdd}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
