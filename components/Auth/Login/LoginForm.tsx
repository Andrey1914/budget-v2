"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import googleIcon from "@/public/google.png";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { Oval } from "react-loader-spinner";
import StyledTextField from "@/components/Auth/Input.styled";
import { MainButton } from "@/app/styles/Buttons";

interface LoginTabProps {
  onForgotPassword: () => void;
}

const LoginTab: React.FC<LoginTabProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    severity: "success" | "error";
  }>({ show: false, message: "", severity: "success" });

  const router = useRouter();
  const theme = useTheme();

  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        rememberMe: rememberMe ? "true" : "false",
      });

      if (res?.error) {
        setSnackbar({
          show: true,
          message: res.error,
          severity: "error",
        });
      } else {
        setSnackbar({
          show: true,
          message: "Welcome back!",
          severity: "success",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch {
      setSnackbar({
        show: true,
        message: "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Password"
          type={showPassword ? "text" : "password"}
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
                    sx={{ color: "#26793B" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ color: "#26793B" }}
            />
          }
          label="Запам'ятати мене"
          sx={{ color: "#fff" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MainButton
            type="submit"
            title="Continue"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <Oval
                height={24}
                width={24}
                color="#fff"
                secondaryColor="#6fb5e7"
              />
            ) : (
              <Typography>CONTINUE</Typography>
            )}
          </MainButton>
        </Box>
        <Box sx={{ p: 1, textAlign: "center" }}>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
            }}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: 14,
                color: "#26793B",
              }}
            >
              Забули пароль?
            </Typography>
          </Link>
        </Box>
      </form>

      <Button
        fullWidth
        title="Continue with Google"
        sx={{
          mt: "74px",
          height: "48px",
          backgroundColor: "#fff",
          color: theme.palette.common.black,
        }}
        onClick={handleGoogleLogin}
        startIcon={
          <Image src={googleIcon.src} alt="google" width={20} height={20} />
        }
      >
        Continue with Google
      </Button>

      {snackbar.show && (
        <SnackbarNotification
          message={snackbar.message}
          severity={snackbar.severity}
        />
      )}
    </>
  );
};

export default LoginTab;
