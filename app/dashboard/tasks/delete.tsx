"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const DeleteTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const deleteTask = async () => {
      const response = await fetch(`/api/tasks/delete?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        console.error("Failed to delete task");
      }
    };

    if (id) {
      deleteTask();
    }
  }, [id, router]);

  return (
    <div>
      <h1>Deleting Task...</h1>
    </div>
  );
};

export default DeleteTask;
