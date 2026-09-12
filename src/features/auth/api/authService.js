import { apiClient } from "@/lib/apiClient";

export const authService = {
  register: ({ firstName, lastName, email, password }) =>
    apiClient
      .post("/api/user/register", {
        firstName,
        // Optional on the backend — omit it entirely rather than send an
        // empty string when the user leaves it blank.
        ...(lastName?.trim() ? { lastName: lastName.trim() } : {}),
        email,
        password,
      })
      .then((res) => res.data),

  login: ({ email, password }) =>
    apiClient
      .post("/api/auth/login", { email, password })
      .then((res) => res.data),

  refresh: () =>
    apiClient.post("/api/auth/refresh").then((res) => res.data.data),

  logout: () => apiClient.post("/api/auth/logout").then((res) => res.data),
};
