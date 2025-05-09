import { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Popover,
  useTheme,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Oval } from "react-loader-spinner";

import SnackbarNotification from "@/components/Notification/Snackbar";
import validateFieldEmail from "@/utils/validators/validateFieldEmail";
import validateFieldPassword from "@/utils/validators/validateFieldPassword";
import validateFieldPasswordsMatch from "@/utils/validators/validateFieldPasswordMatch";
import { validateFormChangePassword } from "@/utils/validators/validateFormChangePassword";
import StyledTextField from "@/components/Auth/Input.styled";
import { MainButton } from "@/app/styles/Buttons";

type Props = {
  onCancel: () => void;
};

const ResetPasswordModal: React.FC<Props> = ({ onCancel }) => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverMessage, setPopoverMessage] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isFormValid = validateFormChangePassword(
      email,
      newPassword,
      confirmPassword,
      setSnackbarMessage,
      (el) => {
        setShowSnackbar(true);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
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

      setSnackbarMessage(data.message || "Пароль успешно изменён!");
      setSnackbarSeverity("success");
      setShowSnackbar(true);

      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Ошибка:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Ошибка при соединении с сервером."
      );
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ height: "454.58px" }}>
        <StyledTextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() =>
            validateFieldEmail(email, setPopoverMessage, setAnchorEl)
          }
          required
        />
        <StyledTextField
          label="New password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={() =>
            validateFieldPassword(newPassword, setPopoverMessage, setAnchorEl)
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
        <StyledTextField
          label="Confirm new password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
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
                    sx={{ color: "#26793B" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Popover
          open={Boolean(popoverMessage)}
          anchorEl={anchorEl}
          onClose={() => setPopoverMessage("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Typography sx={{ padding: "10px", color: "red" }}>
            {popoverMessage}
          </Typography>
        </Popover>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MainButton
            type="submit"
            title="Continue"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <Oval
                height="24"
                width="24"
                color="#fff"
                secondaryColor="#6fb5e7"
              />
            ) : (
              <Typography>CONTINUE</Typography>
            )}
          </MainButton>
        </Box>

        <Button onClick={onCancel} fullWidth sx={{ mt: 1, color: "#26793B" }}>
          Back to Login
        </Button>
      </form>

      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </>
  );
};

export default ResetPasswordModal;
