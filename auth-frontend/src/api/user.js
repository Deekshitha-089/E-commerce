import { apiFetch } from "./apiClient";

// 🔒 Protected API call
export async function getProfile() {
  return apiFetch("/api/user/profile");
}
