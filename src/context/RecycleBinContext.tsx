import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';

interface RecycleBinApi {
  deletedIds: string[];
  deleteApp: (id: string) => void;
  restoreApp: (id: string) => void;
}

const RecycleBinContext = createContext<RecycleBinApi | null>(null);

export function RecycleBinProvider({ children }: { children: React.ReactNode }) {
  // Starts empty on both server and first client render (hydration-safe),
  // then hydrated from localStorage after mount.
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage<string[]>(STORAGE_KEYS.recycleBin, []);
    if (saved.length > 0) setDeletedIds(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(STORAGE_KEYS.recycleBin, deletedIds);
  }, [deletedIds, hydrated]);

  const deleteApp = (id: string) => {
    setDeletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const restoreApp = (id: string) => {
    setDeletedIds((prev) => prev.filter((existing) => existing !== id));
  };

  return (
    <RecycleBinContext.Provider value={{ deletedIds, deleteApp, restoreApp }}>
      {children}
    </RecycleBinContext.Provider>
  );
}

export function useRecycleBin(): RecycleBinApi {
  const ctx = useContext(RecycleBinContext);
  if (!ctx) {
    throw new Error('useRecycleBin must be used within a RecycleBinProvider');
  }
  return ctx;
}
