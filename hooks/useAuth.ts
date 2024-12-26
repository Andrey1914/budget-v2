"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { IUser, AuthResponse } from "@/interfaces";

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get<AuthResponse>("/api/auth/profile");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post<AuthResponse>("/api/auth/login", {
        email,
        password,
      });
      setUser(res.data.user);
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
      const res = await axios.post<AuthResponse>("/api/auth/register", {
        username,
        email,
        password,
      });
      setUser(res.data.user);
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
