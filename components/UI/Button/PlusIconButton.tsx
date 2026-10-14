"use client";

import React from "react";
import { IconButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StyledPlusIconButton } from "./PlusIconButton.styled";

export const PlusIconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <StyledPlusIconButton size="large" {...props}>
      <AddIcon sx={{ fontSize: 48 }} />
    </StyledPlusIconButton>
  );
};
