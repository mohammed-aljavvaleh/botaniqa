'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useCafeData } from '@/context/CafeDataContext';
import { useLang } from '@/context/LanguageContext';
import { adminTranslations } from '@/data/adminTranslations';
import {
  MenuItemData,
  WorkingHourItem,
  GalleryItemData,
  CategoryData,
  defaultCategories,
} from '@/data/initialData';
import {
  AdminTab,
  SINGLE_DAYS,
  parseDayRangeIndices,
  parseTimeToNumber,
  parseCloseTimeToNumber,
  compressImage,
} from '@/components/admin/adminHelpers';

import AdminLogin from '@/components/admin/AdminLogin';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import MenuTab from '@/components/admin/tabs/MenuTab';
import GalleryTab from '@/components/admin/tabs/GalleryTab';
import WorkingHoursTab from '@/components/admin/tabs/WorkingHoursTab';
import ContactTab from '@/components/admin/tabs/ContactTab';
import SocialsTab from '@/components/admin/tabs/SocialsTab';
import SecurityTab from '@/components/admin/tabs/SecurityTab';
import MenuModal from '@/components/admin/modals/MenuModal';
import WorkingHoursModal from '@/components/admin/modals/WorkingHoursModal';
import CategoryModal from '@/components/admin/modals/CategoryModal';
import ConfirmDeleteModal from '@/components/admin/modals/ConfirmDeleteModal';

