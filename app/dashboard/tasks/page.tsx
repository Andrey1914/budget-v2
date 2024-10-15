"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import TaskForm from "@/components/Tasks/TasksForm";
import { Box, Container, Typography } from "@mui/material";

const AddTask: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; content: string }) => {
    const res = await axios.post("/api/tasks/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
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
