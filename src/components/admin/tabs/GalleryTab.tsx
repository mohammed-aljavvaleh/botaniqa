'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Upload,
  Trash2,
  Info,
  CheckCircle2,
  RefreshCw,
  Video,
  Film,
  Link as LinkIcon,
  Play,
  AlertCircle,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { GalleryItemData, HeroVideoData } from '@/data/initialData';
import { adminTranslations } from '@/data/adminTranslations';
import { compressImage } from '@/components/admin/adminHelpers';

interface GalleryTabProps {
  gallery: GalleryItemData[];
  heroVideo?: HeroVideoData;
  onUpdateHeroVideo?: (heroVideo: Partial<HeroVideoData>) => Promise<boolean> | void;
  aboutImage?: string;
  aboutSecondaryImage?: string;
  onUpdateAboutImage?: (primary: string, secondary?: string) => Promise<boolean> | void;
  isUploadingPhoto: boolean;
  uploadingSlot: number | null;
  onUploadPhotoForSlot: (e: React.ChangeEvent<HTMLInputElement>, slot: number) => void;
  onDeletePhoto: (id: string, caption: string, slotNum: number) => void;
  onUpdateCaption: (slot: number, altTr: string, altEn: string) => void;
  lang: 'tr' | 'en';
}

const GALLERY_SLOT_DEFS = [
  {
    slot: 1,
    labelTr: 'Slot #1 — Büyük Vitrin (Hero)',
    labelEn: 'Slot #1 — Large Hero Showcase',
    aspect: 'aspect-[4/3]',
    descTr: 'Sitenin sol tarafındaki en büyük ana görsel (2x2)',
    descEn: 'Main large hero showcase photo on left (2x2)',
  },
  {
    slot: 2,
    labelTr: 'Slot #2 — Kare (Üst Orta)',
    labelEn: 'Slot #2 — Square (Top Mid)',
    aspect: 'aspect-square',
    descTr: 'Üst orta kare vitrin fotoğrafı',
    descEn: 'Top-middle square showcase photo',
  },
  {
    slot: 3,
    labelTr: 'Slot #3 — Kare (Üst Sağ)',
    labelEn: 'Slot #3 — Square (Top Right)',
    aspect: 'aspect-square',
    descTr: 'Üst sağ kare vitrin fotoğrafı',
    descEn: 'Top-right square showcase photo',
  },
  {
    slot: 4,
    labelTr: 'Slot #4 — Kare (Sol Alt)',
    labelEn: 'Slot #4 — Square (Bottom Left)',
    aspect: 'aspect-square',
    descTr: 'Alt sol kare vitrin fotoğrafı (1:1)',
    descEn: 'Bottom-left square showcase photo (1:1)',
  },
  {
    slot: 5,
    labelTr: 'Slot #5 — Kare (Alt Orta)',
    labelEn: 'Slot #5 — Square (Bottom Mid)',
    aspect: 'aspect-square',
    descTr: 'Alt orta kare vitrin fotoğrafı (1:1)',
    descEn: 'Bottom-middle square showcase photo (1:1)',
  },
  {
    slot: 6,
    labelTr: 'Slot #6 — Kare (Alt 2)',
    labelEn: 'Slot #6 — Square (Bottom 2)',
    aspect: 'aspect-square',
    descTr: 'Alt orta kare vitrin fotoğrafı (1:1)',
    descEn: 'Bottom-middle square showcase photo (1:1)',
  },
  {
    slot: 7,
    labelTr: 'Slot #7 — Kare (Alt 3)',
    labelEn: 'Slot #7 — Square (Bottom 3)',
    aspect: 'aspect-square',
    descTr: 'Sağ alt köşe kare vitrin fotoğrafı (1:1)',
    descEn: 'Bottom-right square showcase photo (1:1)',
  },
];

