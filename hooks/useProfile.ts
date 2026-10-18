"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";

export const useProfile = () => {
  const { data: session, update: updateSession } = useSession();

  const [sessionData, setSessionData] = useState<Session | null>(session);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const triggerSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (session) {
      setSessionData(session);
      setEmail(session.user.email || "");
    }
  }, [session]);

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const getProfile = async () => {
      try {
        const response = await axios.get("/api/profile/get", {
          params: { email: userEmail },
        });

        const {
          name: serverName,
          image,
          createdAt: userCreatedAt,
          currency,
        } = response.data;

        setName(serverName || "");
        setAvatar(image || "");
        setSelectedCurrency(currency || "USD");

        if (userCreatedAt) {
          setCreatedAt(new Date(userCreatedAt).toLocaleDateString());
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    getProfile();
  }, [userEmail]);

  const handleSaveChanges = async () => {
    setIsConfirmOpen(false);
    setLoadingSave(true);

    try {
      const payload = {
        name,
        avatar,
        currency: selectedCurrency,
      };

      const response = await axios.put("/api/profile/update", payload);

      if (response.status === 200) {
        setAvatar(payload.avatar);

        if (sessionData) {
          const updatedSession: Session = {
            ...sessionData,
            user: {
              ...sessionData.user,
              name: payload.name,
              image: payload.avatar,
              currency: payload.currency,
            },
          };

          setSessionData(updatedSession);

          if (updateSession) {
            await updateSession(updatedSession);
          }
        }

        triggerSnackbar(
          response.data?.message || "Profile updated successfully!",
          "success",
        );
      }
    } catch (error: any) {
      console.error("Error updating profile:", error.response?.data || error);
      triggerSnackbar(
        error.response?.data?.error ||
          "Failed to update profile. Please try again.",
        "error",
      );
    } finally {
      setLoadingSave(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setLoadingAvatar(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/profile/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const secureUrl = response.data?.secure_url;

        if (secureUrl) {
          setAvatar(secureUrl);
          triggerSnackbar(
            response.data?.message || "Avatar uploaded successfully!",
            "success",
          );
        } else {
          throw new Error("Invalid response format: secure_url not found.");
        }
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error.response?.data || error);
      triggerSnackbar(
        error.response?.data?.error || "Failed to upload avatar.",
        "error",
      );
    } finally {
      setLoadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setLoadingAvatar(true);

    try {
      const response = await axios.delete("/api/profile/deleteAvatar");

      if (response.status === 200) {
        setAvatar("");
        triggerSnackbar("Avatar deleted successfully", "success");

        if (sessionData) {
          const updatedSession: Session = {
            ...sessionData,
            user: {
              ...sessionData.user,
              image: "",
            },
          };
          setSessionData(updatedSession);
          if (updateSession) {
            await updateSession(updatedSession);
          }
        }
      }
    } catch (error: any) {
      console.error("Error deleting avatar:", error);
      triggerSnackbar("Failed to delete avatar", "error");
    } finally {
      setLoadingAvatar(false);
    }
  };

  return {
    name,
    setName,
    email,
    avatar,
    createdAt,
    selectedCurrency,
    setSelectedCurrency,
    loadingSave,
    loadingAvatar,
    isConfirmOpen,
    setIsConfirmOpen,
    snackbar,
    handleCloseSnackbar,
    handleAvatarUpload,
    handleDeleteAvatar,
    handleSaveChanges,
  };
};
