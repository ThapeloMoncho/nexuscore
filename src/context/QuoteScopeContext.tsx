import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ServiceSlug } from '../types/nexus';
import { SERVICE_SLUGS } from '../lib/validation/schemas';

const STORAGE_KEY = 'nexus_core_quote_scope_v1';

interface QuoteScopeContextValue {
  selectedServices: ServiceSlug[];
  isDrawerOpen: boolean;
  addService: (id: ServiceSlug) => void;
  removeService: (id: ServiceSlug) => void;
  toggleService: (id: ServiceSlug) => void;
  clearServices: () => void;
  isSelected: (id: ServiceSlug) => boolean;
  openDrawer: (triggerEl?: HTMLElement | null) => void;
  closeDrawer: () => void;
  toggleDrawer: (triggerEl?: HTMLElement | null) => void;
  lastTriggerRef: React.RefObject<HTMLElement | null>;
}

const QuoteScopeContext = createContext<QuoteScopeContextValue | null>(null);

function isValidSlug(value: unknown): value is ServiceSlug {
  return typeof value === 'string' && (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function QuoteScopeProvider({ children }: { children: React.ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<ServiceSlug[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return Array.from(new Set(parsed.filter(isValidSlug)));
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedServices));
    } catch {
      // Ignore storage quota errors
    }
  }, [selectedServices]);

  const addService = useCallback((id: ServiceSlug) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeService = useCallback((id: ServiceSlug) => {
    setSelectedServices((prev) => prev.filter((item) => item !== id));
  }, []);

  const toggleService = useCallback((id: ServiceSlug) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const clearServices = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const isSelected = useCallback(
    (id: ServiceSlug) => selectedServices.includes(id),
    [selectedServices]
  );

  const openDrawer = useCallback((triggerEl?: HTMLElement | null) => {
    if (triggerEl) {
      lastTriggerRef.current = triggerEl;
    } else if (document.activeElement instanceof HTMLElement) {
      lastTriggerRef.current = document.activeElement;
    }
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  }, []);

  const toggleDrawer = useCallback(
    (triggerEl?: HTMLElement | null) => {
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer(triggerEl);
      }
    },
    [isDrawerOpen, closeDrawer, openDrawer]
  );

  return (
    <QuoteScopeContext.Provider
      value={{
        selectedServices,
        isDrawerOpen,
        addService,
        removeService,
        toggleService,
        clearServices,
        isSelected,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        lastTriggerRef,
      }}
    >
      {children}
    </QuoteScopeContext.Provider>
  );
}

export function useQuoteScope() {
  const ctx = useContext(QuoteScopeContext);
  if (!ctx) {
    throw new Error('useQuoteScope must be used within QuoteScopeProvider');
  }
  return ctx;
}
