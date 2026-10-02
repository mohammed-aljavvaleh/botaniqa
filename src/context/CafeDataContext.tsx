'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import {
  CafeStoreData,
  MenuItemData,
  GalleryItemData,
  CategoryData,
  defaultCategories,
  WorkingHourItem,
  ContactData,
  SocialsData,
  AdminAuthData,
  HeroVideoData,
  initialCafeData,
} from '@/data/initialData';

interface CafeDataContextType {
  data: CafeStoreData;
  isLoaded: boolean;
  isSaving: boolean;
  storageType: 'upstash_redis' | 'local_file' | 'fallback_memory';
  updateCategories: (categories: CategoryData[]) => void;
  updateMenu: (menu: MenuItemData[]) => void;
  updateHours: (hours: WorkingHourItem[]) => void;
  updateContact: (contact: Partial<ContactData>) => void;
  updateSocials: (socials: Partial<SocialsData>) => void;
  updateGallery: (gallery: GalleryItemData[]) => void;
  updateHeroVideo: (heroVideo: Partial<HeroVideoData>) => Promise<boolean> | void;
  updateAboutImage: (primary: string, secondary?: string) => Promise<boolean>;
  updateAuth: (auth: Partial<AdminAuthData>) => Promise<boolean>;
  deleteCategory: (catId: string) => Promise<boolean>;
  deleteMenuItem: (itemId: string) => Promise<boolean>;
  deleteHour: (hourId: string) => Promise<boolean>;
  deleteGalleryItem: (photoId: string) => Promise<boolean>;
  saveToServer: (customData?: CafeStoreData) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const LOCAL_STORAGE_KEY = 'botaniqa_cafe_data_v1';

const CafeDataContext = createContext<CafeDataContextType>({
  data: initialCafeData,
  isLoaded: false,
  isSaving: false,
  storageType: 'upstash_redis',
  updateCategories: () => {},
  updateMenu: () => {},
  updateHours: () => {},
  updateContact: () => {},
  updateSocials: () => {},
  updateGallery: () => {},
  updateHeroVideo: () => {},
  updateAboutImage: async () => false,
  updateAuth: async () => false,
  deleteCategory: async () => false,
  deleteMenuItem: async () => false,
  deleteHour: async () => false,
  deleteGalleryItem: async () => false,
  saveToServer: async () => false,
  resetToDefaults: async () => false,
  refreshData: async () => {},
});

export function CafeDataProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: CafeStoreData;
}) {
  const [data, setData] = useState<CafeStoreData>(initialData || initialCafeData);
  const [isLoaded, setIsLoaded] = useState(Boolean(initialData));
  const [isSaving, setIsSaving] = useState(false);
  const [storageType, setStorageType] = useState<'upstash_redis' | 'local_file' | 'fallback_memory'>('upstash_redis');

  // Load data on mount from localStorage (fast) and then server API (authoritative)
  const refreshData = useCallback(async () => {
    // 1. Try local storage first
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        setData((prev) => ({
          ...prev,
          ...parsed,
          categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : (prev.categories || defaultCategories),
          contact: { ...prev.contact, ...(parsed.contact || {}) },
          socials: { ...prev.socials, ...(parsed.socials || {}) },
          auth: { ...prev.auth, ...(parsed.auth || {}) },
          heroVideo: parsed.heroVideo || prev.heroVideo || initialCafeData.heroVideo,
          aboutImage: parsed.aboutImage || prev.aboutImage || initialCafeData.aboutImage,
          aboutSecondaryImage: parsed.aboutSecondaryImage || prev.aboutSecondaryImage || initialCafeData.aboutSecondaryImage,
        }));
      }
    } catch (e) {
      console.warn('Failed to parse local storage cache:', e);
    }

    // 2. Fetch from Server API
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const finalData: CafeStoreData = {
            ...json.data,
            categories: json.data.categories && json.data.categories.length > 0 ? json.data.categories : defaultCategories,
            heroVideo: json.data.heroVideo || initialCafeData.heroVideo,
            aboutImage: json.data.aboutImage || initialCafeData.aboutImage,
            aboutSecondaryImage: json.data.aboutSecondaryImage || initialCafeData.aboutSecondaryImage,
          };
          setData(finalData);
          if (json.storage) {
            setStorageType(json.storage);
          }
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalData));
          } catch {
            // ignore
          }
        }
      }
    } catch (e) {
      console.warn('Could not fetch server cafe data, using local/fallback:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    refreshData();

    // Listen to localStorage changes from other tabs (e.g. admin tab updates main site tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && typeof parsed === 'object') {
            setData((prev) => ({
              ...prev,
              ...parsed,
              categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : prev.categories,
            }));
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshData]);

  // Keep a mutable ref of latest data to eliminate race conditions and stale closures
  const latestDataRef = useRef<CafeStoreData>(data);
  latestDataRef.current = data;

  // Sync to localStorage immediately whenever data changes (0ms UI latency)
  const updateDataLocally = (newData: CafeStoreData) => {
    latestDataRef.current = newData;
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Failed to cache to localStorage:', e);
    }
  };

  const saveToServer = async (customData?: CafeStoreData): Promise<boolean> => {
    const payload = customData || latestDataRef.current;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          const finalData = json.data || payload;
          latestDataRef.current = finalData;
          setData(finalData);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalData));
          } catch {
            // ignore
          }
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error('Failed to save to server:', e);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateCategories = (newCategories: CategoryData[]) => {
    const updated = { ...latestDataRef.current, categories: newCategories };
    updateDataLocally(updated);
  };

  const updateMenu = (newMenu: MenuItemData[]) => {
    const updated = { ...latestDataRef.current, menu: newMenu };
    updateDataLocally(updated);
  };

  const updateHours = (newHours: WorkingHourItem[]) => {
    const updated = { ...latestDataRef.current, hours: newHours };
    updateDataLocally(updated);
  };

  const updateContact = (newContact: Partial<ContactData>) => {
    const updated = {
      ...latestDataRef.current,
      contact: { ...latestDataRef.current.contact, ...newContact },
    };
    updateDataLocally(updated);
  };

  const updateSocials = (newSocials: Partial<SocialsData>) => {
    const updated = {
      ...latestDataRef.current,
      socials: { ...latestDataRef.current.socials, ...newSocials },
    };
    updateDataLocally(updated);
  };

  const updateAuth = async (newAuth: Partial<AdminAuthData>): Promise<boolean> => {
    const updated = {
      ...latestDataRef.current,
      auth: {
        ...latestDataRef.current.auth,
        ...newAuth,
        username: newAuth.username !== undefined ? newAuth.username.trim() : latestDataRef.current.auth?.username,
        passwordHash: newAuth.passwordHash !== undefined ? newAuth.passwordHash.trim() : latestDataRef.current.auth?.passwordHash,
      },
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const updateGallery = (newGallery: GalleryItemData[]) => {
    const updated = { ...latestDataRef.current, gallery: newGallery };
    updateDataLocally(updated);
  };

  const updateHeroVideo = async (newHeroVideo: Partial<HeroVideoData>): Promise<boolean> => {
    const updated: CafeStoreData = {
      ...latestDataRef.current,
      heroVideo: {
        ...(latestDataRef.current.heroVideo || initialCafeData.heroVideo || { enabled: true, poster: '', url: '' }),
        ...newHeroVideo,
      },
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const updateAboutImage = async (primary: string, secondary?: string): Promise<boolean> => {
    const updated: CafeStoreData = {
      ...latestDataRef.current,
      aboutImage: primary,
      aboutSecondaryImage: secondary !== undefined ? secondary : latestDataRef.current.aboutSecondaryImage,
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const deleteCategory = async (catId: string): Promise<boolean> => {
    const currentCats = latestDataRef.current.categories && latestDataRef.current.categories.length > 0 ? latestDataRef.current.categories : defaultCategories;
    const updatedCats = currentCats.filter((c) => c.id !== catId);
    const updatedMenu = latestDataRef.current.menu.filter((m) => m.category !== catId);
    const updated: CafeStoreData = {
      ...latestDataRef.current,
      categories: updatedCats,
      menu: updatedMenu,
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const deleteMenuItem = async (itemId: string): Promise<boolean> => {
    const updatedMenu = latestDataRef.current.menu.filter((m) => m.id !== itemId);
    const updated: CafeStoreData = {
      ...latestDataRef.current,
      menu: updatedMenu,
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const deleteHour = async (hourId: string): Promise<boolean> => {
    const updatedHours = latestDataRef.current.hours.filter((h) => h.id !== hourId);
    const updated: CafeStoreData = {
      ...latestDataRef.current,
      hours: updatedHours,
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const deleteGalleryItem = async (photoId: string): Promise<boolean> => {
    const updatedGallery = latestDataRef.current.gallery.filter((g) => g.id !== photoId);
    const updated: CafeStoreData = {
      ...latestDataRef.current,
      gallery: updatedGallery,
    };
    updateDataLocally(updated);
    return await saveToServer(updated);
  };

  const resetToDefaults = async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/data', { method: 'DELETE' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setData(initialCafeData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCafeData));
          return true;
        }
      }
      // Fallback reset
      setData(initialCafeData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCafeData));
      return true;
    } catch {
      setData(initialCafeData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCafeData));
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CafeDataContext.Provider
      value={{
        data,
        isLoaded,
        isSaving,
        storageType,
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
        refreshData,
      }}
    >
      {children}
    </CafeDataContext.Provider>
  );
}

export function useCafeData() {
  const context = useContext(CafeDataContext);
  if (!context) {
    throw new Error('useCafeData must be used within a CafeDataProvider');
  }
  return context;
}
