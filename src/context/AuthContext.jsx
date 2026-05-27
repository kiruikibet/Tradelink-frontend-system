import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, registerUser,get_products } from "../services/api";
import { useNavigate, } from "react-router-dom";
import { products } from "../data/products";


const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 async function login(username_or_email, password) {
  await loginUser(username_or_email, password);

  const profile = await getProfile();
  console.log("PROFILE RESPONSE:", profile);

  setUser(profile.user);
  const products = await get_products();
  console.log(products);
  

  }

  async function register(username,first_name,last_name, email, password) {
    await registerUser(username,first_name,last_name, email, password);
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    console.log("user Loged out");
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