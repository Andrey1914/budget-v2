"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Task } from "@/types";
import EditTaskForm from "@/components/Tasks/EditTaskForm";

import { Delete, Edit } from "@mui/icons-material";
import { Fab, List, ListItem, Paper, Checkbox } from "@mui/material";

const TasksList: React.FC = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const tasksRes = await fetch("/api/tasks/get", {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          });

          if (!tasksRes.ok) {
            throw new Error("Failed to fetch tasks");
          }

          const tasksData: Task[] = await tasksRes.json();

          setTasks(tasksData);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchData();
    }
  }, [session]);

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    try {
      const res = await fetch("/api/tasks/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ id, completed: !completed }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, completed: !completed } : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEdit = (id: string) => {
    setEditingTaskId(id);
  };

  const refreshTasks = async () => {
    if (session) {
      const tasksRes = await fetch("/api/tasks/get", {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      const tasksData: Task[] = await tasksRes.json();
      setTasks(tasksData);
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
          <h2>Tasks</h2>

          <List style={{ width: "100%" }}>
            {tasks.map((item: Task) => (
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
