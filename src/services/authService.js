import { apiRequest, setAuthTokens } from "./apiClient";

export async function registerUser(username, first_name, last_name, email, password) {
  return apiRequest("/api/auth/register/", {
    method: "POST",
    body: { username, first_name, last_name, email, password },
    errorMessage: "Registration failed",
  });
}

export async function loginUser(username_or_email, password) {
  const data = await apiRequest("/api/auth/login/", {
    method: "POST",
    body: { username_or_email, password },
    errorMessage: "Invalid username or password",
  });
  setAuthTokens(data);
  return data;
}

export async function getProfile() {
  return apiRequest("/api/auth/profile/", {
    auth: true,
    errorMessage: "Not authenticated",
  });
}

export async function updateAvatar(imageUrl, publicId) {
  return apiRequest("/api/auth/profile/update-avatar/", {
    method: "PATCH",
    auth: true,
    body: { profile_picture: imageUrl, public_id: publicId },
    errorMessage: "Failed to update avatar",
  });
}

export async function updateProfile(data) {
  return apiRequest("/api/auth/profile/update/", {
    method: "PATCH",
    auth: true,
    body: data,
    errorMessage: "Failed to update profile",
  });
}

export async function checkUsernameAvailable(username) {
  return apiRequest(`/api/auth/check-username/?username=${encodeURIComponent(username)}`, {
    errorMessage: "Failed to check username",
  });
}
