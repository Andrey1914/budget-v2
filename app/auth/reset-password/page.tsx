"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { validateFormChangePassword } from "@/utils/validators/validateFormChangePassword";
import validateFieldEmail from "@/utils/validators/validateFieldEmail";
import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import validateFieldPasswordsMatch from "@/utils/validators/validateFieldPasswordMatch";

import { Oval } from "react-loader-spinner";
import SnackbarNotification from "@/components/Notification/Snackbar";

import axios from "axios";

import {
  Box,
  TextField,
  Button,
  Container,
  Popover,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [popoverMessage, setPopoverMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

    const isFormValid = validateFormChangePassword(
      email,
      newPassword,
      confirmPassword,
      setSnackbarMessage,
      (element) => {
        setShowSnackbar(true);
        if (element)
          element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    );

    if (!isFormValid) {
      setSnackbarSeverity("error");
      setLoading(false);
      return;
    }

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
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: theme.typography.fontSizes[4],
            py: 3,
          }}
        >
          Сменить пароль.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() =>
                validateFieldEmail(email, setPopoverMessage, setAnchorEl)
              }
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              id="password"
              label="New password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() =>
                validateFieldPassword(
                  newPassword,
                  setPopoverMessage,
                  setAnchorEl
                )
              }
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              id="confirm-password"
              label="Confirm new password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                validateFieldPasswordsMatch(
                  newPassword,
                  confirmPassword,
                  setPopoverMessage,
                  setAnchorEl
                )
              }
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
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

        <Popover
          open={Boolean(popoverMessage)}
          anchorEl={anchorEl}
          onClose={() => setPopoverMessage("")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ padding: "10px", color: "red" }}>
            {popoverMessage}
          </Typography>
        </Popover>

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
