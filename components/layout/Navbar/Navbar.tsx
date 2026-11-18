"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import {
  Box,
  Container,
  Typography,
  IconButton,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu, Home } from "@mui/icons-material";

import { ThemeSwitcher, LanguageSwitcher, UserMenu } from "@/components/layout";
import { SwitcherProps } from "@/interfaces";
import AuthTabsModal from "@/components/Auth/AuthModal";

import { NavLinks, NavIconLink, NavAuthButton, MobileDrawer } from "./NavUI";
import { NavLinkItem } from "./NavUI/NavLinks/types";

export const Navbar: React.FC<SwitcherProps> = ({
  toggleTheme,
  isDarkMode,
}) => {
  const tLinks = useTranslations("common.links");
  const { data: session, status } = useSession();
  const router = useRouter();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/landing");
    }
  }, [status, router]);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const isVerifiedUser = session && session.user.isVerified;

  const mainLinks: NavLinkItem[] = [
    { href: "/landing", label: tLinks("home") },
    { href: "/dashboard", label: tLinks("dashboard") },
  ];

  const mobileExtraLinks: NavLinkItem[] = [
    { href: "/dashboard/history", label: tLinks("history") },
    { href: "/dashboard/analytics", label: tLinks("analytics") },
    { href: "/dashboard/reviews", label: tLinks("reviews") },
  ];

  return (
    <>
      <Container component="nav" maxWidth="md">
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>

            <MobileDrawer
              open={drawerOpen}
              onClose={handleDrawerToggle}
              session={session}
              links={mainLinks}
              mobileLinks={mobileExtraLinks}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onOpenAuthModal={handleOpenAuthModal}
            />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justify: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            {isVerifiedUser ? (
              <>
                <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <NavLinks items={mainLinks} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <LanguageSwitcher />
                  <Typography variant="body1" fontWeight={600}>
                    {session.user.name}
                  </Typography>
                  <UserMenu
                    userName={session.user.name ?? null}
                    userImage={session.user.image ?? null}
                  />
                  <ThemeSwitcher
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                  />
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  width: "100%",
                  justify: "space-between",
                }}
              >
                <List
                  sx={{ display: "flex", flexDirection: "row", gap: 2, p: 0 }}
                >
                  <NavIconLink
                    href="/landing"
                    label={tLinks("home")}
                    icon={<Home />}
                  />
                  <NavAuthButton onClick={handleOpenAuthModal} />
                </List>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ThemeSwitcher
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                  />
                  <LanguageSwitcher />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Container>

      <AuthTabsModal
        open={authModalOpen}
        onClose={handleCloseAuthModal}
        initialTab={0}
      />
    </>
  );
};
