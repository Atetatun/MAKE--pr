import { useState } from 'react';
import { exportService } from '../services/exportService';
import { useUIStore } from '../store/uiStore';

/**
 * useExport Hook - Handle PDF and JSON exports
 * 
 * Issue #9 Subtask: Add PDF export functionality
 * Issue #9 Subtask: Add loading states for API calls
 * Issue #9 Subtask: Implement error handling & validation
 */

export const useExport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLoading: setGlobalLoading } = useUIStore();

  /**
   * Export CV as PDF
   */
  const exportPDF = async (cvId, filename = 'CV.pdf', email = null) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, email ? 'Sending PDF...' : 'Generating PDF...');

    try {
      const blob = await exportService.exportPDF(cvId, email);
      
      if (!email) {
        // Download file if not sending via email
        exportService.downloadPDF(blob, filename);
      }

      setGlobalLoading(false);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Export CV as JSON
   */
  const exportJSON = async (cvId, filename = 'CV.json') => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Generating JSON...');

    try {
      const data = await exportService.exportJSON(cvId);
      exportService.downloadJSON(data, filename);

      setGlobalLoading(false);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    exportPDF,
    exportJSON,
  };
};

export default useExport;
