import apiClient from "./axiosClient";

/**
 * Social Links API Client for Public & Admin operations
 */
export const socialLinkApi = {
  /**
   * Get all social links
   * @param {Object} params - { isActive, search }
   */
  getSocialLinks: async (params = {}) => {
    return apiClient.get("/social-links", { params });
  },

  /**
   * Get single social link by ID
   * @param {string} id
   */
  getSocialLink: async (id) => {
    return apiClient.get(`/social-links/${id}`);
  },

  /**
   * Create a new social link
   * @param {Object} data - { platform, title, url, icon, isActive, displayOrder }
   */
  createSocialLink: async (data) => {
    return apiClient.post("/social-links", data);
  },

  /**
   * Update an existing social link
   * @param {string} id
   * @param {Object} data
   */
  updateSocialLink: async (id, data) => {
    return apiClient.put(`/social-links/${id}`, data);
  },

  /**
   * Delete a social link by ID
   * @param {string} id
   */
  deleteSocialLink: async (id) => {
    return apiClient.delete(`/social-links/${id}`);
  },
};

export default socialLinkApi;
