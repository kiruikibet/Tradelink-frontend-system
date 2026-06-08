import api, { setAuthTokens } from "./apiClient";

export async function registerUser(username, first_name, last_name, email, password) {
  const { data } = await api.post("/api/auth/register/", {
    username,
    first_name,
    last_name,
    email,
    password,
  });
  return data;
}

export async function loginUser(username_or_email, password) {
  const { data } = await api.post("/api/auth/login/", { username_or_email, password });
  setAuthTokens(data);
  return data;
}

export async function getProfile() {
  const { data } = await api.get("/api/auth/profile/");
  return data;
}

export async function updateAvatar(imageUrl, publicId) {
  const { data } = await api.patch("/api/auth/profile/update-avatar/", {
    profile_picture: imageUrl,
    public_id: publicId,
  });
  return data;
}

export async function updateProfile(profileData) {
  const { data } = await api.patch("/api/auth/profile/update/", profileData);
  return data;
}

export async function checkUsernameAvailable(username) {
  const { data } = await api.get(
    `/api/auth/check-username/?username=${encodeURIComponent(username)}`
  );
  return data;
}
