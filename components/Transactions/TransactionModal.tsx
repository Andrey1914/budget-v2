"use client";

import React from "react";
import TransactionForm from "./TransactionForm";
import { Modal } from "@/components/UI";
import { ModalBody, ModalTitle } from "./styles";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  type: "income" | "expense";
  onSubmit?: (data?: any) => void | Promise<any>;
  title?: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  onClose,
  type,
  onSubmit,
  title,
}) => {
  const defaultTitle =
    type === "income" ? "Додати нове надходження:" : "Додати нову витрату:";
  const modalTitle = title || defaultTitle;

  const handleClose = () => {
    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
    onClose();
  };

  const handleSuccess = async () => {
    if (onSubmit) {
      await onSubmit();
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} maxWidth="xs">
      <ModalBody>
        <ModalTitle variant="h5">{modalTitle}</ModalTitle>

        <TransactionForm
          type={type}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      </ModalBody>
    </Modal>
  );
};

export default TransactionModal;
