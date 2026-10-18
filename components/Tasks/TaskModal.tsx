import React from "react";
import { Modal } from "@/components/UI";
import TaskForm from "@/components/Tasks/TasksForm";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => Promise<void> | void;
  loading?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const handleFormSubmit = async (data: { title: string; content: string }) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Task" maxWidth="xs">
      <TaskForm onSubmit={handleFormSubmit} loading={loading} />
    </Modal>
  );
};

export default TaskModal;
