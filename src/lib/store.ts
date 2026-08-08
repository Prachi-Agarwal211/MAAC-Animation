import { create } from 'zustand';

// UI State - Mobile menu, mega menu, etc.
interface UIState {
  mobileMenuOpen: boolean;
  megaMenuOpen: string | null;
  scrollY: number;
  isScrolled: boolean;
  toggleMobileMenu: () => void;
  setMegaMenu: (menu: string | null) => void;
  setScroll: (y: number) => void;
  closeAllMenus: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  megaMenuOpen: null,
  scrollY: 0,
  isScrolled: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setMegaMenu: (menu) => set({ megaMenuOpen: menu }),
  setScroll: (y) => set({ scrollY: y, isScrolled: y > 100 }),
  closeAllMenus: () => set({ mobileMenuOpen: false, megaMenuOpen: null }),
}));
