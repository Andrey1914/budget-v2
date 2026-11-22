export interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => Promise<void> | void;
  loading?: boolean;
}

export interface IFormData {
  title: string;
  content: string;
}
