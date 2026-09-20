"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { ListItem, ListItemText } from "@mui/material";

export interface NavLinkItem {
  href: string;
  label: string;
}

interface NavLinksProps {
  items: NavLinkItem[];
  isMobileList?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  items,
  isMobileList = false,
}) => {
  const pathname = usePathname();

  const renderContent = (link: NavLinkItem) => {
    const isActive = pathname === link.href;

    const linkStyle = {
      textDecoration: "none",
      color: isActive ? "#0066ff" : "inherit",
      borderBottom: !isMobileList && isActive ? "2px solid #0066ff" : "none",
      paddingBottom: !isMobileList ? "4px" : "0",
    };

    if (isMobileList) {
      return (
        <ListItem key={link.href} disablePadding>
          <Link href={link.href} style={linkStyle}>
            <ListItemText
              sx={{
                borderBottom: isActive ? "2px solid #0066ff" : "none",
                py: 1,
              }}
              primary={link.label}
            />
          </Link>
        </ListItem>
      );
    }

    return (
      <Link key={link.href} href={link.href} style={linkStyle}>
        {link.label}
      </Link>
    );
  };

  return (
    <>
      {items.map((link) =>
        isMobileList ? (
          renderContent(link)
        ) : (
          <React.Fragment key={link.href}>{renderContent(link)}</React.Fragment>
        ),
      )}
    </>
  );
};
