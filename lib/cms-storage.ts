import { DEFAULT_CMS_STATE } from './cms-defaults';
import type { CMSState } from './cms-types';
import { getInitialAdminPasswordHash } from './crypto';

const DB_NAME = 'abm_global_cms_db';
const DB_VERSION = 1;
const STORE_NAME = 'cms_store';
const STATE_KEY = 'abm_cms_state_v1';
const LOCAL_STORAGE_KEY = 'abm_global_cms_state_v1';

function openIndexedDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readFromIndexedDB(): Promise<CMSState | null> {
  const db = await openIndexedDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STATE_KEY);
      req.onsuccess = () => resolve((req.result as CMSState) || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeToIndexedDB(state: CMSState): Promise<void> {
  const db = await openIndexedDB();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(state, STATE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function loadCMSState(): Promise<CMSState> {
  if (typeof window === 'undefined') {
    return DEFAULT_CMS_STATE;
  }

  let localSaved: CMSState | null = await readFromIndexedDB();

  if (!localSaved) {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        localSaved = JSON.parse(raw) as CMSState;
      }
    } catch {
      localSaved = null;
    }
  }

  // Attempt Supabase hydration via server proxy when configured
  try {
    const res = await fetch('/api/cms', { cache: 'no-store' });
    if (res.ok) {
      const json = (await res.json()) as {
        configured?: boolean;
        adminConfigured?: boolean;
        state?: Partial<CMSState> | null;
      };
      if (json.configured && json.state && json.state.content) {
        const base = localSaved || DEFAULT_CMS_STATE;
        const initialHash =
          base.adminPasswordHash || (await getInitialAdminPasswordHash());
        const merged: CMSState = {
          ...base,
          ...json.state,
          enquiries: json.state.enquiries ?? base.enquiries,
          bookings: json.state.bookings ?? base.bookings,
          adminPasswordHash: json.state.adminPasswordHash || initialHash,
        };
        await writeToIndexedDB(merged);
        return merged;
      }
    }
  } catch {
    // Fall back silently to local IndexedDB / LocalStorage
  }

  if (localSaved && localSaved.content && Array.isArray(localSaved.services)) {
    return localSaved;
  }

  const initialHash = await getInitialAdminPasswordHash();
  const initialized: CMSState = {
    ...DEFAULT_CMS_STATE,
    adminPasswordHash: initialHash,
  };
  await saveCMSState(initialized);
  return initialized;
}

export async function saveCMSState(state: CMSState): Promise<void> {
  if (typeof window === 'undefined') return;
  const payload: CMSState = {
    ...state,
    updatedAt: new Date().toISOString(),
  };

  await writeToIndexedDB(payload);

  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // LocalStorage may hit quota when large Base64 images are uploaded; IndexedDB remains authoritative.
  }

  // Background sync to Supabase if configured
  try {
    await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sync_state', state: payload }),
    });
  } catch {
    // Offline or Supabase not yet configured
  }
}

export function validateCMSBackup(data: unknown): data is CMSState {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Partial<CMSState>;
  return Boolean(
    candidate.content &&
      typeof candidate.content.companyName === 'string' &&
      Array.isArray(candidate.services) &&
      Array.isArray(candidate.gallery) &&
      Array.isArray(candidate.announcements) &&
      Array.isArray(candidate.enquiries) &&
      Array.isArray(candidate.bookings)
  );
}
