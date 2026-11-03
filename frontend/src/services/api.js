import axios from 'axios';

/**
 * API Client - Axios instance with interceptors
 * 
 * Plan.md (Fahri - Week 1):
 *   - Create API client layer (axios / fetch wrapper)
 *   - Integrate with Riski's backend endpoints
 * 
 * Issue #9 - API Integration & Data Fetching
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        
        case 403:
          console.error('Forbidden:', data.error);
          break;
        
        case 404:
          console.error('Not found:', data.error);
          break;
        
        case 429:
          console.error('Rate limited:', data.error);
          break;
        
        case 500:
          console.error('Server error:', data.error);
          break;
        
        default:
          console.error('API error:', data.error);
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error: No response from server');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