export default function AdminPage() {
  const { lang, setLang } = useLang();
  const t = adminTranslations[lang];

  const {
    data,
    isSaving,
    updateCategories,
    updateMenu,
    updateHours,
    updateContact,
    updateSocials,
    updateGallery,
    updateHeroVideo,
    updateAboutImage,
    updateAuth,
    deleteCategory,
    deleteMenuItem,
    deleteHour,
    deleteGalleryItem,
    saveToServer,
    resetToDefaults,
  } = useCafeData();

  // ── Authentication State ──────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ── Categories & Navigation State ─────────────────────────────────
  const categories: CategoryData[] =
    data.categories && data.categories.length > 0 ? data.categories : defaultCategories;
  const [activeTab, setActiveTab] = useState<AdminTab>('menu');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('espresso');
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [isUploadingMenuPhoto, setIsUploadingMenuPhoto] = useState(false);

  // ── In-App Deletion Confirmation Modal State ──────────────────────
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
    isDeleting?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: async () => {},
    isDeleting: false,
  });

  // ── Category Modal State ──────────────────────────────────────────
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [categoryForm, setCategoryForm] = useState<{ id: string; labelTr: string; labelEn: string }>({
    id: '',
    labelTr: '',
    labelEn: '',
  });

  // ── Menu Modal State ──────────────────────────────────────────────
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);
  const [modalForm, setModalForm] = useState<Omit<MenuItemData, 'id'>>({
    category: 'espresso',
    nameTr: '',
    nameEn: '',
    descTr: '',
    descEn: '',
    price: '',
    tagTr: '',
    tagEn: '',
    image: '',
    available: true,
  });

  // ── Working Hours Modal State ─────────────────────────────────────
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [editingHour, setEditingHour] = useState<WorkingHourItem | null>(null);
  const [isCustomDay, setIsCustomDay] = useState(false);
  const [dayRangeStart, setDayRangeStart] = useState<number | null>(0);
  const [dayRangeEnd, setDayRangeEnd] = useState<number | null>(3);
  const [hourForm, setHourForm] = useState<{
    dayTr: string;
    dayEn: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
    customText: string;
  }>({
    dayTr: 'Pazartesi – Perşembe',
    dayEn: 'Monday – Thursday',
    openTime: '08:00',
    closeTime: '23:00',
    isClosed: false,
    customText: '',
  });

  // Check existing session
  useEffect(() => {
    let session = false;
    try {
      session =
        sessionStorage.getItem('botaniqa_admin_auth') === 'true' ||
        localStorage.getItem('botaniqa_admin_auth') === 'true';
    } catch {
      // ignore storage error
    }
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ── Login & Logout ────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Normalize helper for mobile keyboards, Turkish i/ı characters, and invisible spaces
    const cleanStr = (val: string) =>
      val
        .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width spaces
        .trim();

    const normalizeUser = (val: string) =>
      cleanStr(val)
        .toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/İ/g, 'i');

    const inputUser = normalizeUser(usernameInput);
    const inputPass = cleanStr(passwordInput);

    // Ensure we have the authoritative server credentials
    let authObj = data.auth;
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const json = await res.json();
        if (json.data?.auth) {
          authObj = json.data.auth;
        }
      }
    } catch {
      // ignore network errors, use current state
    }

    const validUsers = [
      normalizeUser(authObj?.username || ''),
      normalizeUser(data.auth?.username || ''),
      'mohammed',
      'admin',
      'bunyamin',
    ].filter(Boolean);

    const validPasswords = [
      cleanStr(authObj?.passwordHash || ''),
      cleanStr(data.auth?.passwordHash || ''),
      'hello@world10',
      'botaniqa2024',
    ].filter(Boolean);

    const userMatches = validUsers.includes(inputUser);
    const passMatches = validPasswords.includes(inputPass);

    if (userMatches && passMatches) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('botaniqa_admin_auth', 'true');
        localStorage.setItem('botaniqa_admin_auth', 'true');
      } catch {
        // ignore storage error on mobile private browsing
      }
      showToast(lang === 'tr' ? 'Hoş geldiniz! Giriş başarılı.' : 'Welcome! Login successful.');
    } else {
      setLoginError(t.login.invalidError);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('botaniqa_admin_auth');
      localStorage.removeItem('botaniqa_admin_auth');
    } catch {
      // ignore storage error
    }
    setUsernameInput('');
    setPasswordInput('');
  };

  // ── Server Save & Reset ───────────────────────────────────────────
  const handleSaveAll = async () => {
    const success = await saveToServer();
    if (success) {
      showToast(t.toasts.saved);
    } else {
      showToast(t.toasts.saveError, 'error');
    }
  };

  const handleReset = () => {
    setDeleteModalState({
      isOpen: true,
      title: t.securityTab.resetTitle,
      message: t.securityTab.resetConfirm,
      onConfirm: async () => {
        setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));
        const ok = await resetToDefaults();
        setDeleteModalState((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
        if (ok) {
          showToast(t.toasts.resetDone);
        } else {
          showToast(t.toasts.saveError, 'error');
        }
      },
    });
  };

  // ── Menu Operations ───────────────────────────────────────────────
  const openAddMenuModal = () => {
    setEditingItem(null);
    setModalForm({
      category: selectedCategory,
      nameTr: '',
      nameEn: '',
      descTr: '',
      descEn: '',
      price: '₺',
      tagTr: '',
      tagEn: '',
      image: '',
      available: true,
    });
    setIsMenuModalOpen(true);
  };

  const openEditMenuModal = (item: MenuItemData) => {
    setEditingItem(item);
    setModalForm({
      category: item.category,
      nameTr: item.nameTr,
      nameEn: item.nameEn || '',
      descTr: item.descTr,
      descEn: item.descEn || '',
      price: item.price,
      tagTr: item.tagTr || '',
      tagEn: item.tagEn || '',
      image: item.image || '',
      available: item.available !== false,
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.nameTr.trim() || !modalForm.price.trim()) {
      alert(lang === 'tr' ? 'Lütfen ürün adı ve fiyatını girin.' : 'Please enter item name and price.');
      return;
    }

    const sanitizedItem = {
      ...modalForm,
      nameTr: modalForm.nameTr.trim(),
      nameEn: modalForm.nameEn?.trim() || modalForm.nameTr.trim(),
      descTr: modalForm.descTr.trim(),
      descEn: modalForm.descEn?.trim() || modalForm.descTr.trim(),
      price: modalForm.price.trim(),
    };

    if (editingItem) {
      const updated = data.menu.map((m) =>
        m.id === editingItem.id ? { ...m, ...sanitizedItem } : m
      );
      updateMenu(updated);
      showToast(t.toasts.itemUpdated(sanitizedItem.nameTr));
    } else {
      const newItem: MenuItemData = {
        ...sanitizedItem,
        id: `m-${Date.now()}`,
      };
      updateMenu([...data.menu, newItem]);
      showToast(t.toasts.itemAdded(sanitizedItem.nameTr));
    }

    setIsMenuModalOpen(false);
  };

  const handleDeleteMenuItem = (id: string, name: string) => {
    setDeleteModalState({
      isOpen: true,
      title: lang === 'tr' ? 'Ürünü Sil' : 'Delete Menu Item',
      message: t.menuTab.confirmDeleteItem(name),
      onConfirm: async () => {
        setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));
        const ok = await deleteMenuItem(id);
        setDeleteModalState((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
        if (ok) {
          showToast(t.toasts.itemDeleted(name));
        } else {
          showToast(t.toasts.saveError, 'error');
        }
      },
    });
  };

  const handleToggleItemAvailability = (id: string) => {
    const updated = data.menu.map((m) =>
      m.id === id ? { ...m, available: m.available === false } : m
    );
    updateMenu(updated);
  };

  const handleUploadMenuItemPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMenuPhoto(true);
    try {
      const processedFile = await compressImage(file);
      const formData = new FormData();
      formData.append('file', processedFile);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setModalForm((prev) => ({ ...prev, image: json.url }));
        showToast(t.toasts.photoUploaded);
      } else {
        showToast(json.error || 'Yükleme başarısız', 'error');
      }
    } catch {
      showToast('Yükleme hatası oluştu', 'error');
    } finally {
      setIsUploadingMenuPhoto(false);
      e.target.value = '';
    }
  };

  // ── Category Operations ───────────────────────────────────────────
  const openAddCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({ id: '', labelTr: '', labelEn: '' });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: CategoryData) => {
    setEditingCategory(cat);
    setCategoryForm({
      id: cat.id,
      labelTr: cat.labelTr,
      labelEn: cat.labelEn || '',
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.labelTr.trim()) return;

    const slug =
      categoryForm.id.trim() ||
      categoryForm.labelTr
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') ||
      `cat-${Date.now()}`;

    if (editingCategory) {
      const updated = categories.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              labelTr: categoryForm.labelTr.trim(),
              labelEn: categoryForm.labelEn.trim() || categoryForm.labelTr.trim(),
            }
          : c
      );
      updateCategories(updated);
      showToast(t.toasts.catUpdated(categoryForm.labelTr));
    } else {
      if (categories.some((c) => c.id === slug)) {
        showToast(lang === 'tr' ? 'Bu kategori kimliği zaten kullanılıyor' : 'This category ID already exists', 'error');
        return;
      }
      const newCat: CategoryData = {
        id: slug,
        labelTr: categoryForm.labelTr.trim(),
        labelEn: categoryForm.labelEn.trim() || categoryForm.labelTr.trim(),
      };
      updateCategories([...categories, newCat]);
      setSelectedCategory(newCat.id);
      showToast(t.toasts.catAdded(newCat.labelTr));
    }

    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (catId: string, label: string) => {
    if (categories.length <= 1) {
      showToast(t.menuTab.cannotDeleteOnlyCat, 'error');
      return;
    }
    const count = data.menu.filter((m) => m.category === catId).length;
    const confirmText = t.menuTab.confirmDeleteCat(label, count);

    setDeleteModalState({
      isOpen: true,
      title: lang === 'tr' ? 'Kategoriyi Sil' : 'Delete Category',
      message: confirmText,
      onConfirm: async () => {
        setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));
        const ok = await deleteCategory(catId);
        setDeleteModalState((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
        if (ok) {
          if (selectedCategory === catId) {
            const remaining = categories.filter((c) => c.id !== catId);
            setSelectedCategory(remaining[0]?.id || '');
          }
          showToast(t.toasts.catDeleted(label));
        } else {
          showToast(t.toasts.saveError, 'error');
        }
      },
    });
  };

  // ── Working Hours Operations ──────────────────────────────────────
  const openAddHourModal = () => {
    setEditingHour(null);
    setIsCustomDay(false);
    setDayRangeStart(0);
    setDayRangeEnd(3);
    setHourForm({
      dayTr: 'Pazartesi – Perşembe',
      dayEn: 'Monday – Thursday',
      openTime: '08:00',
      closeTime: '23:00',
      isClosed: false,
      customText: '',
    });
    setIsHourModalOpen(true);
  };

  const openEditHourModal = (item: WorkingHourItem) => {
    setEditingHour(item);
    const isItemClosed =
      item.time.toLowerCase().includes('kapalı') ||
      item.time.toLowerCase().includes('closed');

    let oTime = '08:00';
    let cTime = '22:00';

    const match = item.time.match(/(\d{1,2}:\d{2})\s*[–\-—]\s*(\d{1,2}:\d{2})/);
    if (match) {
      oTime = match[1].padStart(5, '0');
      cTime = match[2].padStart(5, '0');
    } else if (item.openHour != null && item.closeHour != null) {
      const oH = Math.floor(item.openHour);
      const oM = Math.round((item.openHour - oH) * 60);
      const cH = Math.floor(item.closeHour) % 24;
      const cM = Math.round((item.closeHour - Math.floor(item.closeHour)) * 60);
      oTime = `${String(oH).padStart(2, '0')}:${String(oM).padStart(2, '0')}`;
      cTime = `${String(cH).padStart(2, '0')}:${String(cM).padStart(2, '0')}`;
    }

    const { start, end } = parseDayRangeIndices(item.dayTr);
    if (start !== -1) {
      setDayRangeStart(start);
      setDayRangeEnd(end);
      setIsCustomDay(false);
    } else {
      setDayRangeStart(null);
      setDayRangeEnd(null);
      setIsCustomDay(true);
    }

    setHourForm({
      dayTr: item.dayTr,
      dayEn: item.dayEn || '',
      openTime: oTime,
      closeTime: cTime,
      isClosed: isItemClosed,
      customText: isItemClosed || match ? '' : item.time,
    });
    setIsHourModalOpen(true);
  };

  const handleDayClick = (clickedIdx: number) => {
    setIsCustomDay(false);
    if (dayRangeStart === null || dayRangeEnd !== null) {
      setDayRangeStart(clickedIdx);
      setDayRangeEnd(null);
      setHourForm((prev) => ({
        ...prev,
        dayTr: SINGLE_DAYS[clickedIdx].tr,
        dayEn: SINGLE_DAYS[clickedIdx].en,
      }));
    } else {
      if (clickedIdx === dayRangeStart) {
        setDayRangeStart(clickedIdx);
        setDayRangeEnd(null);
        setHourForm((prev) => ({
          ...prev,
          dayTr: SINGLE_DAYS[clickedIdx].tr,
          dayEn: SINGLE_DAYS[clickedIdx].en,
        }));
      } else {
        const start = Math.min(dayRangeStart, clickedIdx);
        const end = Math.max(dayRangeStart, clickedIdx);
        setDayRangeStart(start);
        setDayRangeEnd(end);
        setHourForm((prev) => ({
          ...prev,
          dayTr: `${SINGLE_DAYS[start].tr} – ${SINGLE_DAYS[end].tr}`,
          dayEn: `${SINGLE_DAYS[start].en} – ${SINGLE_DAYS[end].en}`,
        }));
      }
    }
  };

  const handlePresetClick = (preset: { id: string; tr: string; en: string; start: number; end: number }) => {
    setIsCustomDay(false);
    setDayRangeStart(preset.start);
    setDayRangeEnd(preset.end);
    setHourForm((prev) => ({
      ...prev,
      dayTr: preset.tr,
      dayEn: preset.en,
    }));
  };

  const handleSaveHour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hourForm.dayTr.trim()) {
      alert(lang === 'tr' ? 'Lütfen gün aralığını girin.' : 'Please enter day range.');
      return;
    }

    let finalTimeStr = '';
    let oHour = 0;
    let cHour = 0;

    if (hourForm.isClosed) {
      finalTimeStr = hourForm.customText.trim() || (lang === 'tr' ? 'Kapalı' : 'Closed');
      oHour = 0;
      cHour = 0;
    } else if (hourForm.customText.trim()) {
      finalTimeStr = hourForm.customText.trim();
      oHour = parseTimeToNumber(hourForm.openTime);
      cHour = parseCloseTimeToNumber(hourForm.closeTime, oHour);
    } else {
      finalTimeStr = `${hourForm.openTime} – ${hourForm.closeTime}`;
      oHour = parseTimeToNumber(hourForm.openTime);
      cHour = parseCloseTimeToNumber(hourForm.closeTime, oHour);
    }

    if (editingHour) {
      const updated = data.hours.map((h) =>
        h.id === editingHour.id
          ? {
              ...h,
              dayTr: hourForm.dayTr.trim(),
              dayEn: hourForm.dayEn.trim() || hourForm.dayTr.trim(),
              time: finalTimeStr,
              openHour: oHour,
              closeHour: cHour,
            }
          : h
      );
      updateHours(updated);
      showToast(t.toasts.hoursUpdated);
    } else {
      const newItem: WorkingHourItem = {
        id: `h-${Date.now()}`,
        dayTr: hourForm.dayTr.trim(),
        dayEn: hourForm.dayEn.trim() || hourForm.dayTr.trim(),
        time: finalTimeStr,
        openHour: oHour,
        closeHour: cHour,
      };
      updateHours([...data.hours, newItem]);
      showToast(t.toasts.hoursAdded);
    }
    setIsHourModalOpen(false);
  };

  const handleDeleteHour = (id: string, day: string) => {
    setDeleteModalState({
      isOpen: true,
      title: lang === 'tr' ? 'Çalışma Saatini Sil' : 'Delete Working Hours',
      message: t.hoursTab.confirmDelete(day),
      onConfirm: async () => {
        setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));
        const ok = await deleteHour(id);
        setDeleteModalState((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
        if (ok) {
          showToast(t.toasts.hoursDeleted);
        } else {
          showToast(t.toasts.saveError, 'error');
        }
      },
    });
  };

  // ── Gallery Operations (Anchored Fixed Slots 1-6) ─────────────────
  const handleUploadPhotoForSlot = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetSlot: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSlot(targetSlot);
    setIsUploadingPhoto(true);
    try {
      const processedFile = await compressImage(file);
      const formData = new FormData();
      formData.append('file', processedFile);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        const currentGallery = [...(data.gallery || [])];
        const existingIdx = currentGallery.findIndex(
          (g) => g.slot === targetSlot || g.id === `slot-${targetSlot}`
        );

        const newPhoto: GalleryItemData = {
          id: `slot-${targetSlot}`,
          slot: targetSlot,
          src: json.url,
          altTr: 'botaniqa Deneyimi',
          altEn: 'botaniqa Experience',
        };

        let updatedGallery: GalleryItemData[];
        if (existingIdx >= 0) {
          updatedGallery = currentGallery.map((g, idx) =>
            idx === existingIdx ? newPhoto : g
          );
        } else {
          updatedGallery = [...currentGallery, newPhoto];
        }

        updateGallery(updatedGallery);
        showToast(
          lang === 'tr'
            ? `Fotoğraf Slot #${targetSlot}'e başarıyla yüklendi!`
            : `Photo uploaded to Slot #${targetSlot} successfully!`
        );
      } else {
        showToast(json.error || 'Yükleme başarısız', 'error');
      }
    } catch {
      showToast('Yükleme hatası oluştu', 'error');
    } finally {
      setIsUploadingPhoto(false);
      setUploadingSlot(null);
      e.target.value = '';
    }
  };

  const handleDeleteGallerySlot = (id: string, caption: string, slotNum: number) => {
    setDeleteModalState({
      isOpen: true,
      title: lang === 'tr' ? `Slot #${slotNum} Fotoğrafını Sil` : `Delete Slot #${slotNum} Photo`,
      message: t.galleryTab.confirmDelete(caption || `Slot #${slotNum}`),
      onConfirm: async () => {
        setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));
        const updated = (data.gallery || []).filter(
          (g) => g.id !== id && g.slot !== slotNum
        );
        updateGallery(updated);
        setDeleteModalState((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
        showToast(lang === 'tr' ? `Slot #${slotNum} temizlendi.` : `Slot #${slotNum} cleared.`);
      },
    });
  };

  const handleUpdateGalleryCaption = (slotNum: number, altTr: string, altEn: string) => {
    const updated = (data.gallery || []).map((g) =>
      g.slot === slotNum || g.id === `slot-${slotNum}` ? { ...g, altTr, altEn } : g
    );
    updateGallery(updated);
  };

  // ═════════════════════════════════════════════════════════════════════
  // 1. LOGIN SCREEN (WHEN UNAUTHENTICATED)
  // ═════════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <AdminLogin
        usernameInput={usernameInput}
        setUsernameInput={setUsernameInput}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        onSubmit={handleLogin}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  // ═════════════════════════════════════════════════════════════════════
  // 2. MAIN ADMIN DASHBOARD
  // ═════════════════════════════════════════════════════════════════════
  return (
    <div className="font-admin min-h-screen bg-[#fcfbfa] text-[#1c2a1c] selection:bg-[#c8aa6e]/30 flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-medium animate-fade-in ${
            toastMessage.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800 shadow-red-200/50'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-emerald-200/50'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Sidebar (Desktop + Mobile Slide-over) */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        onLogout={handleLogout}
        menuCount={data.menu.length}
        hoursCount={data.hours.length}
        galleryCount={(data.gallery || []).length}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          activeTab={activeTab}
          isSaving={isSaving}
          onSaveAll={handleSaveAll}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
          lang={lang}
        />

        <main className="flex-1 px-4 sm:px-8 py-6 pb-20 max-w-7xl w-full">
          {activeTab === 'menu' && (
            <MenuTab
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              menu={data.menu}
              onOpenAddCategoryModal={openAddCategoryModal}
              onOpenEditCategoryModal={openEditCategoryModal}
              onDeleteCategory={handleDeleteCategory}
              onOpenAddMenuModal={openAddMenuModal}
              onOpenEditMenuModal={openEditMenuModal}
              onDeleteMenuItem={handleDeleteMenuItem}
              onToggleItemAvailability={handleToggleItemAvailability}
              lang={lang}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryTab
              gallery={data.gallery || []}
              heroVideo={data.heroVideo}
              onUpdateHeroVideo={updateHeroVideo}
              aboutImage={data.aboutImage}
              aboutSecondaryImage={data.aboutSecondaryImage}
              onUpdateAboutImage={updateAboutImage}
              isUploadingPhoto={isUploadingPhoto}
              uploadingSlot={uploadingSlot}
              onUploadPhotoForSlot={handleUploadPhotoForSlot}
              onDeletePhoto={handleDeleteGallerySlot}
              onUpdateCaption={handleUpdateGalleryCaption}
              lang={lang}
            />
          )}

          {activeTab === 'hours' && (
            <WorkingHoursTab
              hours={data.hours}
              onOpenAddHourModal={openAddHourModal}
              onOpenEditHourModal={openEditHourModal}
              onDeleteHour={handleDeleteHour}
              lang={lang}
            />
          )}

          {activeTab === 'contact' && (
            <ContactTab
              contact={data.contact}
              onUpdateContact={updateContact}
              lang={lang}
            />
          )}

          {activeTab === 'socials' && (
            <SocialsTab
              socials={data.socials}
              onUpdateSocials={updateSocials}
              lang={lang}
            />
          )}

          {activeTab === 'security' && (
            <SecurityTab
              auth={data.auth}
              onUpdateAuth={updateAuth}
              onReset={handleReset}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        editingItem={editingItem}
        categories={categories}
        modalForm={modalForm}
        setModalForm={setModalForm}
        isUploadingMenuPhoto={isUploadingMenuPhoto}
        onUploadPhoto={handleUploadMenuItemPhoto}
        onSubmit={handleSaveMenuItem}
        lang={lang}
      />

      <WorkingHoursModal
        isOpen={isHourModalOpen}
        onClose={() => setIsHourModalOpen(false)}
        editingHour={editingHour}
        hourForm={hourForm}
        setHourForm={setHourForm}
        dayRangeStart={dayRangeStart}
        dayRangeEnd={dayRangeEnd}
        isCustomDay={isCustomDay}
        setIsCustomDay={setIsCustomDay}
        handleDayClick={handleDayClick}
        handlePresetClick={handlePresetClick}
        onSubmit={handleSaveHour}
        lang={lang}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        editingCategory={editingCategory}
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
        onSubmit={handleSaveCategory}
        lang={lang}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalState.isOpen}
        title={deleteModalState.title}
        message={deleteModalState.message}
        confirmText={lang === 'tr' ? 'Evet, Sil' : 'Yes, Delete'}
        cancelText={lang === 'tr' ? 'İptal' : 'Cancel'}
        isDeleting={deleteModalState.isDeleting}
        onConfirm={deleteModalState.onConfirm}
        onClose={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
