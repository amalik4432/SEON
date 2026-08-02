import { createContext, useState } from "react";
import axiosInstance from "../config/axios.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/api/user/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
          navigate("/login");
        } else {
          console.error("Failed to fetch user:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
