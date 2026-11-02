import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * CV Store - Zustand state management for CV data
 *
 * Plan.md (Fahri - Week 1):
 *   - Setup Zustand store (user, cv data, ui state)
 *   - Setup localStorage for local save
 *   - Integrate with Riski's backend endpoints
 *
 * PRD.md Section 4.5:
 *   - Local save (localStorage)
 *   - Multiple project support
 *   - Export JSON backup
 */

const DEFAULT_CV_DATA = {
  header: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: {
    text: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

export const useCVStore = create(
  persist(
    (set, get) => ({
      // Current CV being edited
      currentCV: null,
      cvData: DEFAULT_CV_DATA,
      templateId: 'professional',
      isDirty: false,
      lastSaved: null,

      // All CVs list (for dashboard)
      cvList: [],

      // Actions
      setTemplate: (templateId) => set({ templateId }),

      setCVData: (data) =>
        set({
          cvData: data,
          isDirty: true,
        }),

      updateSection: (section, data) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            [section]: data,
          },
          isDirty: true,
        })),

      updateHeaderField: (field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            header: {
              ...state.cvData.header,
              [field]: value,
            },
          },
          isDirty: true,
        })),

      addExperience: (experience) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: [...state.cvData.experience, { id: Date.now(), ...experience }],
          },
          isDirty: true,
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: state.cvData.experience.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: state.cvData.experience.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      addSkill: (skill) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: [...state.cvData.skills, { id: Date.now(), name: skill }],
          },
          isDirty: true,
        })),

      removeSkill: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.filter((s) => s.id !== id),
          },
          isDirty: true,
        })),

      markSaved: () =>
        set({
          isDirty: false,
          lastSaved: new Date().toISOString(),
        }),

      resetCV: () =>
        set({
          cvData: DEFAULT_CV_DATA,
          isDirty: false,
          lastSaved: null,
          currentCV: null,
        }),

      // Export CV data as JSON
      exportJSON: () => {
        const state = get()
        return JSON.stringify(
          {
            templateId: state.templateId,
            cvData: state.cvData,
            exportedAt: new Date().toISOString(),
          },
          null,
          2
        )
      },
    }),
    {
      name: 'portcraft-cv-store',
      // Only persist cvData, templateId, cvList — not transient UI state
      partialize: (state) => ({
        cvData: state.cvData,
        templateId: state.templateId,
        cvList: state.cvList,
        lastSaved: state.lastSaved,
      }),
    }
  )
)

export default useCVStore
