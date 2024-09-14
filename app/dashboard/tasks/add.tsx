"use client";

import React from "react";
import TaskForm from "@/components/Tasks/TasksForm";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Add Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTask;
