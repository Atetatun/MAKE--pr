import api from './api';

/**
 * Auth Service - Handle authentication flows
 * 
 * Issue #9 Subtask: Implement auth flow (signup/login)
 */

export const authService = {
  /**
   * Sign up new user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} { user, message }
   */
  async signup(credentials) {
    try {
      const response = await api.post('/auth/signup', credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} { user, session, accessToken }
   */
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, accessToken, session } = response.data;

      // Store token and user in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, session, accessToken };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Logout user
   * @returns {Promise<Object>}
   */
  async logout() {
    try {
      const response = await api.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('portcraft-cv-store');

      return response.data;
    } catch (error) {
      // Even if API fails, clear local data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      throw this.handleError(error);
    }
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null}
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user data');
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Handle auth errors
   */
  handleError(error) {
    const message = error.response?.data?.error || error.message || 'Authentication failed';
    return new Error(message);
  },
};

export default authService;
