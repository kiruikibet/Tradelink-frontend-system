import api from "./apiClient";

export async function forgotPassword(email) {
  const { data } = await api.post("/api/auth/forgot-password/", { email });
  return data;
}

export async function resetPassword(uid, token, password) {
  const { data } = await api.post("/api/auth/reset-password/", { uid, token, password });
  return data;
}
