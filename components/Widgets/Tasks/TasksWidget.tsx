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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" component="h2">
            Tasks
          </Typography>
        </Box>

        <PlusIconButton variantType="task" onClick={onOpenModal} />
      </Box>

      <TasksList />
    </DashboardCard>
  );
};
