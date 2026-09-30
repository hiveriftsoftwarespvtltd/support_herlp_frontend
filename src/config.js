export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:9003/api/v1"
    : "https://api.supporthelp.online/api/v1");

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:9003"
    : "https://api.supporthelp.online");

/**
 * Resolves an image path to a full working URL.
 * Handles /uploads/... from local or production backend,
 * external http/https URLs, and static public assets.
 */
export const getImageUrl = (path, fallback = "") => {
  if (!path) return fallback;
  if (typeof path !== "string") return fallback;
  if (path.startsWith("blob:") || path.startsWith("data:")) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads/")) {
    return `${BACKEND_URL}${path}`;
  }
  return path;
};

export default API_BASE_URL;


