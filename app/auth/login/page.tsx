"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import googleIcon from "@/public/google.png";

import SnackbarNotification from "@/components/Notification/Snackbar";
import { Oval } from "react-loader-spinner";

import {
  Box,
  TextField,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
  FormControlLabel,
  Checkbox,
  Divider,
  Icon,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const theme = useTheme();

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        rememberMe: rememberMe ? "true" : "false",
      });

      console.log(res);

      if (res?.error) {
        setError(res.error);
        setSnackbarMessage(res.error);
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      } else {
        setSnackbarMessage("Welcome back!");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");

      setSnackbarMessage("Something went wrong");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" title="login" sx={{ py: 4 }}>
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: theme.typography.fontSizes[4], py: 2 }}
        >
          You need to register or logged in.
        </Typography>

        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            fontSize: theme.typography.fontSizes[3],
            py: 3,
          }}
        >
          Login
        </Typography>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Запам'ятати мене"
          />
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
              "Login"
            )}
          </Button>
        </form>
        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleGoogleLogin}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Увійти за допомогою Google
            <Image
              src={googleIcon.src}
              alt="Google"
              width={20}
              height={20}
              style={{ marginLeft: 8 }}
            />
          </Box>
        </Button>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Link href="/auth/reset-password" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: 18,
                p: 1,
                color: theme.palette.text.secondary,
              }}
            >
              Забули пароль?
            </Typography>
          </Link>
        </Box>

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

export default Login;
