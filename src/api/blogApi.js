import apiClient from "./axiosClient";

/**
 * Blog Service for Public & Admin operations
 */
export const blogApi = {
  /**
   * Get all blogs with optional filtering & pagination
   * @param {Object} params - { search, category, status, page, limit }
   */
  getBlogs: async (params = {}) => {
    return apiClient.get("/blogs", { params });
  },

  /**
   * Get single blog by ID or slug
   * @param {string} identifier - MongoDB _id or slug string
   */
  getBlog: async (identifier) => {
    return apiClient.get(`/blogs/${identifier}`);
  },

  /**
   * Create blog post with auto image compression
   * @param {FormData|Object} data - FormData containing blog fields and optional image file
   */
  createBlog: async (data) => {
    // If data is FormData, send with multipart/form-data header
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return apiClient.post("/blogs", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  },

  /**
   * Update blog post with optional new image file
   * @param {string} id - MongoDB _id
   * @param {FormData|Object} data
   */
  updateBlog: async (id, data) => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return apiClient.put(`/blogs/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  },

  /**
   * Delete blog post by ID
   * @param {string} id - MongoDB _id
   */
  deleteBlog: async (id) => {
    return apiClient.delete(`/blogs/${id}`);
  },
};

export default blogApi;
