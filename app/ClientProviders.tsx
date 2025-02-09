"use client";

import React, { useEffect, useState } from "react";
import { signOut, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "@/app/styles/theme";
import createEmotionCache from "@/lib/createEmotionCache";
import useIdleLogout from "@/hooks/useIdleLogout";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

export default function ClientProviders({
  children,
  pageProps = {},
}: {
  children: React.ReactNode;
  pageProps?: { session?: Session };
}) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        timeoutId = setTimeout(() => {
          signOut();
        }, 20 * 60 * 1000);
      } else {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timeoutId);
    };
  }, []);
  useIdleLogout();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "600px",
                }}
              >
                {children}
              </Box>
              <Footer />
            </Box>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
