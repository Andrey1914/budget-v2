"use client";

import React from "react";
import { useRouter } from "next/navigation";

import TaskForm from "@/components/Tasks/TasksForm";
import { addTask } from "@/app/dashboard/tasks/add";

import { Box, Container, Typography } from "@mui/material";

const AddTask: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; content: string }) => {
    const result = await addTask(data.title, data.content);

    if (result) {
      router.push("/dashboard");
    } else {
      console.error("Failed to add task");
    }
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
