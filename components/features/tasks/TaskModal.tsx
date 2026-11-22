import React from "react";
import { Modal } from "@/components/UI";
import { TaskForm } from "./forms";
import { TaskModalProps, IFormData } from "./types";

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const handleFormSubmit = async (data: IFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Task" maxWidth="xs">
      <TaskForm onSubmit={handleFormSubmit} loading={loading} />
    </Modal>
  );
};
