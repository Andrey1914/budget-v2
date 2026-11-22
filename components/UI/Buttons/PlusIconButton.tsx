// "use client";

import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { StyledPlusIconButton } from "./styles";
import { PlusIconButtonProps } from "./types";

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
