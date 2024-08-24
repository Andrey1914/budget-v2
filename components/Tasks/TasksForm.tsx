"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { TaskFormProps } from "@/interfaces";

const TaskForm: React.FC<TaskFormProps> = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setError("You must be logged in to add a task.");
      return;
    }

    const res = await fetch("/api/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to add task");
    } else {
      setTitle("");
      setContent("");
      setError("");
      // Здесь можно добавить логику успешного добавления задачи, например, редирект или обновление состояния
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;

// "use client";

// import React, { useState } from "react";

// const TaskForm: React.FC<{
//   onSubmit: (data: any) => void;
//   initialData?: any;
// }> = ({ onSubmit, initialData }) => {
//   const [title, setTitle] = useState<string>(initialData?.title || "");
//   const [content, setContent] = useState<string>(initialData?.content || "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ title, content });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//       />
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Content"
//       />
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default TaskForm;
