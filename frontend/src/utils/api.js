import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Auth
export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  signup: (email, password, name) => apiClient.post('/auth/signup', { email, password, name }),
  logout: () => apiClient.post('/auth/logout'),
};

// CV
export const cvAPI = {
  getAll: () => apiClient.get('/cvs'),
  getById: (id) => apiClient.get(`/cvs/${id}`),
  create: (data) => apiClient.post('/cvs', data),
  update: (id, data) => apiClient.put(`/cvs/${id}`, data),
  delete: (id) => apiClient.delete(`/cvs/${id}`),
  saveProgress: (id, data) => apiClient.post(`/cvs/${id}/save-progress`, data),
};

// Templates
export const templateAPI = {
  getAll: () => apiClient.get('/templates'),
  getById: (id) => apiClient.get(`/templates/${id}`),
};

// AI
export const aiAPI = {
  generate: (section, prompt) => apiClient.post('/ai/generate', { section, prompt }),
};

// ATS
export const atsAPI = {
  check: (cvData) => apiClient.post('/ats-check', cvData),
};

// Export
export const exportAPI = {
  toPDF: (cvData) => apiClient.post('/export/pdf', cvData, {
    responseType: 'blob',
  }),
};

export default apiClient;
