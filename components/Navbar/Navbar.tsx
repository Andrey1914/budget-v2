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

import UserMenu from "@/components/UserMenu/UserMenu";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { SwitcherProps } from "@/interfaces";
import { LanguageSwitcher } from "@/components/LanguageSelector/LanguageSwitcher";
import AuthTabsModal from "@/components/Auth/AuthModal";

import { NavLinks, NavLinkItem } from "./NavLinks";
import { NavIconLink } from "./NavIconLink";
import { NavAuthButton } from "./NavAuthButton";
import { MobileDrawer } from "./MobileDrawer";

const Navbar: React.FC<SwitcherProps> = ({ toggleTheme, isDarkMode }) => {
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
              justifyContent: "space-between",
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
                  <Typography variant="h6" component="p">
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
                  justifyContent: "space-between",
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

export default Navbar;

// "use client";

// import { useEffect, useState } from "react";
// import { signOut, useSession } from "next-auth/react";
// import { useRouter, usePathname } from "@/i18n/navigation";
// import Link from "next/link";

// import {
//   Box,
//   Container,
//   Typography,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   Icon,
//   ListItemText,
//   useMediaQuery,
//   useTheme,
//   Button,
// } from "@mui/material";
// import {
//   Menu,
//   Logout,
//   Login,
//   AppRegistration,
//   Home,
// } from "@mui/icons-material";
// import UserMenu from "@/components/UserMenu/UserMenu";
// import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
// import { SwitcherProps } from "@/interfaces";
// import Logo from "@/components/Logo/Logo";
// import { LanguageSwitcher } from "@/components/LanguageSelector/LanguageSwitcher";

// import AuthTabsModal from "@/components/Auth/AuthModal";

// const Navbar: React.FC<SwitcherProps> = ({ toggleTheme, isDarkMode }) => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();

//   const [authModalOpen, setAuthModalOpen] = useState(false);

//   const handleOpenAuthModal = () => setAuthModalOpen(true);
//   const handleCloseAuthModal = () => setAuthModalOpen(false);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/landing");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     if (status === "loading") return;
//   }, [session, status]);

//   const links = [
//     { href: "/landing", label: "Home" },
//     { href: "/dashboard", label: "Dashboard" },
//   ];

//   const homeLink = [{ href: "/landing", label: "Home", icon: <Home /> }];

//   const authLinks = [
//     { label: "SignIn/SignUp", icon: <Login />, onClick: handleOpenAuthModal },
//   ];

//   const mobileLinks = [
//     { href: "/dashboard/history", label: "History" },
//     { href: "/dashboard/analytics", label: "Analytics" },
//     { href: "/dashboard/reviews", label: "Reviews" },
//   ];

//   const isActive = (href: string) => pathname === href;

//   const renderLinks = () =>
//     links.map((link) => (
//       <ListItem key={link.href}>
//         <Link
//           key={link.href}
//           href={link.href}
//           style={{
//             textDecoration: "none",
//             color: isActive(link.href) ? "#0066ff" : "inherit",
//           }}
//         >
//           <ListItemText
//             sx={{
//               borderBottom: isActive(link.href) ? "2px solid #0066ff" : "none",
//             }}
//             primary={link.label}
//           />
//         </Link>
//       </ListItem>
//     ));

//   const renderMobileLinks = () =>
//     mobileLinks.map((link) => (
//       <ListItem key={link.href}>
//         <Link
//           key={link.href}
//           href={link.href}
//           style={{
//             textDecoration: "none",
//             color: isActive(link.href) ? "#0066ff" : "inherit",
//           }}
//         >
//           <ListItemText
//             sx={{
//               borderBottom: isActive(link.href) ? "2px solid #0066ff" : "none",
//             }}
//             primary={link.label}
//           />
//         </Link>
//       </ListItem>
//     ));

//   const renderHomeLink = () =>
//     homeLink.map((link) => (
//       <ListItem key={link.href}>
//         <Link
//           key={link.href}
//           href={link.href}
//           style={{
//             textDecoration: "none",
//             color: isActive(link.href) ? "#0066ff" : "inherit",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               borderBottom: isActive(link.href) ? "2px solid #0066ff" : "none",
//             }}
//           >
//             <Icon>{link.icon}</Icon>
//             <ListItemText primary={link.label} />
//           </Box>
//         </Link>
//       </ListItem>
//     ));

//   const renderAuthLinks = () =>
//     authLinks.map((link, i) => (
//       <ListItem key={i} onClick={link.onClick} sx={{ cursor: "pointer" }}>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             padding: "6px 16px",
//             "&:hover": {
//               backgroundColor: "#f0f0f0",
//             },
//           }}
//         >
//           <Icon>{link.icon}</Icon>
//           <ListItemText primary={link.label} />
//         </Box>
//       </ListItem>
//     ));

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   return (
//     <>
//       <Container component="nav" maxWidth="md">
//         {isMobile ? (
//           <>
//             <IconButton
//               color="inherit"
//               aria-label="menu"
//               onClick={handleDrawerToggle}
//             >
//               <Menu />
//             </IconButton>
//             <Drawer
//               anchor="left"
//               open={drawerOpen}
//               onClose={handleDrawerToggle}
//             >
//               <Box
//                 sx={{
//                   width: 250,
//                   p: theme.spacing(3),
//                 }}
//                 role="presentation"
//                 onClick={handleDrawerToggle}
//               >
//                 {session && session.user.isVerified ? (
//                   <>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: isMobile ? "column" : "row",
//                         gap: 4,
//                         alignItems: "center",
//                       }}
//                     >
//                       <Logo text="My-Finance-App-" />

//                       <Typography variant="h6" component="p">
//                         {session.user.name}
//                       </Typography>

//                       <UserMenu
//                         userName={session?.user?.name ?? null}
//                         userImage={session?.user?.image ?? null}
//                       />
//                     </Box>
//                     <List>
//                       {renderLinks()} {renderMobileLinks()}
//                     </List>
//                     <LanguageSwitcher />

//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "start",
//                         gap: 4,
//                         p: 1,
//                       }}
//                     >
//                       <Button
//                         onClick={() => signOut({ callbackUrl: "/landing" })}
//                       >
//                         <Box sx={{ display: "flex", gap: 3 }}>
//                           <Logout />
//                           <Typography variant="button">Logout</Typography>
//                         </Box>
//                       </Button>

//                       <Box>
//                         <ThemeSwitcher
//                           isDarkMode={isDarkMode}
//                           toggleTheme={toggleTheme}
//                         />
//                       </Box>
//                     </Box>
//                   </>
//                 ) : (
//                   <>
//                     <Logo text="My-Finance-App-" />
//                     <List>
//                       {renderHomeLink()}
//                       {renderAuthLinks()}
//                     </List>
//                     <ThemeSwitcher
//                       isDarkMode={isDarkMode}
//                       toggleTheme={toggleTheme}
//                     />
//                     <LanguageSwitcher />
//                   </>
//                 )}
//               </Box>
//             </Drawer>
//           </>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             {session && session.user.isVerified ? (
//               <>
//                 <Box sx={{ display: "flex", gap: 4 }}>
//                   {links.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       style={{
//                         textDecoration: "none",
//                         color: isActive(link.href) ? "#0066ff" : "inherit",
//                         borderBottom: isActive(link.href)
//                           ? "2px solid #0066ff"
//                           : "none",
//                         paddingBottom: "4px",
//                       }}
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
//                   <Typography variant="h6" component="p">
//                     {session.user.name}
//                   </Typography>
//                   <ThemeSwitcher
//                     isDarkMode={isDarkMode}
//                     toggleTheme={toggleTheme}
//                   />
//                   <UserMenu
//                     userName={session?.user?.name ?? null}
//                     userImage={session?.user?.image ?? null}
//                   />
//                 </Box>
//               </>
//             ) : (
//               <Box sx={{ display: "flex", gap: 3 }}>
//                 <List
//                   sx={{
//                     display: "flex",
//                     flexDirection: isMobile ? "column" : "row",
//                     gap: 2,
//                   }}
//                 >
//                   {renderHomeLink()}
//                   {renderAuthLinks()}
//                 </List>

//                 <ThemeSwitcher
//                   isDarkMode={isDarkMode}
//                   toggleTheme={toggleTheme}
//                 />
//                 <LanguageSwitcher />
//               </Box>
//             )}
//           </Box>
//         )}
//       </Container>

//       <AuthTabsModal
//         open={authModalOpen}
//         onClose={handleCloseAuthModal}
//         initialTab={0}
//       />
//     </>
//   );
// };

// export default Navbar;
