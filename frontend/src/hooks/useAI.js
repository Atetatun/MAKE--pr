import { useState } from 'react';
import { aiService } from '../services/aiService';
import { useUIStore } from '../store/uiStore';

/**
 * useAI Hook - Handle AI Auto-Write operations
 * 
 * Issue #9 Subtask: Implement AI Auto-Write integration
 * Issue #9 Subtask: Add loading states for API calls
 * Issue #9 Subtask: Implement error handling & validation
 */

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const { setLoading: setGlobalLoading } = useUIStore();

  /**
   * Generate text with AI
   */
  const generate = async (section, input) => {
    setLoading(true);
    setError(null);
    setOptions([]);
    setGlobalLoading(true, 'Generating with AI...');

    try {
      const result = await aiService.generate(section, input);
      setOptions(result.options);
      setGlobalLoading(false);
      setLoading(false);
      return result.options;
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Generate experience description
   */
  const generateExperience = async (input) => {
    setLoading(true);
    setError(null);
    setOptions([]);
    setGlobalLoading(true, 'Generating experience...');

    try {
      const result = await aiService.generateExperience(input);
      setOptions(result);
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
   * Generate skills
   */
  const generateSkills = async (input) => {
    setLoading(true);
    setError(null);
    setOptions([]);
    setGlobalLoading(true, 'Generating skills...');

    try {
      const result = await aiService.generateSkills(input);
      setOptions(result);
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
   * Generate summary
   */
  const generateSummary = async (input) => {
    setLoading(true);
    setError(null);
    setOptions([]);
    setGlobalLoading(true, 'Generating summary...');

    try {
      const result = await aiService.generateSummary(input);
      setOptions(result);
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
   * Generate project description
   */
  const generateProject = async (input) => {
    setLoading(true);
    setError(null);
    setOptions([]);
    setGlobalLoading(true, 'Generating project...');

    try {
      const result = await aiService.generateProject(input);
      setOptions(result);
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
   * Generate education description
   */
  const generateEducation = async (input) => {
    setLoading(true);
    setError(null);
    setOptions([]);
    setGlobalLoading(true, 'Generating education...');

    try {
      const result = await aiService.generateEducation(input);
      setOptions(result);
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
   * Clear options
   */
  const clearOptions = () => {
    setOptions([]);
    setError(null);
  };

  return {
    loading,
    error,
    options,
    generate,
    generateExperience,
    generateSkills,
    generateSummary,
    generateProject,
    generateEducation,
    clearOptions,
  };
};

export default useAI;
