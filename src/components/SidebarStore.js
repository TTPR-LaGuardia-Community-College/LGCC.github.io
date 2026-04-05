import { create } from 'zustand'

export const useSidebarStore = create((set) => ({
  isOpen: true,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}))
