import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getProfile } from "../services/authService";

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
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  function updateUser(updates) {
    setUser((currentUser) => currentUser ? { ...currentUser, ...updates } : currentUser);
  }

  useEffect(() => {
    async function checkLoggedInUser() {
      try {
        const token = localStorage.getItem("access");
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
