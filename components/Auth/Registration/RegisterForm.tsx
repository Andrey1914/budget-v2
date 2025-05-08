"use client";

import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  Button,
  Popover,
  Divider,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { signIn } from "next-auth/react";
import googleIcon from "@/public/google.png";
import axios from "axios";
import { useRouter } from "next/navigation";

import SnackbarNotification from "@/components/Notification/Snackbar";
import { validateFormRegistration } from "@/utils/validators/validateFormRegistration";
import { validateFieldName } from "@/utils/validators/validateFieldName";
import validateFieldEmail from "@/utils/validators/validateFieldEmail";
import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import VerifyEmailModal from "@/components/Auth/Registration/VerifyEmailModal";
import StyledTextField from "@/components/Auth/Input.styled";
import { MainButton } from "@/app/styles/Buttons";

const RegisterTab: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [popoverMessage, setPopoverMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isValid = validateFormRegistration(
      name,
      email,
      password,
      setSnackbarMessage,
      (element) => {
        setShowSnackbar(true);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    );

    if (!isValid) {
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
        setSnackbarMessage("Registration successful! Check your email.");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setTimeout(() => {
          setVerifyEmailModalOpen(true);
        }, 1500);
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Something went wrong";
      setSnackbarMessage(msg);
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography sx={{ py: 2, color: "#fff" }}>
        The verification code will be sent to your email!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <StyledTextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateFieldName(e.target.value, setPopoverMessage, setAnchorEl);
            }}
            required
          />
        </Box>
        <Box mb={3}>
          <StyledTextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              validateFieldEmail(email, setPopoverMessage, setAnchorEl)
            }
            required
          />
        </Box>
        <Box mb={3}>
          <StyledTextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
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
                      sx={{ color: "#26793B" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Запам'ятати мене"
        /> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MainButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <Oval height={25} width={25} color="#fff" />
            ) : (
              <Typography>CONTINUE</Typography>
            )}
          </MainButton>
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

      <Popover
        open={Boolean(popoverMessage)}
        anchorEl={anchorEl}
        onClose={() => setPopoverMessage("")}
      >
        <Typography sx={{ p: 2, color: "red" }}>{popoverMessage}</Typography>
      </Popover>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}

      <VerifyEmailModal
        open={verifyEmailModalOpen}
        onClose={() => setVerifyEmailModalOpen(false)}
      />
    </>
  );
};

export default RegisterTab;
