"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  // любые другие поля пользователя
}

interface AuthResponse {
  user: User;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<AuthResponse>("/api/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>("/api/auth/login", {
        email,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post<AuthResponse>("/api/auth/register", {
        username,
        email,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { user, login, register, logout };
};