export default function GalleryTab({
  gallery,
  heroVideo,
  onUpdateHeroVideo,
  aboutImage,
  aboutSecondaryImage,
  onUpdateAboutImage,
  isUploadingPhoto,
  uploadingSlot,
  onUploadPhotoForSlot,
  onDeletePhoto,
  onUpdateCaption,
  lang,
}: GalleryTabProps) {
  const t = adminTranslations[lang];
  const photoList = gallery || [];

  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState(heroVideo?.url || '/hero_video.webm');
  const [isUploadingStoryPrimary, setIsUploadingStoryPrimary] = useState(false);
  const [isUploadingStorySecondary, setIsUploadingStorySecondary] = useState(false);

  useEffect(() => {
    if (heroVideo?.url) {
      setVideoUrlInput(heroVideo.url);
    }
  }, [heroVideo?.url]);

  const isVideoEnabled = heroVideo?.enabled !== false && Boolean(heroVideo?.url);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        await onUpdateHeroVideo?.({ url: json.url, enabled: true });
        setVideoUrlInput(json.url);
      } else {
        alert(json.error || 'Video yüklenemedi.');
      }
    } catch (err) {
      console.error('Video upload error:', err);
      alert('Video yüklenirken hata oluştu.');
    } finally {
      setIsUploadingVideo(false);
      e.target.value = '';
    }
  };

  const handleToggleVideo = async () => {
    await onUpdateHeroVideo?.({ enabled: !isVideoEnabled });
  };

  const handleSaveVideoUrl = async () => {
    if (videoUrlInput.trim()) {
      await onUpdateHeroVideo?.({ url: videoUrlInput.trim(), enabled: true });
    }
  };

  const handleResetVideo = async () => {
    await onUpdateHeroVideo?.({ url: '/hero_video.webm', enabled: true });
    setVideoUrlInput('/hero_video.webm');
  };

  // Story Photo Handlers
  const handleUploadStoryImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'secondary'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'primary') setIsUploadingStoryPrimary(true);
    else setIsUploadingStorySecondary(true);

    try {
      const processed = await compressImage(file);
      const formData = new FormData();
      formData.append('file', processed);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        if (type === 'primary') {
          await onUpdateAboutImage?.(json.url, aboutSecondaryImage || '/gallery_1.jpg');
        } else {
          await onUpdateAboutImage?.(aboutImage || '/cafe_interior.jpg', json.url);
        }
      } else {
        alert(json.error || 'Görsel yüklenemedi.');
      }
    } catch (err) {
      console.error('Story image upload error:', err);
      alert('Görsel yüklenirken hata oluştu.');
    } finally {
      if (type === 'primary') setIsUploadingStoryPrimary(false);
      else setIsUploadingStorySecondary(false);
      e.target.value = '';
    }
  };

  const handleResetStoryImage = async (type: 'primary' | 'secondary') => {
    if (type === 'primary') {
      await onUpdateAboutImage?.('/cafe_interior.jpg', aboutSecondaryImage || '/gallery_1.jpg');
    } else {
      await onUpdateAboutImage?.(aboutImage || '/cafe_interior.jpg', '/gallery_1.jpg');
    }
  };

  // Count active filled slots
  const filledCount = GALLERY_SLOT_DEFS.filter((def) =>
    photoList.some((g) => (g.slot === def.slot || g.id === `slot-${def.slot}`) && g.src)
  ).length;

  return (
    <section className="space-y-6 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#e8e4da] shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1c2a1c] tracking-tight">
              {t.galleryTab.title}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                filledCount === 6
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {filledCount} / 6 Slot Dolu
            </span>
          </div>
          <p className="text-xs text-[#5d725d] mt-1">
            {lang === 'tr'
              ? 'Web sitesindeki video ve sabit fotoğraf vitrinlerini buradan yönetebilirsiniz.'
              : 'Manage the cinematic background video and anchored showcase photos here.'}
          </p>
        </div>
      </div>

      {/* ── HERO BACKGROUND VIDEO CARD ──────────────────────────── */}
      <div className="bg-white border border-[#e8e4da] rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#f0ebe1]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#1c381c] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Film className="w-5 h-5 text-[#8bbf8b]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-serif text-lg font-bold text-[#1c2a1c]">
                  {t.galleryTab.heroVideoTitle}
                </h3>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                    isVideoEnabled
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isVideoEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  {isVideoEnabled ? t.galleryTab.heroVideoActive : t.galleryTab.heroVideoInactive}
                </span>
              </div>
              <p className="text-xs text-[#6d5b45] mt-0.5">
                {t.galleryTab.heroVideoSubtitle}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            onClick={handleToggleVideo}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isVideoEnabled
                ? 'bg-[#1c381c] text-white hover:bg-[#284f28]'
                : 'bg-[#f4efe6] text-[#6d5b45] hover:bg-[#eadecc]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border transition-transform duration-200 ${
                isVideoEnabled ? 'bg-emerald-400 border-emerald-300' : 'bg-gray-400 border-gray-300'
              }`}
            />
            <span>{t.galleryTab.toggleVideo}</span>
          </button>
        </div>

        {/* Video Preview and Actions Grid */}
        <div className="grid md:grid-cols-12 gap-5 pt-5">
          {/* Video Preview Player */}
          <div className="md:col-span-6 lg:col-span-5 relative rounded-2xl overflow-hidden bg-black/90 aspect-video border border-[#e0dad0] shadow-inner group">
            {heroVideo?.url ? (
              <video
                key={heroVideo.url}
                src={heroVideo.url}
                poster={heroVideo.poster || '/hero_coffee.jpg'}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/70">
                <Video className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs">Henüz video seçilmedi</p>
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/90">
              {isVideoEnabled ? 'Canlı Önizleme' : 'Önizleme (Pasif)'}
            </div>
          </div>

          {/* Controls & Inputs */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* File Upload Button */}
              <div>
                <label className="block text-xs font-semibold text-[#1c2a1c] mb-1.5">
                  {lang === 'tr' ? 'Yeni Video Dosyası Yükle' : 'Upload Video File'}
                </label>
                <label
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#f7f4ee] hover:bg-[#efe9df] border-2 border-dashed border-[#d5ccbc] hover:border-[#c1713a] text-xs font-semibold text-[#1c2a1c] cursor-pointer transition-all duration-200 w-full sm:w-auto ${
                    isUploadingVideo ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/ogg"
                    onChange={handleVideoUpload}
                    className="hidden"
                    disabled={isUploadingVideo}
                  />
                  {isUploadingVideo ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#c1713a]" />
                  ) : (
                    <Upload className="w-4 h-4 text-[#c1713a]" />
                  )}
                  <span>
                    {isUploadingVideo ? t.galleryTab.uploadingVideo : t.galleryTab.uploadVideoBtn}
                  </span>
                </label>
                <p className="text-[11px] text-[#7d6b58] mt-1">
                  {lang === 'tr'
                    ? 'MP4, WebM veya MOV (Önerilen: 10-30 saniyelik sinematik yatay döngü, maks 60MB).'
                    : 'MP4, WebM or MOV (Recommended: 10-30 sec ambient horizontal loop, max 60MB).'}
                </p>
              </div>

              {/* URL Direct Input */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-[#1c2a1c] mb-1">
                  {t.galleryTab.videoUrlLabel}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8bbf8b]" />
                    <input
                      type="text"
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      placeholder={t.galleryTab.videoUrlPlaceholder}
                      className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl pl-8 pr-3 py-2 text-xs text-[#1c2a1c] outline-none focus:border-[#1c381c] font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveVideoUrl}
                    className="px-4 py-2 rounded-xl bg-[#1c381c] hover:bg-[#284f28] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    {lang === 'tr' ? 'Uygula' : 'Apply'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Reset to Default */}
            <div className="pt-2 flex items-center justify-between border-t border-[#f0ebe1]">
              <span className="text-[11px] text-[#7d6b58]">
                {lang === 'tr' ? 'Varsayılan zengin botanik kahve videosu mevcuttur.' : 'Default rich botanical coffee video is ready.'}
              </span>
              <button
                type="button"
                onClick={handleResetVideo}
                className="text-[11px] font-semibold text-[#c1713a] hover:text-[#9e5221] underline cursor-pointer"
              >
                {t.galleryTab.resetVideo}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 01 / HİKAYEMİZ SECTION PHOTOS ────────────────────────────── */}
      <div className="bg-white border border-[#e8e4da] rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#f0ebe1]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#c1713a] text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-serif text-lg font-bold text-[#1c2a1c]">
                  {lang === 'tr' ? '01 / Hikayemiz Bölümü Görselleri' : '01 / Our Story Section Photos'}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border bg-emerald-50 text-emerald-800 border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {lang === 'tr' ? 'Yayında' : 'Live'}
                </span>
              </div>
              <p className="text-xs text-[#6d5b45] mt-0.5">
                {lang === 'tr'
                  ? "Ana sayfada '01 / HİKAYEMİZ' bölümünde sergilenen büyük atmosfer ve sunum fotoğraflarını güncelleyin."
                  : 'Update the atmosphere and detail photos displayed in the "01 / OUR STORY" section.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* 1. Main Atmosphere Photo */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#e8e2d4] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-sm font-bold text-[#1c2a1c]">
                  {lang === 'tr' ? 'Ana Hikaye Fotoğrafı (Büyük)' : 'Primary Story Photo (Large)'}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8a7258] bg-white border border-[#ded8cb] px-2 py-0.5 rounded-md">
                  Dikey / 4:5
                </span>
              </div>

              {/* Photo Preview Container */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/5 border border-[#dfd8ca] shadow-inner group">
                <Image
                  src={aboutImage || '/cafe_interior.jpg'}
                  alt="Hikayemiz Ana Fotoğrafı"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 text-white text-[11px] font-medium drop-shadow-sm">
                  {lang === 'tr' ? 'Mevcut Görsel' : 'Current Photo'}
                </div>
              </div>

              <p className="text-[11px] text-[#7d6b58] mt-2">
                {lang === 'tr'
                  ? 'Kafenin genel iç mekanını ve botanik atmosferini yansıtan dikey odaklı fotoğraf.'
                  : 'Main interior ambiance photo capturing the botanical cafe atmosphere.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-t border-[#ebd8cb]/50">
              <label
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1c381c] hover:bg-[#284f28] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all flex-1 ${
                  isUploadingStoryPrimary ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <Upload className={`w-3.5 h-3.5 ${isUploadingStoryPrimary ? 'animate-spin' : ''}`} />
                <span>
                  {isUploadingStoryPrimary
                    ? (lang === 'tr' ? 'Yükleniyor...' : 'Uploading...')
                    : (lang === 'tr' ? 'Fotoğrafı Değiştir' : 'Change Photo')}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadStoryImage(e, 'primary')}
                  disabled={isUploadingStoryPrimary}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => handleResetStoryImage('primary')}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white border border-[#d8d2c4] text-[#1c2a1c] hover:bg-[#f6f4ee] text-xs font-semibold transition-all cursor-pointer"
                title={lang === 'tr' ? 'Varsayılana Dön' : 'Reset to Default'}
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#7d6b58]" />
                <span className="hidden sm:inline">{lang === 'tr' ? 'Sıfırla' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* 2. Secondary Inset Photo */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#e8e2d4] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-sm font-bold text-[#1c2a1c]">
                  {lang === 'tr' ? 'Küçük Detay / Sunum Fotoğrafı' : 'Detail / Inset Photo'}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8a7258] bg-white border border-[#ded8cb] px-2 py-0.5 rounded-md">
                  Köşe Vitrin
                </span>
              </div>

              {/* Photo Preview Container */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/5 border border-[#dfd8ca] shadow-inner group">
                <Image
                  src={aboutSecondaryImage || '/gallery_1.jpg'}
                  alt="Hikayemiz Detay Fotoğrafı"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 text-white text-[11px] font-medium drop-shadow-sm">
                  {lang === 'tr' ? 'Mevcut Görsel' : 'Current Photo'}
                </div>
              </div>

              <p className="text-[11px] text-[#7d6b58] mt-2">
                {lang === 'tr'
                  ? 'Kahve sunumu veya lezzet detayını vurgulayan sağ alttaki küçük köşe fotoğrafı.'
                  : 'Floating corner photo emphasizing specialty pour or pastry presentation.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-t border-[#ebd8cb]/50">
              <label
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all flex-1 ${
                  isUploadingStorySecondary ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <Upload className={`w-3.5 h-3.5 ${isUploadingStorySecondary ? 'animate-spin' : ''}`} />
                <span>
                  {isUploadingStorySecondary
                    ? (lang === 'tr' ? 'Yükleniyor...' : 'Uploading...')
                    : (lang === 'tr' ? 'Fotoğrafı Değiştir' : 'Change Photo')}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadStoryImage(e, 'secondary')}
                  disabled={isUploadingStorySecondary}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => handleResetStoryImage('secondary')}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white border border-[#d8d2c4] text-[#1c2a1c] hover:bg-[#f6f4ee] text-xs font-semibold transition-all cursor-pointer"
                title={lang === 'tr' ? 'Varsayılana Dön' : 'Reset to Default'}
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#7d6b58]" />
                <span className="hidden sm:inline">{lang === 'tr' ? 'Sıfırla' : 'Reset'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice for Photo Slots */}
      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f4f7f4] border border-[#d6e3d6] text-[#2c402c] text-xs leading-relaxed">
        <Info className="w-4 h-4 text-[#3d683d] shrink-0 mt-0.5" />
        <span>
          {lang === 'tr'
            ? 'Web sitesindeki fotoğraf vitrininde her slotun konumu sabittir. Hangi slota fotoğraf yüklerseniz, sitede doğrudan o numaralı alana yerleşir.'
            : 'Each slot has a fixed position on the website showcase. Uploading to a specific slot will place the photo directly in that spot.'}
        </span>
      </div>

      {/* 7 Fixed Slotted Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GALLERY_SLOT_DEFS.map((def) => {
          const slotNumber = def.slot;
          const photo = photoList.find(
            (g) => (g.slot === slotNumber || g.id === `slot-${slotNumber}`) && g.src
          );
          const isThisSlotUploading = isUploadingPhoto && uploadingSlot === slotNumber;

          if (photo) {
            return (
              <div
                key={`admin-slot-${slotNumber}`}
                className="bg-white border border-[#e8e4da] rounded-2xl p-4 space-y-3 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Slot Number Header */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#1c381c] text-white text-[11px] font-mono font-bold shadow-2xs">
                      Slot #{slotNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {lang === 'tr' ? 'Yayında' : 'Live'}
                    </span>
                  </div>

                  {/* Position Label */}
                  <p className="text-xs font-semibold text-[#1c2a1c] tracking-tight">
                    {lang === 'tr' ? def.labelTr : def.labelEn}
                  </p>

                  {/* Photo Preview */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#f5f2e9] border border-[#e4ded2]">
                    <Image
                      src={photo.src}
                      alt={photo.altTr || `Slot ${slotNumber}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>

                  {/* Captions */}
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={photo.altTr || ''}
                      onChange={(e) =>
                        onUpdateCaption(slotNumber, e.target.value, photo.altEn || '')
                      }
                      placeholder={t.galleryTab.captionTr}
                      className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3 py-1.5 text-xs text-[#1c2a1c] outline-none"
                    />
                    <input
                      type="text"
                      value={photo.altEn || ''}
                      onChange={(e) =>
                        onUpdateCaption(slotNumber, photo.altTr || '', e.target.value)
                      }
                      placeholder={t.galleryTab.captionEn}
                      className="w-full bg-[#fbfaf8] border border-[#d8d2c4] rounded-xl px-3 py-1.5 text-xs text-[#1c2a1c] outline-none"
                    />
                  </div>
                </div>

                {/* Slot Action Buttons */}
                <div className="pt-3 border-t border-[#f0ece1] flex items-center justify-between gap-2">
                  <label
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f3f0e8] hover:bg-[#e7e3d7] text-[#2c442c] text-xs font-medium transition-colors cursor-pointer ${
                      isUploadingPhoto ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isThisSlotUploading ? 'animate-spin' : ''}`} />
                    <span>{isThisSlotUploading ? 'Yükleniyor...' : (lang === 'tr' ? 'Değiştir' : 'Change')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onUploadPhotoForSlot(e, slotNumber)}
                      disabled={isUploadingPhoto}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => onDeletePhoto(photo.id, photo.altTr || `Slot #${slotNumber}`, slotNumber)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'tr' ? 'Kaldır' : 'Remove'}</span>
                  </button>
                </div>
              </div>
            );
          }

          // EMPTY Slot Card
          return (
            <div
              key={`admin-empty-slot-${slotNumber}`}
              className="rounded-2xl border-2 border-dashed border-[#d8d0be] bg-gradient-to-br from-[#f8f5ee] to-[#f2ede3] p-5 flex flex-col items-center justify-between text-center space-y-3 min-h-[340px]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#8c9e8c] text-white text-[11px] font-mono font-bold">
                  Slot #{slotNumber}
                </span>
                <span className="text-[11px] font-semibold text-[#8a755d] bg-[#f0eae1] px-2 py-0.5 rounded-md">
                  {lang === 'tr' ? 'Boş' : 'Empty'}
                </span>
              </div>

              <div className="flex flex-col items-center my-auto space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#ded8cb] shadow-xs flex items-center justify-center">
                  <span className="font-serif text-2xl font-black text-[#1c381c]">
                    #{slotNumber}
                  </span>
                </div>

                <div>
                  <p className="font-serif text-sm font-bold text-[#1c2a1c]">
                    {lang === 'tr' ? def.labelTr : def.labelEn}
                  </p>
                  <p className="text-[11px] text-[#718771] mt-0.5 max-w-[200px] mx-auto">
                    {lang === 'tr' ? def.descTr : def.descEn}
                  </p>
                </div>
              </div>

              {/* Upload to this specific slot button */}
              <label
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#c1713a] hover:bg-[#a95d2c] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all w-full justify-center ${
                  isUploadingPhoto ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <Upload className={`w-3.5 h-3.5 ${isThisSlotUploading ? 'animate-spin' : ''}`} />
                <span>
                  {isThisSlotUploading
                    ? 'Yükleniyor...'
                    : lang === 'tr'
                    ? `Slot #${slotNumber}'e Fotoğraf Yükle`
                    : `Upload to Slot #${slotNumber}`}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onUploadPhotoForSlot(e, slotNumber)}
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
