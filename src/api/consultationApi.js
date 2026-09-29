import apiClient from "./axiosClient";

/**
 * Consultation Bookings API Service
 */
export const consultationApi = {
  /**
   * Book a free consultation (/free-consultation form)
   * @param {Object} data - { name, companyName, workEmail, phone, primaryService, preferredTimeSlot, overview, sourcePage }
   */
  bookConsultation: async (data) => {
    return apiClient.post("/consultations", data);
  },

  /**
   * Admin: Get all booked consultations
   * @param {Object} params - { search, status, page, limit }
   */
  getConsultations: async (params = {}) => {
    return apiClient.get("/consultations", { params });
  },

  /**
   * Admin: Get consultation booking stats
   */
  getConsultationStats: async () => {
    return apiClient.get("/consultations/stats");
  },

  /**
   * Admin: Update consultation status
   * @param {string} id
   * @param {string} status - 'pending' | 'scheduled' | 'in_review' | 'completed' | 'cancelled'
   * @param {string} [internalNotes]
   */
  updateConsultationStatus: async (id, status, internalNotes) => {
    return apiClient.patch(`/consultations/${id}/status`, { status, internalNotes });
  },

  /**
   * Admin: Delete consultation record
   * @param {string} id
   */
  deleteConsultation: async (id) => {
    return apiClient.delete(`/consultations/${id}`);
  },
};

export default consultationApi;
