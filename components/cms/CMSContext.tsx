'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DEFAULT_CMS_STATE } from '@/lib/cms-defaults';
import { loadCMSState, saveCMSState, validateCMSBackup } from '@/lib/cms-storage';
import type {
  AnnouncementItem,
  BusinessEnquiry,
  CMSState,
  ConsultationBooking,
  GalleryItem,
  LeadStatus,
  ServiceItem,
  SiteContent,
} from '@/lib/cms-types';
import { getInitialAdminPasswordHash, sha256Hex } from '@/lib/crypto';

interface CMSContextValue {
  state: CMSState;
  isHydrated: boolean;
  submitEnquiry: (
    payload: Omit<BusinessEnquiry, 'id' | 'referenceId' | 'status' | 'createdAt'>
  ) => Promise<BusinessEnquiry>;
  submitBooking: (
    payload: Omit<ConsultationBooking, 'id' | 'referenceId' | 'status' | 'createdAt'>
  ) => Promise<ConsultationBooking>;
  updateEnquiryStatus: (id: string, status: LeadStatus) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  updateBookingStatus: (id: string, status: LeadStatus) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  updateSiteContent: (content: SiteContent) => Promise<void>;
  updateService: (service: ServiceItem) => Promise<void>;
  addGalleryCategory: (category: string) => Promise<void>;
  deleteGalleryCategory: (category: string) => Promise<void>;
  upsertGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  upsertAnnouncement: (item: AnnouncementItem) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  verifyAdminPassword: (password: string) => Promise<boolean>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>;
  importCMSBackup: (rawJson: string) => Promise<{ ok: boolean; error?: string }>;
  exportCMSBackup: () => string;
  resetToDefaults: () => Promise<void>;
}

const CMSContext = createContext<CMSContextValue | null>(null);

