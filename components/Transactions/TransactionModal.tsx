"use client";

import React from "react";
import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TransactionFormWrapper from "./TransactionFormWrapper";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  type: "income" | "expense";
  onSubmit: (data?: any) => void | Promise<any>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  onClose,
  type,
  onSubmit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: { xs: 1, md: 2 },
        },
      }}
    >
      <Box display="flex" justifyContent="flex-end" mb={-2}>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <TransactionFormWrapper
          type={type}
          onSuccess={() => {
            onSubmit({});
          }}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
