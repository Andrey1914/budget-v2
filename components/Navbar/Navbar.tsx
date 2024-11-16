"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

import {
  Box,
  Container,
  Fab,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  Logout,
  Login,
  AppRegistration,
  Home,
} from "@mui/icons-material";
import theme from "@/app/styles/theme";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/landing");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "loading") return;
  }, [session, status]);

  if (status === "loading")
    return (
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#1727b7"
        secondaryColor="#6fb5e7"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );

  const links = [
    { href: "/landing", icon: <Home /> },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/income", label: "Incomes" },
    { href: "/dashboard/expense", label: "Expenses" },
    { href: "/dashboard/tasks", label: "Tasks" },
    { href: "/dashboard/history", label: "History" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/reviews", label: "Reviews" },
  ];

  const renderLinks = () =>
    links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <ListItem>
          {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
          <ListItemText primary={link.label} />
        </ListItem>
      </Link>
    ));

  const renderAuthLinks = () => (
    <>
      <Link
        href="/landing"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link
        href="/auth/login"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <ListItem>
          <ListItemIcon>
            <Login />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </Link>
      <Link
        href="/auth/register"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <ListItem>
          <ListItemIcon>
            <AppRegistration />
          </ListItemIcon>
          <ListItemText primary="Registration" />
        </ListItem>
      </Link>
    </>
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Container
        component="nav"
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box
                sx={{
                  width: 250,
                  padding: "1rem",
                }}
                role="presentation"
                onClick={handleDrawerToggle}
              >
                {session && session.user.isVerified ? (
                  <>
                    <Typography
                      variant="h6"
                      component="p"
                      style={{ marginBottom: "1rem" }}
                    >
                      {session.user.name}
                    </Typography>
                    <List>{renderLinks()}</List>
                    <List>
                      <ListItem
                        onClick={() => signOut({ callbackUrl: "/landing" })}
                      >
                        <ListItemIcon>
                          <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <List>{renderAuthLinks()}</List>
                )}
              </Box>
            </Drawer>
          </>
        ) : (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {session && session.user.isVerified ? (
              <>
                <Typography
                  variant="h6"
                  component="p"
                  style={{ marginRight: "2rem" }}
                >
                  {session.user.name}
                </Typography>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Fab
                  color="primary"
                  onClick={() => signOut({ callbackUrl: "/landing" })}
                >
                  <Logout />
                </Fab>
              </>
            ) : (
              <>
                <Link href="/auth/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
                <Link href="/auth/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Navbar;