function makeReference(prefix: 'ENQ' | 'CON'): string {
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(100 + Math.random() * 900);
  return `ABM-${prefix}-${y}${m}${d}-${rand}`;
}

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CMSState>(DEFAULT_CMS_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    loadCMSState().then((loaded) => {
      if (active) {
        setState(loaded);
        setIsHydrated(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback(async (updater: (prev: CMSState) => CMSState) => {
    setState((prev) => {
      const next = updater(prev);
      void saveCMSState(next);
      return next;
    });
  }, []);

  const submitEnquiry = useCallback(
    async (
      payload: Omit<BusinessEnquiry, 'id' | 'referenceId' | 'status' | 'createdAt'>
    ): Promise<BusinessEnquiry> => {
      const entry: BusinessEnquiry = {
        ...payload,
        id: `enq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        referenceId: makeReference('ENQ'),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      await persist((prev) => ({
        ...prev,
        enquiries: [entry, ...prev.enquiries],
      }));
      return entry;
    },
    [persist]
  );

  const submitBooking = useCallback(
    async (
      payload: Omit<ConsultationBooking, 'id' | 'referenceId' | 'status' | 'createdAt'>
    ): Promise<ConsultationBooking> => {
      const entry: ConsultationBooking = {
        ...payload,
        id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        referenceId: makeReference('CON'),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      await persist((prev) => ({
        ...prev,
        bookings: [entry, ...prev.bookings],
      }));
      return entry;
    },
    [persist]
  );

  const updateEnquiryStatus = useCallback(
    async (id: string, status: LeadStatus) => {
      await persist((prev) => ({
        ...prev,
        enquiries: prev.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
      }));
    },
    [persist]
  );

  const deleteEnquiry = useCallback(
    async (id: string) => {
      await persist((prev) => ({
        ...prev,
        enquiries: prev.enquiries.filter((e) => e.id !== id),
      }));
    },
    [persist]
  );

  const updateBookingStatus = useCallback(
    async (id: string, status: LeadStatus) => {
      await persist((prev) => ({
        ...prev,
        bookings: prev.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
      }));
    },
    [persist]
  );

  const deleteBooking = useCallback(
    async (id: string) => {
      await persist((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((b) => b.id !== id),
      }));
    },
    [persist]
  );

  const updateSiteContent = useCallback(
    async (content: SiteContent) => {
      await persist((prev) => ({ ...prev, content }));
    },
    [persist]
  );

  const updateService = useCallback(
    async (service: ServiceItem) => {
      await persist((prev) => ({
        ...prev,
        services: prev.services.map((s) => (s.id === service.id ? service : s)),
      }));
    },
    [persist]
  );

  const addGalleryCategory = useCallback(
    async (category: string) => {
      const trimmed = category.trim();
      if (!trimmed) return;
      await persist((prev) => {
        if (prev.galleryCategories.includes(trimmed)) return prev;
        return {
          ...prev,
          galleryCategories: [...prev.galleryCategories, trimmed],
        };
      });
    },
    [persist]
  );

  const deleteGalleryCategory = useCallback(
    async (category: string) => {
      await persist((prev) => ({
        ...prev,
        galleryCategories: prev.galleryCategories.filter((c) => c !== category),
      }));
    },
    [persist]
  );

  const upsertGalleryItem = useCallback(
    async (item: GalleryItem) => {
      await persist((prev) => {
        const exists = prev.gallery.some((g) => g.id === item.id);
        const categories = prev.galleryCategories.includes(item.category)
          ? prev.galleryCategories
          : [...prev.galleryCategories, item.category];
        return {
          ...prev,
          galleryCategories: categories,
          gallery: exists
            ? prev.gallery.map((g) => (g.id === item.id ? item : g))
            : [item, ...prev.gallery],
        };
      });
    },
    [persist]
  );

  const deleteGalleryItem = useCallback(
    async (id: string) => {
      await persist((prev) => ({
        ...prev,
        gallery: prev.gallery.filter((g) => g.id !== id),
      }));
    },
    [persist]
  );

  const upsertAnnouncement = useCallback(
    async (item: AnnouncementItem) => {
      await persist((prev) => {
        const exists = prev.announcements.some((a) => a.id === item.id);
        return {
          ...prev,
          announcements: exists
            ? prev.announcements.map((a) => (a.id === item.id ? item : a))
            : [item, ...prev.announcements],
        };
      });
    },
    [persist]
  );

  const deleteAnnouncement = useCallback(
    async (id: string) => {
      await persist((prev) => ({
        ...prev,
        announcements: prev.announcements.filter((a) => a.id !== id),
      }));
    },
    [persist]
  );

  const verifyAdminPassword = useCallback(
    async (password: string): Promise<boolean> => {
      const candidateHash = await sha256Hex(password);
      return candidateHash === state.adminPasswordHash;
    },
    [state.adminPasswordHash]
  );

  const changeAdminPassword = useCallback(
    async (
      currentPassword: string,
      newPassword: string
    ): Promise<{ ok: boolean; error?: string }> => {
      const currentHash = await sha256Hex(currentPassword);
      if (currentHash !== state.adminPasswordHash) {
        return { ok: false, error: 'Current password does not match.' };
      }
      if (newPassword.trim().length < 8) {
        return {
          ok: false,
          error: 'New password must be at least 8 characters long.',
        };
      }
      const nextHash = await sha256Hex(newPassword);
      await persist((prev) => ({
        ...prev,
        adminPasswordHash: nextHash,
      }));
      return { ok: true };
    },
    [persist, state.adminPasswordHash]
  );

  const importCMSBackup = useCallback(
    async (rawJson: string): Promise<{ ok: boolean; error?: string }> => {
      try {
        const parsed = JSON.parse(rawJson);
        if (!validateCMSBackup(parsed)) {
          return {
            ok: false,
            error: 'Invalid backup structure. Please select a valid ABM Global CMS JSON file.',
          };
        }
        const safeState: CMSState = {
          ...parsed,
          adminPasswordHash: parsed.adminPasswordHash || state.adminPasswordHash,
        };
        setState(safeState);
        await saveCMSState(safeState);
        return { ok: true };
      } catch {
        return { ok: false, error: 'Unable to parse JSON file.' };
      }
    },
    [state.adminPasswordHash]
  );

  const exportCMSBackup = useCallback(() => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  const resetToDefaults = useCallback(async () => {
    const initialHash = await getInitialAdminPasswordHash();
    const fresh: CMSState = {
      ...DEFAULT_CMS_STATE,
      adminPasswordHash: initialHash,
    };
    setState(fresh);
    await saveCMSState(fresh);
  }, []);

  const value = useMemo<CMSContextValue>(
    () => ({
      state,
      isHydrated,
      submitEnquiry,
      submitBooking,
      updateEnquiryStatus,
      deleteEnquiry,
      updateBookingStatus,
      deleteBooking,
      updateSiteContent,
      updateService,
      addGalleryCategory,
      deleteGalleryCategory,
      upsertGalleryItem,
      deleteGalleryItem,
      upsertAnnouncement,
      deleteAnnouncement,
      verifyAdminPassword,
      changeAdminPassword,
      importCMSBackup,
      exportCMSBackup,
      resetToDefaults,
    }),
    [
      state,
      isHydrated,
      submitEnquiry,
      submitBooking,
      updateEnquiryStatus,
      deleteEnquiry,
      updateBookingStatus,
      deleteBooking,
      updateSiteContent,
      updateService,
      addGalleryCategory,
      deleteGalleryCategory,
      upsertGalleryItem,
      deleteGalleryItem,
      upsertAnnouncement,
      deleteAnnouncement,
      verifyAdminPassword,
      changeAdminPassword,
      importCMSBackup,
      exportCMSBackup,
      resetToDefaults,
    ]
  );

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error('useCMS must be used inside CMSProvider');
  }
  return ctx;
}
