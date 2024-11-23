"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import SnackbarNotification from "@/components/Notification/Snackbar";

import axios from "axios";

import { Box, TextField, Button, Container } from "@mui/material";

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setMessage("Пароли не совпадают!");
      setError(error || "Пароли не совпадают!");

      setSnackbarMessage("Пароли не совпадают!");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/forgotPassword/forgotPassword", {
        email,
        newPassword,
      });

      console.log("Reset password page:", data);

      setMessage(
        data.message || "Пароль успешно изменён. Теперь вы можете войти."
      );
      console.log("Reset password page:", data);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      setSnackbarMessage("Пароль успешно изменён!");
      setSnackbarSeverity("success");
      setShowSnackbar(true);

      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } catch (error: any) {
      console.error("Ошибка:", error);
      setMessage(
        error.response?.data?.message || "Ошибка при соединении с сервером."
      );

      setError(error.message || "Ошибка при соединении с сервером.");

      setSnackbarMessage("Ошибка при соединении с сервером.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" style={{ padding: "2rem 0" }}>
      <Container maxWidth="sm">
        <h1>Сменить пароль</h1>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="New password"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Confirm new password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              "Сменить пароль"
            )}
          </Button>
        </form>

        {message && <p>{message}</p>}

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

export default ResetPasswordPage;
