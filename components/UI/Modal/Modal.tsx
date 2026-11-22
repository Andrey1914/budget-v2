import React from "react";
import { DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledDialog,
  ModalTopBar,
  ModalCloseButton,
  ModalDivider,
} from "@/components/features/transactions/styles";
import { ModalProps } from "./types";

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidth = "xs",
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      disableRestoreFocus
    >
      <ModalTopBar>
        <ModalCloseButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon sx={{ fontSize: "24px" }} />
        </ModalCloseButton>
      </ModalTopBar>

      <ModalDivider />

      <DialogContent sx={{ p: 5 }}>{children}</DialogContent>
    </StyledDialog>
  );
};
