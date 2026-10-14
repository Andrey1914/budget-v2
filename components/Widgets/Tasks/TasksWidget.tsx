import React from "react";
import { Box, Typography } from "@mui/material";
import { DashboardCard, PlusIconButton } from "@/components/UI";
import TasksList from "@/components/Tasks/TasksList";

interface TasksWidgetProps {
  onOpenModal: () => void;
}

export const TasksWidget: React.FC<TasksWidgetProps> = ({ onOpenModal }) => {
  return (
    <DashboardCard elevation={0}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Tasks
        </Typography>

        <PlusIconButton onClick={onOpenModal} />
      </Box>

      <TasksList />
    </DashboardCard>
  );
};
