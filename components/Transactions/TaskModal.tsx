"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledTextField from "@/components/Auth/Input.styled";
import { PrimaryButton } from "@/components/UI/Button/CustomButton.styled";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    targetAmount?: number;
    dueDate?: string;
  }) => Promise<void> | void;
  initialData?: {
    _id?: string;
    title?: string;
    content?: string;
    targetAmount?: number;
    dueDate?: string;
  };
  loading?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setTargetAmount(
        initialData.targetAmount ? initialData.targetAmount.toString() : "",
      );
      setDueDate(initialData.dueDate || "");
    } else {
      setTitle("");
      setContent("");
      setTargetAmount("");
      setDueDate("");
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      targetAmount: targetAmount ? parseFloat(targetAmount) : undefined,
      dueDate: dueDate || undefined,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
          backgroundColor: "background.paper",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justify: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {initialData?._id ? "Редагувати задачу" : "Нова задача / Ціль"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          dividers
          sx={{ py: 2.5, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <StyledTextField
            label="Заголовок / Назва цілі"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            size="small"
            autoFocus
          />

          <StyledTextField
            label="Опис задачи"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={3}
            fullWidth
            size="small"
          />

          <StyledTextField
            label="Цільова сума (грн) - необов'язково"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            fullWidth
            size="small"
          />

          <StyledTextField
            label="Кінцева дата - необов'язково"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <PrimaryButton
            type="submit"
            fullWidth
            disabled={loading || !title.trim()}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Зберегти"
            )}
          </PrimaryButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskModal;
