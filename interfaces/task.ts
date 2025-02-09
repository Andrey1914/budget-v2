import { Schema, Document } from "mongoose";

export interface ITask extends Document {
  _id: string;
  user: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
  content: string;
  description: string;
  completed: boolean;
}

export interface TaskFormProps {
  onSubmit: (data: { title: string; content: string }) => void;
  loading?: boolean;
}

export interface EditTaskFormProps {
  taskId: string;
  initialTitle: string;
  initialContent: string;
  initialCompleted: boolean;
  onTaskUpdated: () => void;
}
