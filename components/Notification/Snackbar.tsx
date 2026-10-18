"use client";

import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type NotificationProps = {
  open?: boolean;
  onClose?: () => void;
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

const SnackbarNotification: React.FC<NotificationProps> = ({
  open,
  onClose,
  message,
  severity,
}: NotificationProps) => {
  const [internalOpen, setInternalOpen] = useState(true);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (!isControlled) {
      setInternalOpen(false);
    }
    onClose?.();
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
