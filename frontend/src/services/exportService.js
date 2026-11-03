import api from './api';

/**
 * Export Service - Handle PDF and JSON exports
 * 
 * Issue #9 Subtask: Add PDF export functionality
 * 
 * PRD Section 4.2 - Export Features:
 *   - Export as PDF
 *   - Export as JSON backup
 */

export const exportService = {
  /**
   * Export CV as PDF
   * @param {string|number} cvId - CV ID
   * @param {string} [email] - Optional: Send PDF to email
   * @returns {Promise<Blob>} PDF file blob
   */
  async exportPDF(cvId, email = null) {
    try {
      const response = await api.post(
        '/export/pdf',
        { cvId, email },
        {
          responseType: 'blob', // Important for binary data
        }
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to export PDF');
    }
  },

  /**
   * Export CV as JSON
   * @param {string|number} cvId - CV ID
   * @returns {Promise<Object>} CV data as JSON
   */
  async exportJSON(cvId) {
    try {
      const response = await api.post('/export/json', { cvId });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to export JSON');
    }
  },

  /**
   * Download PDF file
   * @param {Blob} blob - PDF blob
   * @param {string} filename - Filename for download
   */
  downloadPDF(blob, filename = 'CV.pdf') {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  /**
   * Download JSON file
   * @param {Object} data - JSON data
   * @param {string} filename - Filename for download
   */
  downloadJSON(data, filename = 'CV.json') {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  /**
   * Handle export service errors
   */
  handleError(error, defaultMessage) {
    const message = error.response?.data?.error || error.message || defaultMessage;
    return new Error(message);
  },
};

export default exportService;
