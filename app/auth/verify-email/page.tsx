"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import SnackbarNotification from "@/components/Notification/Snackbar";

import { Box, TextField, Button, Container } from "@mui/material";

const VerifyEmail: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/confirmEmail/check-email-verification",
        {
          verificationCode,
        }
      );

      if (res.status === 200) {
        setSnackbarMessage("Email verified successfully!");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setSnackbarMessage(res.data?.error || "Invalid verification code");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Invalid verification code";

      setSnackbarMessage(errorMessage || "Invalid verification code");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.isVerified) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <Box component="section">
      <Container maxWidth="sm">
        <h1>Verify Email</h1>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Verification Code"
              variant="outlined"
              fullWidth
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
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
              "Verify"
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

export default VerifyEmail;
