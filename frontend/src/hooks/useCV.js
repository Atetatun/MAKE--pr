import { useState, useEffect } from 'react';
import { cvService } from '../services/cvService';
import { useCVStore } from '../store/cvStore';
import { useUIStore } from '../store/uiStore';

/**
 * useCV Hook - Handle CV CRUD operations
 * 
 * Issue #9 Subtask: Implement CV CRUD (create, read, update, delete)
 * Issue #9 Subtask: Add loading states for API calls
 * Issue #9 Subtask: Implement error handling & validation
 */

export const useCV = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLoading: setGlobalLoading } = useUIStore();
  const { setCVData, markSaved, cvData } = useCVStore();

  /**
   * List all CVs
   */
  const listCVs = async () => {
    setLoading(true);
    setError(null);

    try {
      const cvs = await cvService.listCVs();
      setLoading(false);
      return cvs;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Get CV by ID
   */
  const getCV = async (id) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Loading CV...');

    try {
      const cv = await cvService.getCV(id);
      
      // Update Zustand store with fetched CV data
      if (cv.data) {
        setCVData(cv.data);
      }

      setGlobalLoading(false);
      setLoading(false);
      return cv;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Create new CV
   */
  const createCV = async (data) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Creating CV...');

    try {
      const cv = await cvService.createCV(data);
      setGlobalLoading(false);
      setLoading(false);
      return cv;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Update CV
   */
  const updateCV = async (id, data) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Updating CV...');

    try {
      const cv = await cvService.updateCV(id, data);
      markSaved();
      setGlobalLoading(false);
      setLoading(false);
      return cv;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Save CV progress (auto-save)
   */
  const saveProgress = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await cvService.saveProgress(id, cvData);
      markSaved();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Delete CV
   */
  const deleteCV = async (id) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Deleting CV...');

    try {
      const result = await cvService.deleteCV(id);
      setGlobalLoading(false);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Auto-save on interval (30 seconds)
   */
  const setupAutoSave = (cvId, interval = 30000) => {
    const autoSaveInterval = setInterval(async () => {
      const { isDirty } = useCVStore.getState();
      
      if (isDirty && cvId) {
        try {
          await saveProgress(cvId);
          console.log('Auto-saved at', new Date().toLocaleTimeString());
        } catch (err) {
          console.error('Auto-save failed:', err);
        }
      }
    }, interval);

    // Return cleanup function
    return () => clearInterval(autoSaveInterval);
  };

  return {
    loading,
    error,
    listCVs,
    getCV,
    createCV,
    updateCV,
    saveProgress,
    deleteCV,
    setupAutoSave,
  };
};

export default useCV;
