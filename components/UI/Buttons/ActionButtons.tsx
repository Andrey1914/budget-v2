"use client";

import React from "react";
import { Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { StyledActionButtons } from "./styles";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
      <StyledActionButtons onClick={onEdit} aria-label="edit">
        <Edit sx={{ fontSize: "18px" }} />
      </StyledActionButtons>
      <StyledActionButtons onClick={onDelete} aria-label="delete">
        <Delete sx={{ fontSize: "18px" }} />
      </StyledActionButtons>
    </Box>
  );
};
//       <Edit sx={{ cursor: "pointer" }} onClick={onEdit} />
//       <Delete sx={{ cursor: "pointer" }} onClick={onDelete} />
//     </Box>
//   );
// };
