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

// Modal State - Video modal, image modal, etc.
interface ModalState {
  activeModal: 'video' | 'image' | null;
  modalContent?: string;
  openModal: (type: 'video' | 'image', content?: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (type, content) => set({ activeModal: type, modalContent: content }),
  closeModal: () => set({ activeModal: null, modalContent: undefined }),
}));

// Form State - Centralized form handling
interface FormState {
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
  setSubmitting: (status: boolean) => void;
  setSubmitted: (status: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  isSubmitting: false,
  submitted: false,
  error: null,
  setSubmitting: (status) => set({ isSubmitting: status }),
  setSubmitted: (status) => set({ submitted: status }),
  setError: (error) => set({ error }),
  resetForm: () => set({ isSubmitting: false, submitted: false, error: null }),
}));
