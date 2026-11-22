import { IconButtonProps } from "@mui/material";

export interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export interface PlusIconButtonProps extends IconButtonProps {
  variantType?: "income" | "expense" | "task";
}
