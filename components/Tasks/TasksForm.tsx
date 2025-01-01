"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TaskFormProps } from "@/interfaces";
import { Oval } from "react-loader-spinner";
import { useAddTask } from "@/hooks/useTaskHooks";
import SnackbarNotification from "@/components/Notification/Snackbar";

import { Box, TextField, Button } from "@mui/material";

const TaskForm: React.FC<TaskFormProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const addTaskMutation = useAddTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      setSnackbarMessage("You must be logged in to add a task.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    addTaskMutation.mutate(
      { title, content },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");

          setSnackbarMessage("Task added successfully");
          setSnackbarSeverity("success");
          setShowSnackbar(true);
          setLoading(false);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        },
        onError: (error) => {
          const errorMessage = (error as Error).message || "Failed to add task";
          setSnackbarMessage(errorMessage);
          setSnackbarSeverity("error");
          setShowSnackbar(true);
          setLoading(false);
        },
      }
    );
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
        <Button variant="outlined" type="submit" disabled={loading}>
          {loading ? (
            <Oval
              height="30"
              width="30"
              color="#1727b7"
              secondaryColor="#6fb5e7"
            />
          ) : (
            "Save"
          )}
        </Button>
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
