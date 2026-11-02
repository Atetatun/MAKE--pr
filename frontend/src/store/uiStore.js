import { create } from 'zustand'

/**
 * UI Store - Global UI state (modals, loading, toasts)
 *
 * Plan.md (Fahri - Week 1): Setup Zustand store (ui state)
 */
export const useUIStore = create((set) => ({
  // Loading states
  isLoading: false,
  loadingMessage: '',

  // Modal states
  aiModalOpen: false,
  atsModalOpen: false,
  exportModalOpen: false,

  // Actions
  setLoading: (loading, message = '') =>
    set({ isLoading: loading, loadingMessage: message }),

  openAIModal: () => set({ aiModalOpen: true }),
  closeAIModal: () => set({ aiModalOpen: false }),

  openATSModal: () => set({ atsModalOpen: true }),
  closeATSModal: () => set({ atsModalOpen: false }),

  openExportModal: () => set({ exportModalOpen: true }),
  closeExportModal: () => set({ exportModalOpen: false }),
}))

export default useUIStore
