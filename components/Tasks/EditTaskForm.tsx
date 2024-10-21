import { useState, useEffect } from "react";
import axios from "axios";

import { Box, TextField, Button } from "@mui/material";

const EditTaskForm = ({
  taskId,
  refreshTasks,
  onClose,
}: {
  taskId: string;
  refreshTasks: (task: any) => void;
  onClose: (task: any) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
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

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`/api/tasks/edit`, {
        id: taskId,
        title,
        content,
        date,
      });
      alert("Task updated successfully");
      refreshTasks(response.data);
      onClose(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
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
        {loading ? "Saving..." : "Save"}
      </Button>
      <Button variant="outlined" type="button" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditTaskForm;
