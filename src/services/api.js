const BASE_URL = "http://127.0.0.1:8000/api/auth";

export async function registerUser(username,first_name,last_name, email, password) {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username,first_name,last_name,email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
  throw new Error(
    data.username?.[0] ||
    data.email?.[0] ||
    data.password?.[0] ||
    "Registration failed"
  );
}

  return data;
}

export async function loginUser(username_or_email, password) {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username_or_email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Invalid username or password");
  }

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);

  return data;
}

export async function getProfile() {
  const token = localStorage.getItem("access");

  const response = await fetch(`${BASE_URL}/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return data;
}