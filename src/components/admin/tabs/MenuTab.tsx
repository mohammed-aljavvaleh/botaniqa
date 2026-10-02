'use client';

import React from 'react';
import Image from 'next/image';
import {
  Coffee,
  Plus,
  Edit2,
  Trash2,
  FolderPlus,
} from 'lucide-react';
import { CategoryData, MenuItemData } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';

interface MenuTabProps {
  categories: CategoryData[];
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  menu: MenuItemData[];
  onOpenAddCategoryModal: () => void;
  onOpenEditCategoryModal: (cat: CategoryData) => void;
  onDeleteCategory: (catId: string, label: string) => void;
  onOpenAddMenuModal: () => void;
  onOpenEditMenuModal: (item: MenuItemData) => void;
  onDeleteMenuItem: (id: string, name: string) => void;
  onToggleItemAvailability: (id: string) => void;
  lang: 'tr' | 'en';
}

export default function MenuTab({
  categories,
  selectedCategory,
  setSelectedCategory,
  menu,
  onOpenAddCategoryModal,
  onOpenEditCategoryModal,
  onDeleteCategory,
  onOpenAddMenuModal,
  onOpenEditMenuModal,
  onDeleteMenuItem,
  onToggleItemAvailability,
  lang,
}: MenuTabProps) {
  const t = adminTranslations[lang];

  return (
    <section className="space-y-6 animate-fade-in">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#e8e4da] shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
            {t.menuTab.title}
          </h2>
          <p className="text-xs text-[#5d725d] mt-1">
            {t.menuTab.totalCount(menu.length)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenAddCategoryModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f2efe6] hover:bg-[#e6e2d6] border border-[#ded8cb] text-[#2c402c] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <FolderPlus className="w-4 h-4 text-[#c1713a]" />
            <span>{t.menuTab.addCategory}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddMenuModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-xs font-semibold transition-all shadow-md shadow-[#c1713a]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.menuTab.addProduct}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Category Pill Bar with Edit/Delete */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#f4f1e8] rounded-2xl border border-[#e5dfd3]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#485c48] px-3">
          {t.menuTab.categoryBadge}:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = menu.filter((m) => m.category === cat.id).length;
          const label = lang === 'tr' ? cat.labelTr : cat.labelEn || cat.labelTr;

          return (
            <div
              key={cat.id}
              className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all border ${
                isSelected
                  ? 'bg-[#1c381c] text-white border-[#1c381c] shadow-xs font-semibold'
                  : 'bg-white text-[#3c503c] border-[#ded8cb] hover:border-[#1c381c]/40 font-medium'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className="cursor-pointer"
              >
                <span>{label}</span>
                <span
                  className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#ede9df] text-[#5e735e]'
                  }`}
                >
                  {count}
                </span>
              </button>

              {/* Edit Category Icon */}
              <button
                type="button"
                onClick={() => onOpenEditCategoryModal(cat)}
                className={`p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
                  isSelected ? 'hover:bg-white/20' : 'hover:bg-[#ede9df]'
                }`}
                title={t.menuTab.editCat}
              >
                <Edit2 className="w-3 h-3" />
              </button>

              {/* Delete Category Icon */}
              {categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => onDeleteCategory(cat.id, cat.labelTr)}
                  className={`p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
                    isSelected ? 'hover:bg-red-900/40 text-red-200' : 'hover:bg-red-50 text-red-600'
                  }`}
                  title={t.menuTab.deleteCat}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Menu Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu
          .filter((item) => item.category === selectedCategory)
          .map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e4da] hover:border-[#c8aa6e] hover:shadow-md transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Product Image or Logo Default */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-[#0d1c0d] border border-[#e4ded2]">
                  {/* Default Logo Base */}
                  <Image
                    src="/botaniqa-logo.jpg"
                    alt="Botaniqa Café"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.nameTr}
                      fill
                      unoptimized={item.image.includes('urfamenu.com') || item.image.startsWith('data:')}
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Header & Tag */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  {item.tagTr ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fbf5ea] text-[#b85e28] border border-[#f0dfc2]">
                      {lang === 'tr' ? item.tagTr : item.tagEn || item.tagTr}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleItemAvailability(item.id)}
                    title={t.menuTab.toggleStock}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border cursor-pointer transition-colors ${
                      item.available !== false
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-stone-100 text-stone-600 border-stone-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                        item.available !== false ? 'bg-emerald-500' : 'bg-stone-400'
                      }`}
                    />
                    {item.available !== false ? t.menuTab.inStock : t.menuTab.outOfStock}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-[#1c2a1c] tracking-tight mb-1">
                  {item.nameTr}
                </h3>

                {item.descTr && (
                  <p className="text-xs text-[#687e68] leading-relaxed line-clamp-2 mb-3">
                    {item.descTr}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between">
                <span className="text-xl font-bold text-[#b85e28] tracking-tight">
                  {item.price}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenEditMenuModal(item)}
                    className="p-2 rounded-lg bg-[#f3f0e8] hover:bg-[#e7e3d7] text-[#2c442c] transition-colors cursor-pointer"
                    title={t.menuTab.edit}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteMenuItem(item.id, item.nameTr)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                    title={t.menuTab.delete}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {menu.filter((item) => item.category === selectedCategory).length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#d8d2c4] p-8 shadow-xs">
          <Coffee className="w-10 h-10 text-[#c8aa6e] mx-auto opacity-70 mb-3" />
          <p className="text-sm text-[#5d725d] font-medium">
            {t.menuTab.noItems}
          </p>
          <button
            type="button"
            onClick={onOpenAddMenuModal}
            className="mt-3 text-xs text-[#c1713a] hover:underline font-semibold cursor-pointer"
          >
            {t.menuTab.noItemsAction}
          </button>
        </div>
      )}
    </section>
  );
}
