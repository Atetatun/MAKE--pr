import api from './api';

/**
 * CV Service - Handle CV CRUD operations
 * 
 * Issue #9 Subtask: Implement CV CRUD (create, read, update, delete)
 */

export const cvService = {
  /**
   * Get all CVs for current user
   * @returns {Promise<Array>} List of CVs
   */
  async listCVs() {
    try {
      const response = await api.get('/cvs');
      return response.data.cvs;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch CVs');
    }
  },

  /**
   * Get CV by ID
   * @param {string|number} id - CV ID
   * @returns {Promise<Object>} CV data
   */
  async getCV(id) {
    try {
      const response = await api.get(`/cvs/${id}`);
      return response.data.cv;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch CV');
    }
  },

  /**
   * Create new CV
   * @param {Object} cvData - { template_id, name }
   * @returns {Promise<Object>} Created CV
   */
  async createCV(cvData) {
    try {
      const response = await api.post('/cvs', cvData);
      return response.data.cv;
    } catch (error) {
      throw this.handleError(error, 'Failed to create CV');
    }
  },

  /**
   * Update CV
   * @param {string|number} id - CV ID
   * @param {Object} cvData - CV data to update
   * @returns {Promise<Object>} Updated CV
   */
  async updateCV(id, cvData) {
    try {
      const response = await api.put(`/cvs/${id}`, { data: cvData });
      return response.data.cv;
    } catch (error) {
      throw this.handleError(error, 'Failed to update CV');
    }
  },

  /**
   * Auto-save CV progress
   * @param {string|number} id - CV ID
   * @param {Object} cvData - CV data
   * @returns {Promise<Object>} Save confirmation
   */
  async saveProgress(id, cvData) {
    try {
      const response = await api.post(`/cvs/${id}/save-progress`, { cv: cvData });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to save progress');
    }
  },

  /**
   * Delete CV
   * @param {string|number} id - CV ID
   * @returns {Promise<Object>} Delete confirmation
   */
  async deleteCV(id) {
    try {
      const response = await api.delete(`/cvs/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to delete CV');
    }
  },

  /**
   * Handle CV service errors
   */
  handleError(error, defaultMessage) {
    const message = error.response?.data?.error || error.message || defaultMessage;
    return new Error(message);
  },
};

export default cvService;
