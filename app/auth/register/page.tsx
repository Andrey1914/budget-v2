"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import SnackbarNotification from "@/components/Notification/Snackbar";
import { Oval } from "react-loader-spinner";

import { Box, TextField, Button, Container } from "@mui/material";

const Register: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        setSnackbarMessage("Registration succeeded! Please verify your email.");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setTimeout(() => {
          router.push(`/auth/verify-email?email=${email}`);
        }, 1500);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create profile";

      setError(errorMessage || "Failed to create profile");
      setSnackbarMessage(errorMessage || "Failed to create profile");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section">
      <Container maxWidth="sm">
        <h1>Register</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <Oval
                height="30"
                width="30"
                color="#1727b7"
                secondaryColor="#6fb5e7"
              />
            ) : (
              "Registration"
            )}
          </Button>
        </form>

        {showSnackbar && (
          <SnackbarNotification
            message={snackbarMessage}
            severity={snackbarSeverity}
          />
        )}
      </Container>
    </Box>
  );
};

export default Register;
