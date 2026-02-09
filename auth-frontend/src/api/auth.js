import { apiFetch } from "./apiClient";

// --------------------
// SIGNUP (public)
// --------------------
export async function signup(data) {
  return apiFetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// --------------------
// LOGIN (public)
// --------------------
export async function login(data) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
