// store/ui-store.ts
import { create } from 'zustand';

interface UIState {
  isPaywallOpen: boolean;
  openPaywall: () => void;
  closePaywall: () => void;
}

/**
 * Global UI state for managing modals and overlays.
 */
export const useUIStore = create<UIState>((set) => ({
  isPaywallOpen: false,
  openPaywall: () => set({ isPaywallOpen: true }),
  closePaywall: () => set({ isPaywallOpen: false }),
}));
