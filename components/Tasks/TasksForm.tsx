"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { TaskFormProps } from "@/interfaces";
import SnackbarNotification from "@/components/Notification/Snackbar";

import { Box, TextField, Button } from "@mui/material";

const TaskForm: React.FC<TaskFormProps> = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setError("You must be logged in to add a task.");
      return;
    }

    try {
      const res = await fetch("/api/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title || "", content: content || "" }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to add task");

        setSnackbarMessage("Failed to add task");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      } else {
        setTitle("");
        setContent("");
        setError("");

        setSnackbarMessage("Task added successfully");
        setSnackbarSeverity("success");
        setShowSnackbar(true);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setSnackbarMessage("An unexpected error occurred");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            label="Title"
            variant="outlined"
            autoFocus={true}
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <TextField
            multiline
            rows={4}
            color="primary"
            label="Content"
            variant="outlined"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">Save</Button>
      </Box>
      {showSnackbar && (
        <SnackbarNotification
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      )}
    </>
  );
};

export default TaskForm;
