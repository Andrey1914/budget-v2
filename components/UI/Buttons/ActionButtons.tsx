"use client";

import React from "react";
import { Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Edit sx={{ cursor: "pointer" }} onClick={onEdit} />
      <Delete sx={{ cursor: "pointer" }} onClick={onDelete} />
    </Box>
  );
};
