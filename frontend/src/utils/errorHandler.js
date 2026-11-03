/**
 * Error Handler Utility
 * 
 * Issue #9 Subtask: Implement error handling & validation
 */

export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export const handleAPIError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.error || data?.message || 'An error occurred';
    
    return new APIError(message, status, data);
  }

  if (error.request) {
    return new APIError('Network error: No response from server', 0, null);
  }

  return new APIError(error.message || 'Unknown error', 0, null);
};

export const getErrorMessage = (error) => {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  return error.message || 'An unexpected error occurred';
};

export default {
  APIError,
  handleAPIError,
  getErrorMessage,
};
