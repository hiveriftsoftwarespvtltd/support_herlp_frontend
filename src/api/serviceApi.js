import apiClient from "./axiosClient";

/**
 * Service API Client for Public & Admin operations
 */
export const serviceApi = {
  /**
   * Get all services with optional filtering
   * @param {Object} params - { search, category, status, isPublished }
   */
  getServices: async (params = {}) => {
    return apiClient.get("/services", { params });
  },

  /**
   * Get single service by slug or MongoDB _id
   * @param {string} identifier - slug or _id
   */
  getService: async (identifier) => {
    return apiClient.get(`/services/${identifier}`);
  },

  /**
   * Create a new service (supports FormData with showcase1Image, showcase2Image, icon)
   * @param {FormData|Object} data
   */
  createService: async (data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return apiClient.post("/services", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  },

  /**
   * Update an existing service
   * @param {string} identifier - _id or slug
   * @param {FormData|Object} data
   */
  updateService: async (identifier, data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return apiClient.put(`/services/${identifier}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  },

  /**
   * Delete a service by identifier
   * @param {string} identifier - _id or slug
   */
  deleteService: async (identifier) => {
    return apiClient.delete(`/services/${identifier}`);
  },
};

export default serviceApi;
