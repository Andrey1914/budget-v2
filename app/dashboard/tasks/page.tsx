"use client";

import React from "react";
import TaskForm from "@/components/Tasks/TasksForm";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";

const AddTask: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; content: string }) => {
    const response = await fetch("/api/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to add task");
    }
  };

  return (
    <SessionProvider>
      <Box component="section">
        <Container maxWidth="sm">
          <div>
            <Typography variant="h2" component="h1">
              Add Task
            </Typography>
            <TaskForm onSubmit={handleSubmit} />
          </div>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Container>
      </Box>
    </SessionProvider>
  );
};

export default AddTask;
