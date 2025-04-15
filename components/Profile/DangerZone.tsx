"use client";

import { useState } from "react";
import { Button, Typography, Box, Alert, Snackbar } from "@mui/material";

export default function DangerZone() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteProfile = async () => {
    try {
      const res = await fetch("/api/profile/delete", { method: "POST" });
      if (res.ok) {
        setOpen(true);
      } else {
        const data = await res.json();
        setError(data.error || "Помилка видалення");
      }
    } catch (err) {
      setError("Щось пішло не так.");
    }
  };

  return (
    <Box sx={{ border: "1px solid red", mt: 4, p: 2, borderRadius: 1 }}>
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Danger Zone
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Видалення профілю не можна скасувати без підтвердження. Ви зможете
        відновити його протягом 30 днів.
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDeleteProfile}
        disabled={true}
      >
        Видалити профіль
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Профіль видалено. Ви можете його відновити протягом 30 днів."
      />
    </Box>
  );
}
