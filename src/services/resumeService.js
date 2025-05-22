/**
 * API service for handling resume-related requests
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Add a new experience to the resume
 * 
 * @param {Object} experienceData - Experience data
 * @param {string} experienceData.title - Job title
 * @param {string} experienceData.company - Company name
 * @param {string} experienceData.start_date - Start date
 * @param {string} experienceData.end_date - End date
 * @param {string} experienceData.description - Job description
 * @param {string} experienceData.logo - URL to company logo
 * @returns {Promise<Object>} - Response with ID
 */
export const addExperience = async (experienceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding experience:', error);
    throw error;
  }
};

/**
 * Get all experiences from the resume
 * 
 * @returns {Promise<Array>} - List of experiences
 */
export const getExperiences = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/experience`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};
