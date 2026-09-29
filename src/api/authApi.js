import apiClient from "./axiosClient";

/**
 * Auth API Service
 */
export const authApi = {
  /**
   * Admin Login
   * @param {{ email: string, password: string }} credentials
   */
  login: async (credentials) => {
    return apiClient.post("/auth/login", credentials);
  },

  /**
   * Fetch current authenticated admin profile
   */
  getProfile: async () => {
    return apiClient.get("/auth/profile");
  },

  /**
   * Sign out admin and clean local storage
   */
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("support_help_admin_session");
      localStorage.removeItem("support_help_admin_token");
      localStorage.removeItem("support_help_admin_user");
    }
  },
};

export default authApi;
