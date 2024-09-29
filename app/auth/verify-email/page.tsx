"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SnackbarNotification from "@/components/Notification/Snackbar";

import { Box, TextField, Button, Container } from "@mui/material";

const VerifyEmail: React.FC = () => {
  const { data: session, update } = useSession();
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
      const res = await fetch("/api/confirmEmail/check-email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setSnackbarMessage("Email verified successfully!");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setSnackbarMessage(data.error || "Invalid verification code");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      }
    } catch (error: any) {
      setSnackbarMessage("Something went wrong");
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
            {loading ? "Verifying..." : "Verify"}
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
