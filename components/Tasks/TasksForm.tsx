"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { TaskFormProps } from "@/interfaces";
import { Oval } from "react-loader-spinner";
import SnackbarNotification from "@/components/Notification/Snackbar";
import { PrimaryButton } from "@/components/UI/Buttons";

import { Box, TextField, Button } from "@mui/material";

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, loading }) => {
  const { data: session } = useSession();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setSnackbarMessage("You must be logged in to add a task.");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    onSubmit({ title, content });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
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
            sx={{ width: "100%" }}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={4}
            color="primary"
            label="Content..."
            variant="outlined"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            sx={{ width: "100%" }}
          />
        </div>
        <PrimaryButton
          variant="contained"
          type="submit"
          disabled={loading}
          // sx={{
          //   width: "auto",
          //   minWidth: "auto",
          //   alignSelf: "center",
          //   px: 6,
          //   py: 2,
          // }}
        >
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
        </PrimaryButton>
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
