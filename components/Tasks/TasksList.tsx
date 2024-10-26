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
    <div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <Typography variant="h2" component="h1">
            Tasks
          </Typography>

          {unresolvedTasksCount > 0 && (
            <Typography
              variant="h4"
              component="p"
              style={{
                padding: "0.8rem",
                color: "white",
                backgroundColor: "orange",
                borderRadius: "0.3rem",
              }}
            >
              You have {unresolvedTasksCount} unresolved tasks!
            </Typography>
          )}

          <List style={{ width: "100%" }}>
            {Array.isArray(tasks) &&
              tasks.map((item: Task) => (
                <ListItem key={item._id}>
                  <Paper
                    style={{
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                        width: "70%",
                      }}
                    >
                      <Checkbox
                        checked={Boolean(item.completed)}
                        onChange={() =>
                          handleCheckboxChange(item._id, item.completed)
                        }
                      />
                      <p>
                        {item.title} - {item.content}
                      </p>
                    </div>
                    <div>
                      <Fab
                        aria-label="edit"
                        onClick={() => handleEdit(item._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        <Edit />
                      </Fab>
                      <Fab
                        aria-label="delete"
                        onClick={() => handleDelete(item._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        <Delete />
                      </Fab>
                    </div>
                  </Paper>
                </ListItem>
              ))}
          </List>
        </div>
      </div>
      {editingTaskId && (
        <EditTaskForm
          taskId={editingTaskId}
          refreshTasks={refreshTasks}
          onClose={() => setEditingTaskId(null)}
        />
      )}
    </div>
  );
};

export default TasksList;
