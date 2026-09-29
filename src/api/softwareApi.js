import apiClient from "./axiosClient";

/**
 * Software Expertise API Service
 */
export const softwareApi = {
  /**
   * Get all software items (used by Header dropdown & Software list)
   * @param {Object} params - { search, isPublished }
   */
  getSoftwares: async (params = {}) => {
    return apiClient.get("/software-expertise", { params });
  },

  /**
   * Get single software by slug or _id (used by /software-expertise/[slug])
   * @param {string} identifier - slug or _id
   */
  getSoftware: async (identifier) => {
    return apiClient.get(`/software-expertise/${identifier}`);
  },

  /**
   * Create software expertise (supports FormData with badge/image file)
   * @param {FormData|Object} data
   */
  createSoftware: async (data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return apiClient.post("/software-expertise", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  },

  /**
   * Update software expertise
   * @param {string} id - _id or slug
   * @param {FormData|Object} data
   */
  updateSoftware: async (id, data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return apiClient.put(`/software-expertise/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  },

  /**
   * Delete software expertise
   * @param {string} id - _id or slug
   */
  deleteSoftware: async (id) => {
    return apiClient.delete(`/software-expertise/${id}`);
  },
};

export default softwareApi;
