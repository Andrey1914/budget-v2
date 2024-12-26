"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

import { useRouter } from "next/navigation";
import SnackbarNotification from "@/components/Notification/Snackbar";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Container,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";

import { CloudUpload } from "@mui/icons-material";
import { Oval } from "react-loader-spinner";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProfilePage = () => {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();

  const [sessionData, setSessionData] = useState<Session | null>(session);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  const [error, setError] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get("/api/profile/get", {
          params: { email: session?.user.email },
        });

        const { name, image, createdAt: userCreatedAt } = response.data;
        setName(name || "");
        setAvatar(image || "");
        setCreatedAt(new Date(userCreatedAt).toLocaleDateString());
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (session?.user.email) {
      setEmail(session.user.email);
      getProfile();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      setSessionData(session);
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setAvatar(session.user.image || "");
    }
  }, [session]);

  console.log(session);

  useEffect(() => {
    const getUserCurrency = async () => {
      try {
        const response = await axios.get("/api/profile/getCurrency", {
          params: { email: session?.user.email },
        });
        setSelectedCurrency(response.data.currency || "USD");
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    if (session?.user.email) {
      getUserCurrency();
    }
  }, [session]);

  const handleCurrencyChange = async (currency: string) => {
    setSelectedCurrency(currency);

    try {
      await axios.put("/api/profile/updateCurrency", {
        email: session?.user.email,
        currency,
      });
      setSnackbarMessage("Currency updated successfully!");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
    } catch (error) {
      console.error("Failed to update currency:", error);
      setSnackbarMessage("Failed to update currency.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  const handleSaveChanges = async () => {
    setLoadingSave(true);

    try {
      const payload = {
        name,
        avatar,
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
            },
          };

          setSessionData(updatedSession);

          if (updateSession) {
            await updateSession(updatedSession);
          }
        }

        setSnackbarMessage(
          response.data?.message || "Profile updated successfully!"
        );
        setSnackbarSeverity("success");
        setShowSnackbar(true);
      }
    } catch (error: any) {
      setError(error.message || "Failed to add expense");

      setSnackbarMessage("Failed to add expense");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile. Please try again.");
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

          setSnackbarMessage(
            response.data?.message || "Avatar uploaded successfully!"
          );
          setSnackbarSeverity("success");
          setShowSnackbar(true);
        } else {
          throw new Error("Invalid response format: secure_url not found.");
        }
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error.response?.data || error);

      setSnackbarMessage(
        error.response?.data?.error ||
          "Failed to upload avatar. Please try again."
      );
      setSnackbarSeverity("error");
      setShowSnackbar(true);
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
        setSnackbarMessage("Avatar deleted successfully");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

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
      setSnackbarMessage("Failed to delete avatar");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      console.error("Error deleting avatar:", error);
    } finally {
      setLoadingAvatar(false);
    }
  };

  return (
    <main>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h2" component="h1" sx={{ textAlign: "center" }}>
            Profile Settings
          </Typography>
          <Box sx={{ py: 5 }}>
            <Avatar
              src={avatar || sessionData?.user?.image || ""}
              alt="User Avatar"
              sx={{ width: 300, height: 300, margin: "0 auto" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              disabled={loadingAvatar}
            >
              {loadingAvatar ? (
                <Box sx={{ pr: 2 }}>
                  <Oval
                    height="20"
                    width="20"
                    color="#1727b7"
                    secondaryColor="#6fb5e7"
                  />
                </Box>
              ) : (
                <Box sx={{ pr: 2 }}>
                  <CloudUpload />
                </Box>
              )}
              Upload files
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0])
                    handleAvatarUpload(e.target.files[0]);
                }}
                multiple
              />
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteAvatar}
              disabled={loadingAvatar}
            >
              {loadingAvatar ? (
                <Oval
                  height="20"
                  width="20"
                  color="#1727b7"
                  secondaryColor="#6fb5e7"
                />
              ) : (
                "Delete Avatar"
              )}
            </Button>
          </Box>
          <Container maxWidth="xs">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              disabled
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Profile created on:
              <strong>{createdAt || "Loading..."}</strong>
            </Typography>

            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                disabled={loadingSave}
              >
                {loadingSave && (
                  <Box sx={{ pr: 2 }}>
                    <Oval
                      height="20"
                      width="20"
                      color="#1727b7"
                      secondaryColor="#6fb5e7"
                    />
                  </Box>
                )}
                Save Changes
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => router.push("/auth/reset-password")}
              >
                Change Password
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </main>
  );
};

export default ProfilePage;
