'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
  initialCafeData,
} from '@/data/initialData';

interface CafeDataContextType {
  data: CafeStoreData;
  isLoaded: boolean;
  isSaving: boolean;
  storageType: 'upstash_redis' | 'local_file';
  updateCategories: (categories: CategoryData[]) => void;
  updateMenu: (menu: MenuItemData[]) => void;
  updateHours: (hours: WorkingHourItem[]) => void;
  updateContact: (contact: Partial<ContactData>) => void;
  updateSocials: (socials: Partial<SocialsData>) => void;
  updateGallery: (gallery: GalleryItemData[]) => void;
  updateAuth: (auth: Partial<AdminAuthData>) => void;
  saveToServer: (customData?: CafeStoreData) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const LOCAL_STORAGE_KEY = 'botaniqa_cafe_data_v1';

const CafeDataContext = createContext<CafeDataContextType>({
  data: initialCafeData,
  isLoaded: false,
  isSaving: false,
  storageType: 'local_file',
  updateCategories: () => {},
  updateMenu: () => {},
  updateHours: () => {},
  updateContact: () => {},
  updateSocials: () => {},
  updateGallery: () => {},
  updateAuth: () => {},
  saveToServer: async () => false,
  resetToDefaults: async () => false,
  refreshData: async () => {},
});

export function CafeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CafeStoreData>(initialCafeData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [storageType, setStorageType] = useState<'upstash_redis' | 'local_file'>('local_file');

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

  // Sync to localStorage whenever data changes
  const updateDataLocally = (newData: CafeStoreData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Failed to cache to localStorage:', e);
    }
  };

  const saveToServer = async (customData?: CafeStoreData): Promise<boolean> => {
    const payload = customData || data;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const savedData: CafeStoreData = {
            ...json.data,
            categories: json.data.categories && json.data.categories.length > 0 ? json.data.categories : defaultCategories,
          };
          setData(savedData);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
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
    const updated = { ...data, categories: newCategories };
    updateDataLocally(updated);
    saveToServer(updated);
  };

  const updateMenu = (newMenu: MenuItemData[]) => {
    const updated = { ...data, menu: newMenu };
    updateDataLocally(updated);
    saveToServer(updated);
  };

  const updateHours = (newHours: WorkingHourItem[]) => {
    const updated = { ...data, hours: newHours };
    updateDataLocally(updated);
    saveToServer(updated);
  };

  const updateContact = (newContact: Partial<ContactData>) => {
    const updated = { ...data, contact: { ...data.contact, ...newContact } };
    updateDataLocally(updated);
    saveToServer(updated);
  };

  const updateSocials = (newSocials: Partial<SocialsData>) => {
    const updated = { ...data, socials: { ...data.socials, ...newSocials } };
    updateDataLocally(updated);
    saveToServer(updated);
  };

  const updateAuth = (newAuth: Partial<AdminAuthData>) => {
    const updated = { ...data, auth: { ...data.auth, ...newAuth } };
    updateDataLocally(updated);
    saveToServer(updated);
  };

  const updateGallery = (newGallery: GalleryItemData[]) => {
    const updated = { ...data, gallery: newGallery };
    updateDataLocally(updated);
    saveToServer(updated);
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
        updateAuth,
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
