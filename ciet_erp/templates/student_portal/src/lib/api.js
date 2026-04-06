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
export const fetchStudentProfile = () => apiFetch("/students/profiles/me/");

// Full student list (admin only)
export const fetchStudents = () => apiFetch("/students/");

// Specific student by ID
export const fetchStudentById = (id) => apiFetch(`/students/${id}/`);

// Profile modifications
export const updateStudentProfile = (data) => apiFetch(`/students/profiles/me/`, { method: "PATCH", body: JSON.stringify(data) });

// Nested items CRUD
const createItem = (resource, data) => apiFetch(`/students/${resource}/`, { method: "POST", body: JSON.stringify(data) });
const deleteItem = (resource, id) => apiFetch(`/students/${resource}/${id}/`, { method: "DELETE" });

export const createInternship = (data) => createItem('internships', data);
export const deleteInternship = (id) => deleteItem('internships', id);

export const createProject = (data) => createItem('projects', data);
export const deleteProject = (id) => deleteItem('projects', id);

export const createCertification = (data) => createItem('certifications', data);
export const deleteCertification = (id) => deleteItem('certifications', id);

export const createEvent = (data) => createItem('events', data);
export const deleteEvent = (id) => deleteItem('events', id);

export const createResearch = (data) => createItem('research', data);
export const deleteResearch = (id) => deleteItem('research', id);

export const createCourse = (data) => createItem('courses', data);
export const deleteCourse = (id) => deleteItem('courses', id);

export const createEducation = (data) => createItem('education', data);
export const deleteEducation = (id) => deleteItem('education', id);

export const createSemesterResult = (data) => createItem('semester-results', data);
export const deleteSemesterResult = (id) => deleteItem('semester-results', id);

export default apiFetch;
