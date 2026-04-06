/**
 * Centralized Django REST API client.
 * Uses session authentication with CSRF token from cookie.
 */

const BASE_URL = "/api/v1";

function getCsrfToken() {
  const name = "csrftoken";
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, val] = cookie.trim().split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return "";
}

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // Redirect to Django login
      window.location.href = "/accounts/login/?next=/student/portal/";
    }
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `API error ${response.status}`);
  }

  return response.json();
}

// Student profile (current logged-in user)
export const fetchStudentProfile = () => apiFetch("/students/me/");

// Full student list (admin only)
export const fetchStudents = () => apiFetch("/students/");

// Specific student by ID
export const fetchStudentById = (id) => apiFetch(`/students/${id}/`);

export default apiFetch;
