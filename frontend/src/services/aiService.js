import api from './api';

/**
 * AI Service - Handle AI Auto-Write integration
 * 
 * Issue #9 Subtask: Implement AI Auto-Write integration
 * 
 * PRD Section 4.3 - AI Auto-Write Feature:
 *   - Generate section content from user input
 *   - Return 3 options for user to pick
 */

export const aiService = {
  /**
   * Generate text with AI for a specific section
   * @param {string} section - Section type (experience, skills, summary, projects, education)
   * @param {Object} input - Input data for AI generation
   * @returns {Promise<Object>} { section, options: [string, string, string], usage }
   */
  async generate(section, input) {
    try {
      const response = await api.post('/ai/generate', {
        section,
        input,
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Generate experience description
   * @param {Object} input - { position, company, duration, achievements }
   * @returns {Promise<Array<string>>} 3 options
   */
  async generateExperience(input) {
    const result = await this.generate('experience', input);
    return result.options;
  },

  /**
   * Generate skills list
   * @param {Object} input - { position, experience, industry }
   * @returns {Promise<Array<string>>} 3 options
   */
  async generateSkills(input) {
    const result = await this.generate('skills', input);
    return result.options;
  },

  /**
   * Generate professional summary
   * @param {Object} input - { position, yearsExperience, strengths, industry }
   * @returns {Promise<Array<string>>} 3 options
   */
  async generateSummary(input) {
    const result = await this.generate('summary', input);
    return result.options;
  },

  /**
   * Generate project description
   * @param {Object} input - { name, tech, role, outcome }
   * @returns {Promise<Array<string>>} 3 options
   */
  async generateProject(input) {
    const result = await this.generate('projects', input);
    return result.options;
  },

  /**
   * Generate education description
   * @param {Object} input - { school, degree, field, year }
   * @returns {Promise<Array<string>>} 3 options
   */
  async generateEducation(input) {
    const result = await this.generate('education', input);
    return result.options;
  },

  /**
   * Handle AI service errors
   */
  handleError(error) {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;

    if (status === 429) {
      return new Error('Rate limited. Please try again in a few moments.');
    }

    if (status === 500 && message.includes('API key')) {
      return new Error('AI service is not configured. Please contact support.');
    }

    return new Error(message || 'Failed to generate text');
  },
};

export default aiService;
