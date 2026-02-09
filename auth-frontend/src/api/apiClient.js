const BASE_URL = "http://localhost:8081";

/**
 * Centralized fetch wrapper
 * Automatically attaches JWT if present
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle non-OK responses
  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // ignore JSON parse error
    }

    throw new Error(errorMessage);
  }

  // If no content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
