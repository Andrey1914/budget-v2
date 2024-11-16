"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Task } from "@/types";
import EditTaskForm from "@/components/Tasks/EditTaskForm";
import { getTasks } from "@/app/dashboard/tasks/get";
import { updateTaskStatus } from "@/app/dashboard/tasks/updateCheckbox";
import { deleteTask } from "@/app/dashboard/tasks/delete";
import { refreshTasksList } from "@/app/dashboard/tasks/refresh";

import { Session } from "@/interfaces";

import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Fab,
  List,
  ListItem,
  Paper,
  Checkbox,
  Typography,
} from "@mui/material";

const TasksList: React.FC = () => {
  const { data: session } = useSession() as {
    data: Session | null;
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [unresolvedTasksCount, setUnresolvedTasksCount] = useState<number>(0);

  useEffect(() => {
    if (session) {
      const getTasksData = async () => {
        try {
          const tasksData = await getTasks(session);

          setTasks(tasksData);

          setUnresolvedTasksCount(
            tasksData.filter((task) => !task.completed).length
          );
        } catch (err) {
          setError((err as Error).message);
        }
      };

      getTasksData();
    }
  }, [session]);

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    if (!session) return;

    try {
      await updateTaskStatus(id, completed, session);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );

      setUnresolvedTasksCount((prevCount) =>
        completed ? prevCount + 1 : prevCount - 1
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!session) return;

    try {
      await deleteTask(id, session);
      const updatedTasks = tasks.filter((task) => task._id !== id);

      setTasks(updatedTasks);

      setUnresolvedTasksCount(
        updatedTasks.filter((task) => !task.completed).length
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEdit = (id: string) => {
    setEditingTaskId(id);
  };

  const refreshTasks = async () => {
    if (!session) return;

    try {
      const tasksData = await refreshTasksList(session);
      setTasks(tasksData);
      setUnresolvedTasksCount(
        tasksData.filter((task) => !task.completed).length
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          Tasks
        </Typography>
      </Box>

      <Box sx={{ p: 3, backgroundColor: "orange", borderRadius: "0.3rem" }}>
        {unresolvedTasksCount > 0 && (
          <Typography
            variant="h4"
            component="p"
            style={{
              color: "white",
            }}
          >
            You have {unresolvedTasksCount} unresolved tasks!
          </Typography>
        )}
      </Box>

      <List
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {Array.isArray(tasks) &&
          tasks.map((item: Task) => (
            <ListItem key={item._id} style={{ padding: 0 }}>
              <Paper
                style={{
                  padding: 9,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Checkbox
                  checked={Boolean(item.completed)}
                  onChange={() =>
                    handleCheckboxChange(item._id, item.completed)
                  }
                />
                <Typography variant="h6" component="p">
                  {item.title} - {item.content}
                </Typography>

                <Box sx={{ display: "flex", gap: 3 }}>
                  <Edit onClick={() => handleEdit(item._id)} />

                  <Delete onClick={() => handleDelete(item._id)} />
                </Box>
              </Paper>
            </ListItem>
          ))}
      </List>

      {editingTaskId && (
        <EditTaskForm
          taskId={editingTaskId}
          refreshTasks={refreshTasks}
          onClose={() => setEditingTaskId(null)}
        />
      )}
    </>
  );
};

export default TasksList;
