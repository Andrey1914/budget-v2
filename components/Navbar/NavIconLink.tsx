"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { ListItem, ListItemText, Box, Icon } from "@mui/material";

interface NavIconLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const NavIconLink: React.FC<NavIconLinkProps> = ({
  href,
  label,
  icon,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ListItem disablePadding sx={{ py: 1 }}>
      <Link
        href={href}
        style={{
          textDecoration: "none",
          color: isActive ? "#0066ff" : "inherit",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: isActive ? "2px solid #0066ff" : "none",
          }}
        >
          <Icon>{icon}</Icon>
          <ListItemText primary={label} />
        </Box>
      </Link>
    </ListItem>
  );
};
