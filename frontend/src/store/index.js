import { create } from 'zustand';

export const useCVStore = create((set) => ({
  // CV Data
  cvData: {
    header: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  },

  // UI State
  selectedTemplate: 'professional',
  sections: ['header', 'summary', 'experience', 'education', 'skills', 'projects'],
  isSaving: false,
  lastSaved: null,

  // Actions
  updateCVData: (path, value) => set((state) => {
    const keys = path.split('.');
    let obj = { ...state.cvData };
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (Array.isArray(current[key])) {
        current[key] = [...current[key]];
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return { cvData: obj };
  }),

  setCVData: (data) => set({ cvData: data }),

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  addSection: (sectionName) => set((state) => ({
    sections: [...state.sections, sectionName],
  })),

  removeSection: (sectionName) => set((state) => ({
    sections: state.sections.filter((s) => s !== sectionName),
  })),

  reorderSections: (sections) => set({ sections }),

  setIsSaving: (isSaving) => set({ isSaving }),

  setLastSaved: (timestamp) => set({ lastSaved: timestamp }),

  resetCVData: () => set({
    cvData: {
      header: { fullName: '', email: '', phone: '', location: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
    },
  }),
}));

export const useUIStore = create((set) => ({
  // Global UI State
  isLoading: false,
  error: null,
  success: null,
  showModal: false,
  modalContent: null,

  // Actions
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  clearMessages: () => set({ error: null, success: null }),
  showNotification: (type, message) => {
    set({ [type]: message });
    setTimeout(() => set({ [type]: null }), 4000);
  },
}));
