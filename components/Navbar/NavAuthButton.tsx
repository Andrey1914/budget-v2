"use client";

import React from "react";
import { ListItem, ListItemText, Box, Icon } from "@mui/material";
import { Login } from "@mui/icons-material";
import { useTranslations } from "next-intl";

interface NavAuthButtonProps {
  label?: string;
  onClick: () => void;
}

export const NavAuthButton: React.FC<NavAuthButtonProps> = ({
  label,
  onClick,
}) => {
  const t = useTranslations("common.buttons");

  return (
    <ListItem onClick={onClick} sx={{ cursor: "pointer" }} disablePadding>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "6px 16px",
          width: "100%",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <Icon>
          <Login />
        </Icon>
        <ListItemText primary={label || t("authButton")} />
      </Box>
    </ListItem>
  );
};
