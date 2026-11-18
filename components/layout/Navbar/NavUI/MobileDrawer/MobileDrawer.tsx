"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { Drawer, Box, Typography, List, Button, useTheme } from "@mui/material";
import { Logout, Home } from "@mui/icons-material";
import {
  ThemeSwitcher,
  LanguageSwitcher,
  Logo,
  UserMenu,
} from "@/components/layout";
import { NavLinks } from "../NavLinks";
import { NavIconLink } from "../NavIconLink";
import { NavAuthButton } from "../NavAuthButton";
import { useTranslations } from "next-intl";
import { MobileDrawerProps } from "./types";

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  session,
  links,
  mobileLinks,
  isDarkMode,
  toggleTheme,
  onOpenAuthModal,
}) => {
  const t = useTranslations("common.buttons");
  const theme = useTheme();
  const isVerified = session?.user?.isVerified;

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 250,
          p: theme.spacing(3),
        }}
        role="presentation"
        onClick={onClose}
      >
        {session && isVerified ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Logo text="My-Finance-App-" />
              <Typography variant="h6" component="p">
                {session.user.name}
              </Typography>
              <UserMenu
                userName={session.user.name ?? null}
                userImage={session.user.image ?? null}
              />
            </Box>

            <List>
              <NavLinks items={links} isMobileList />
              <NavLinks items={mobileLinks} isMobileList />
            </List>

            <Box sx={{ my: 2 }}>
              <LanguageSwitcher />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                pt: 1,
              }}
            >
              <Button
                onClick={() => signOut({ callbackUrl: "/landing" })}
                color="inherit"
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Logout />
                  <Typography variant="button">{t("logout")}</Typography>
                </Box>
              </Button>

              <ThemeSwitcher
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
            </Box>
          </>
        ) : (
          <>
            <Logo text="My-Finance-App-" />
            <List sx={{ my: 2 }}>
              <NavIconLink href="/landing" label="Home" icon={<Home />} />
              <NavAuthButton onClick={onOpenAuthModal} />
            </List>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ThemeSwitcher
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
              <LanguageSwitcher />
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
