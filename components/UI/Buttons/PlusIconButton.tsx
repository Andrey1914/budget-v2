"use client";

import React from "react";
import { IconButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StyledPlusIconButton } from "./PlusIconButton.styled";

export interface PlusIconButtonProps extends IconButtonProps {
  variantType?: "income" | "expense" | "task";
}

export const PlusIconButton: React.FC<PlusIconButtonProps> = ({
  variantType = "income",
  ...props
}) => {
  return (
    <StyledPlusIconButton size="large" varianttype={variantType} {...props}>
      <AddIcon sx={{ fontSize: 48 }} />
    </StyledPlusIconButton>
  );
};
