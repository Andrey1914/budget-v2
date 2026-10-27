import React from "react";
import { Modal } from "@/components/UI";
import { Box, Button, Typography } from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Подтверждение действия",
  message,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  loading = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="body1">{message}</Typography>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
