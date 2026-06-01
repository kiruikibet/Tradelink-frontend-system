import { BASE_URL } from "../utils/constants";

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function setAuthTokens({ access, refresh }) {
  if (access) localStorage.setItem("access", access);
  if (refresh) localStorage.setItem("refresh", refresh);
}

export function clearAuthTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function buildApiUrl(path) {
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
}

function buildHeaders({ auth = false, body, headers = {} }) {
  const nextHeaders = { ...headers };
  if (body && !(body instanceof FormData) && !nextHeaders["Content-Type"]) {
    nextHeaders["Content-Type"] = "application/json";
  }
  if (auth) {
    const token = getAccessToken();
    if (token) nextHeaders.Authorization = `Bearer ${token}`;
  }
  return nextHeaders;
}

function buildBody(body) {
  if (!body || body instanceof FormData || typeof body === "string") return body;
  return JSON.stringify(body);
}

function getErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (data.message) return data.message;
  const firstKey = Object.keys(data)[0];
  const firstValue = firstKey ? data[firstKey] : null;
  if (Array.isArray(firstValue)) return firstValue[0];
  if (typeof firstValue === "string") return firstValue;
  return fallback;
}

// Attempt to get a new access token using the refresh token
async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(buildApiUrl("/api/auth/refresh/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    clearAuthTokens();
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json();
  localStorage.setItem("access", data.access);
  return data.access;
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    auth = false,
    headers,
    errorMessage = "Request failed",
  } = options;

  const doRequest = (token) =>
    fetch(buildApiUrl(path), {
      method,
      headers: buildHeaders({ auth, body, headers,
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      }),
      body: buildBody(body),
    });

  let response = await fetch(buildApiUrl(path), {
    method,
    headers: buildHeaders({ auth, body, headers }),
    body: buildBody(body),
  });

  // If 401 and we have auth, try refreshing once
  if (response.status === 401 && auth) {
    try {
      const newToken = await refreshAccessToken();
      // retry with new token
      response = await fetch(buildApiUrl(path), {
        method,
        headers: buildHeaders({
          auth: false,
          body,
          headers: { ...headers, Authorization: `Bearer ${newToken}` },
        }),
        body: buildBody(body),
      });
    } catch {
      clearAuthTokens();
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, errorMessage));
  }

  return data;
}
