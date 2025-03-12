"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { validateFormRegistration } from "@/utils/validators/validateFormRegistration";
import { validateFieldName } from "@/utils/validators/validateFieldName";
import validateFieldEmail from "@/utils/validators/validateFieldEmail";
import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { Oval } from "react-loader-spinner";

import {
  Box,
  TextField,
  Button,
  Container,
  Popover,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setError("");
    setLoading(true);

    const isFormValid = validateFormRegistration(
      name,
      email,
      password,
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
    <Box component="section" title="registration" sx={{ py: 4 }}>
      <Container maxWidth="sm">
        <Typography variant="h1" component="h1" sx={{ fontSize: 24, py: 2 }}>
          Registration
        </Typography>
        <Typography variant="body1" component="p" sx={{ fontSize: 16, py: 3 }}>
          The verification code will be sent to your email!
        </Typography>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value),
                  validateFieldName(
                    e.target.value,
                    setPopoverMessage,
                    setAnchorEl
                  );
              }}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="text"
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
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() =>
                validateFieldPassword(password, setPopoverMessage, setAnchorEl)
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
              "Registration"
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
          <Typography sx={{ p: "10px", color: "red" }}>
            {popoverMessage}
          </Typography>
        </Popover>

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
