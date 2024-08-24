"use client";

import React from "react";
import { useRouter } from "next/router";
import TaskForm from "@/components/Tasks/TasksForm";

const EditTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (data: { title: string; description: string }) => {
    const response = await fetch(`/api/tasks/edit?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to edit task");
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EditTask;
