'use client';

import React from 'react';
import Image from 'next/image';
import { Upload, Trash2, Info, CheckCircle2 } from 'lucide-react';
import { GalleryItemData } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';

interface GalleryTabProps {
  gallery: GalleryItemData[];
  isUploadingPhoto: boolean;
  onUploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeletePhoto: (id: string, caption: string) => void;
  onUpdateCaption: (id: string, altTr: string, altEn: string) => void;
  lang: 'tr' | 'en';
}

const MAX_GALLERY_PHOTOS = 6;

export default function GalleryTab({
  gallery,
  isUploadingPhoto,
  onUploadPhoto,
  onDeletePhoto,
  onUpdateCaption,
  lang,
}: GalleryTabProps) {
  const t = adminTranslations[lang];
  const photoList = gallery || [];
  const count = photoList.length;
  const isFull = count >= MAX_GALLERY_PHOTOS;

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#e8e4da] shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
              {t.galleryTab.title}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                isFull
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              {count} / {MAX_GALLERY_PHOTOS}
            </span>
          </div>
          <p className="text-xs text-[#5d725d] mt-1">
            {lang === 'tr'
              ? `Site vitrininde tam 6 fotoğraflık özel bir mozaik düzeni kullanılır.`
              : `A tailored 6-photo masonry grid is displayed on the website showcase.`}
          </p>
        </div>

        {/* Upload Button or Limit Indicator */}
        {isFull ? (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f2eee3] text-[#7d917d] border border-[#ded8cb] text-xs font-semibold cursor-not-allowed">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'tr' ? 'Kapasite Dolu (6/6)' : 'Limit Reached (6/6)'}</span>
          </div>
        ) : (
          <label
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-xs font-semibold transition-all shadow-md shadow-[#c1713a]/20 cursor-pointer ${
              isUploadingPhoto ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <Upload className={`w-4 h-4 ${isUploadingPhoto ? 'animate-spin' : ''}`} />
            <span>
              {isUploadingPhoto
                ? t.galleryTab.uploading
                : `${t.galleryTab.uploadBtn} (${MAX_GALLERY_PHOTOS - count} slot kaldı)`}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={onUploadPhoto}
              disabled={isUploadingPhoto}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Info notice when limit reached */}
      {isFull && (
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs leading-relaxed animate-fade-in">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            {lang === 'tr'
              ? 'Web sitesindeki vitrin düzeninin bozulmaması için galeri maksimum 6 fotoğrafla sınırlandırılmıştır. Yeni bir fotoğraf eklemek için lütfen mevcut fotoğraflardan birini silin.'
              : 'To preserve the visual harmony of the website showcase, the gallery is capped at 6 photos. To upload a new photo, please delete one of the existing ones.'}
          </span>
        </div>
      )}

      {/* Photos Grid & Placeholders (Slots 1 to 6) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: MAX_GALLERY_PHOTOS }).map((_, slotIdx) => {
          const slotNumber = slotIdx + 1;
          const photo = photoList[slotIdx];

          if (photo) {
            return (
              <div
                key={photo.id}
                className="bg-white border border-[#e8e4da] rounded-2xl p-4 space-y-3 shadow-xs hover:shadow-md transition-shadow relative"
              >
                {/* Slot number badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#1c381c] text-white text-[11px] font-mono font-bold">
                    Slot #{slotNumber}
                  </span>
                  <span className="text-[11px] text-[#718771] font-medium">
                    {lang === 'tr' ? 'Yayında' : 'Live'}
                  </span>
                </div>

                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#f5f2e9] border border-[#e4ded2]">
                  <Image
                    src={photo.src}
                    alt={photo.altTr || `Fotoğraf ${slotNumber}`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={photo.altTr}
                    onChange={(e) =>
                      onUpdateCaption(photo.id, e.target.value, photo.altEn || '')
                    }
                    placeholder={t.galleryTab.captionTr}
                    className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3 py-1.5 text-xs text-[#1c2a1c] outline-none"
                  />
                  <input
                    type="text"
                    value={photo.altEn || ''}
                    onChange={(e) =>
                      onUpdateCaption(photo.id, photo.altTr, e.target.value)
                    }
                    placeholder={t.galleryTab.captionEn}
                    className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3 py-1.5 text-xs text-[#1c2a1c] outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-[#f0ece1] flex justify-end">
                  <button
                    type="button"
                    onClick={() => onDeletePhoto(photo.id, photo.altTr)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.galleryTab.deletePhoto}</span>
                  </button>
                </div>
              </div>
            );
          }

          // Empty Slot Placeholder in Admin
          return (
            <div
              key={`admin-empty-slot-${slotNumber}`}
              className="rounded-2xl border-2 border-dashed border-[#d8d0be] bg-gradient-to-br from-[#f8f5ee] to-[#f2ede3] p-5 flex flex-col items-center justify-center text-center space-y-3 min-h-[300px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#ded8cb] shadow-xs flex items-center justify-center">
                <span className="font-serif text-2xl font-black text-[#1c381c]">
                  {slotNumber}
                </span>
              </div>

              <div>
                <p className="font-serif text-sm font-bold text-[#1c2a1c]">
                  Slot #{slotNumber} ({lang === 'tr' ? 'Boş' : 'Empty'})
                </p>
                <p className="text-[11px] text-[#718771] mt-0.5">
                  {lang === 'tr'
                    ? 'Sitede numara placeholder gösteriliyor'
                    : 'Shows number placeholder on site'}
                </p>
              </div>

              <label
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all ${
                  isUploadingPhoto ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {isUploadingPhoto
                    ? t.galleryTab.uploading
                    : lang === 'tr'
                    ? `Fotoğraf Yükle`
                    : `Upload Photo`}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUploadPhoto}
                  disabled={isUploadingPhoto}
                  className="hidden"
                />
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
