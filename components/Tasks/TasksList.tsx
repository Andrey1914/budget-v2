"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const TasksList: React.FC = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const [tasksRes] = await Promise.all([fetch("/api/tasks/get")]);

          if (!tasksRes.ok) {
            throw new Error("Failed to fetch data");
          }
          const [tasksData] = await Promise.all([tasksRes.json()]);
          setTasks(tasksData);
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((item: any) => (
              <li key={item._id}>
                {item.title} - {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
