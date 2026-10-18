import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "xs",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: 1,
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {title ? (
          <Typography variant="h5" component="h2" sx={{ pl: 5, pt: 1 }}>
            {title}
          </Typography>
        ) : (
          <Box />
        )}

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="close"
          sx={{ p: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <DialogContent sx={{ p: 5 }}>{children}</DialogContent>
    </Dialog>
  );
};
