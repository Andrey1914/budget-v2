"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import EditTaskForm from "@/components/Tasks/EditTaskForm";
import {
  useGetTasks,
  useUpdateTaskStatus,
  useDeleteTask,
} from "@/hooks/useTaskHooks";

import { Session, ITask } from "@/interfaces";

import { Delete, Edit, Add } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  Paper,
  Checkbox,
  Typography,
  Fab,
} from "@mui/material";

const TasksList: React.FC = () => {
  const { data: session } = useSession() as {
    data: Session | null;
  };
  const router = useRouter();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const { data: tasks = [], error, refetch } = useGetTasks(session as Session);
  const updateTaskStatus = useUpdateTaskStatus(session as Session);
  const deleteTask = useDeleteTask(session as Session);
  const unresolvedTasksCount = tasks.filter((task) => !task.completed).length;

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    updateTaskStatus.mutate(
      { id, completed },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteTask.mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleEdit = (id: string) => {
    setEditingTaskId(id);
  };

  const hendleAddClick = () => {
    router.push("/dashboard/tasks");
  };

  if (!session) {
    return null;
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h2">
          Tasks
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: "orange",
          borderRadius: "0.3rem",
          color: "#000",
        }}
      >
        {unresolvedTasksCount > 0 ? (
          <Typography variant="h4" component="p">
            You have {unresolvedTasksCount} unresolved tasks!
          </Typography>
        ) : (
          <Typography variant="h4" component="p">
            No unresolved tasks, great job!
          </Typography>
        )}
        <Box>
          <Fab color="primary" aria-label="add" onClick={hendleAddClick}>
            <Add />
          </Fab>
        </Box>
      </Box>
      {tasks.length === 0 ? (
        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" color="textSecondary">
            No tasks available. Add some tasks to get started!
          </Typography>
        </Box>
      ) : (
        <List
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {Array.isArray(tasks) &&
            tasks.map((item: ITask) => (
              <ListItem key={item._id.toString()} style={{ padding: 0 }}>
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={Boolean(item.completed)}
                      onChange={() =>
                        handleCheckboxChange(
                          item._id.toString(),
                          item.completed
                        )
                      }
                    />
                    <Typography variant="h6" component="p">
                      {item.title} - {item.content}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Edit onClick={() => handleEdit(item._id.toString())} />
                    <Delete onClick={() => handleDelete(item._id.toString())} />
                  </Box>
                </Paper>
              </ListItem>
            ))}
        </List>
      )}
      {editingTaskId && (
        <EditTaskForm
          taskId={editingTaskId}
          refreshTasks={refetch}
          onClose={() => setEditingTaskId(null)}
        />
      )}
    </>
  );
};

export default TasksList;
