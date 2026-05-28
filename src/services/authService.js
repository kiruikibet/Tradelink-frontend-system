import { BASE_URL } from "../utils/constants";

export async function registerUser(username, first_name, last_name, email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, first_name, last_name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.username?.[0] || data.email?.[0] || data.password?.[0] || "Registration failed"
    );
  }
  return data;
}

export async function loginUser(username_or_email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username_or_email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Invalid username or password");
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}

export async function getProfile() {
  const token = localStorage.getItem("access");
  const response = await fetch(`${BASE_URL}/api/auth/profile/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error("Not authenticated");
  return data;
}

export async function updateAvatar(imageUrl) {
  const token = localStorage.getItem("access");
  const response = await fetch(`${BASE_URL}/api/auth/profile/update-avatar/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ profile_picture: imageUrl }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Failed to update avatar");
  return data;
}
