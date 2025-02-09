"use client";

import React from "react";
import { useRouter } from "next/navigation";

import TaskForm from "@/components/Tasks/TasksForm";
import { useAddTask } from "@/hooks/useTaskHooks";

import { Box, Container, Typography } from "@mui/material";

const AddTask: React.FC = () => {
  const router = useRouter();
  const addTask = useAddTask();

  const handleSubmit = async (data: { title: string; content: string }) => {
    addTask.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (err) => {
        console.error("Failed to add task", err);
      },
    });
  };

  return (
    <Box component="section">
      <Container maxWidth="sm">
        <div>
          <Typography variant="h2" component="h1">
            Add Task
          </Typography>

          <TaskForm onSubmit={handleSubmit} />
        </div>
      </Container>
    </Box>
  );
};

export default AddTask;
