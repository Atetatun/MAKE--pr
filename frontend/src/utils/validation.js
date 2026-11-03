/**
 * Validation Utilities
 * 
 * Issue #9 Subtask: Implement error handling & validation
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Minimum 8 characters, at least 1 letter and 1 number
 */
export const isValidPassword = (password) => {
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
};

/**
 * Validate CV name
 */
export const isValidCVName = (name) => {
  return name && name.trim().length > 0 && name.trim().length <= 100;
};

/**
 * Validate required fields
 */
export const validateRequired = (fields) => {
  const errors = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[key] = `${key} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login credentials
 */
export const validateLoginCredentials = (credentials) => {
  const errors = {};

  if (!credentials.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(credentials.email)) {
    errors.email = 'Invalid email format';
  }

  if (!credentials.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate signup credentials
 */
export const validateSignupCredentials = (credentials) => {
  const errors = {};

  if (!credentials.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(credentials.email)) {
    errors.email = 'Invalid email format';
  }

  if (!credentials.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(credentials.password)) {
    errors.password = 'Password must be at least 8 characters with 1 letter and 1 number';
  }

  if (credentials.confirmPassword && credentials.password !== credentials.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate AI input for experience section
 */
export const validateAIExperienceInput = (input) => {
  const errors = {};

  if (!input.position) errors.position = 'Position is required';
  if (!input.company) errors.company = 'Company is required';
  if (!input.duration) errors.duration = 'Duration is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  isValidEmail,
  isValidPassword,
  isValidCVName,
  validateRequired,
  validateLoginCredentials,
  validateSignupCredentials,
  validateAIExperienceInput,
};
