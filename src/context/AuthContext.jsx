import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getProfile } from "../services/authService";
import { clearAuthTokens, getAccessToken } from "../services/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(username_or_email, password) {
    await loginUser(username_or_email, password);
    const profile = await getProfile();
    setUser(profile.user);
  }

  async function register(username, first_name, last_name, email, password) {
    await registerUser(username, first_name, last_name, email, password);
    await login(username, password);
  }

  function logout() {
    clearAuthTokens();
    setUser(null);
  }

  function updateUser(updates) {
    setUser((currentUser) => currentUser ? { ...currentUser, ...updates } : currentUser);
  }

  useEffect(() => {
    async function checkLoggedInUser() {
      try {
        const token = getAccessToken();
        if (!token) return;
        const profile = await getProfile();
        setUser(profile.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }
    checkLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
