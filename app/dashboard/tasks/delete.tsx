"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DeleteTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const deleteTask = async () => {
      const res = await axios.delete(`/api/tasks/delete?id=${id}`);

      if (res.status === 200) {
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
