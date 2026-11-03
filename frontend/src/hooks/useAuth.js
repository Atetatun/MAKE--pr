import { useState } from 'react';
import { authService } from '../services/authService';
import { useUIStore } from '../store/uiStore';

/**
 * useAuth Hook - Handle authentication operations
 * 
 * Issue #9 Subtask: Implement auth flow (signup/login)
 * Issue #9 Subtask: Add loading states for API calls
 * Issue #9 Subtask: Implement error handling & validation
 */

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLoading: setGlobalLoading } = useUIStore();

  /**
   * Sign up new user
   */
  const signup = async (credentials) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Creating account...');

    try {
      const result = await authService.signup(credentials);
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
   * Login user
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Logging in...');

    try {
      const result = await authService.login(credentials);
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
   * Logout user
   */
  const logout = async () => {
    setLoading(true);
    setError(null);
    setGlobalLoading(true, 'Logging out...');

    try {
      await authService.logout();
      setGlobalLoading(false);
      setLoading(false);
      // Redirect to landing
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
      setGlobalLoading(false);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Get current user
   */
  const getCurrentUser = () => {
    return authService.getCurrentUser();
  };

  /**
   * Check if authenticated
   */
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return {
    loading,
    error,
    signup,
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
  };
};

export default useAuth;
