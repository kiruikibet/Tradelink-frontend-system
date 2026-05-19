import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 async function login(username, password) {
  await loginUser(username, password);

  const profile = await getProfile();
  console.log("PROFILE RESPONSE:", profile);

  setUser(profile.user);
}

  async function register(username, email, password) {
    await registerUser(username, email, password);
    await login(username, password);
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  useEffect(() => {
    async function checkLoggedInUser() {
      try {
        const token = localStorage.getItem("access");

        if (!token) {
          setLoading(false);
          return;
        }

        const profile = await getProfile();
        setUser(profile.user);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    }

    checkLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}