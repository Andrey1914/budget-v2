import { useState, useEffect } from "react";
import axios from "axios";
import { useEditTask } from "@/hooks/useTaskHooks";
import { Oval } from "react-loader-spinner";

import { Box, TextField, Button } from "@mui/material";

const EditTaskForm = ({
  taskId,
  refreshTasks,
  onClose,
}: {
  taskId: string;
  refreshTasks: () => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editTask = useEditTask();

  useEffect(() => {
    const getTaskById = async () => {
      try {
        const response = await axios.get(`/api/tasks/${taskId}`);
        const { title, content, date } = response.data;
        setTitle(title);
        setContent(content);
        setDate(date);
      } catch (err: any) {
        setError(err.message || "Failed to load task");
      }
    };

    getTaskById();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    editTask.mutate(
      { taskId, title, content, date },
      {
        onSuccess: () => {
          refreshTasks();
          onClose();
        },
        onError: (err: any) => {
          setError(err.message || "Failed to update task");
        },
      }
    );
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          autoFocus={true}
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <TextField
          id="content"
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
      <div>
        <TextField
          id="date"
          variant="outlined"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
      <Button variant="outlined" type="button" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditTaskForm;
