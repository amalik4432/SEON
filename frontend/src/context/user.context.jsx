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
    axiosInstance
      .get("/api/user/me", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        setUser(null);
        navigate("/error", {
          state: {
            status: err.response?.status,
            message: err.response?.data?.message,
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
