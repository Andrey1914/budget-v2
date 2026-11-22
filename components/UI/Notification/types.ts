export type NotificationProps = {
  open?: boolean;
  onClose?: () => void;
  message: string;
  severity: "success" | "error" | "warning" | "info";
};
