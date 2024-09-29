"use client";

import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type NotificationProps = {
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

const SnackbarNotification: React.FC<NotificationProps> = ({
  message,
  severity,
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
