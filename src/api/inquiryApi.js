import apiClient from "./axiosClient";

/**
 * Inquiries / Contact Form API Service
 */
export const inquiryApi = {
  /**
   * Submit new contact inquiry from any form
   * @param {Object} data - { fullName, email, phone, company, service, softwarePreference, message, sourcePage }
   */
  submitInquiry: async (data) => {
    return apiClient.post("/inquiries", data);
  },

  /**
   * Admin: Get all inquiries with optional search, status, and pagination
   * @param {Object} params - { search, status, page, limit }
   */
  getInquiries: async (params = {}) => {
    return apiClient.get("/inquiries", { params });
  },

  /**
   * Admin: Get overview inquiry stats
   */
  getInquiryStats: async () => {
    return apiClient.get("/inquiries/stats");
  },

  /**
   * Admin: Get single inquiry by ID
   * @param {string} id
   */
  getInquiryById: async (id) => {
    return apiClient.get(`/inquiries/${id}`);
  },

  /**
   * Admin: Update status of an inquiry
   * @param {string} id
   * @param {string} status - 'new' | 'in_progress' | 'replied' | 'converted' | 'closed'
   * @param {string} [internalNotes]
   */
  updateInquiryStatus: async (id, status, internalNotes) => {
    return apiClient.patch(`/inquiries/${id}/status`, { status, internalNotes });
  },

  /**
   * Admin: Delete inquiry
   * @param {string} id
   */
  deleteInquiry: async (id) => {
    return apiClient.delete(`/inquiries/${id}`);
  },
};

export default inquiryApi;
