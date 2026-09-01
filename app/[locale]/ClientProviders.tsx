"use client";

import React, { useEffect, useState } from "react";
import { signOut, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";
import createEmotionCache from "@/lib/createEmotionCache";
import useIdleLogout from "@/hooks/useIdleLogout";
import { CustomThemeProvider, useColorMode } from "@/context/ThemeContext";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";

const clientSideEmotionCache = createEmotionCache();

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleTheme } = useColorMode();

  return (
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
  );
}

export default function ClientProviders({
  children,
  pageProps = {},
}: {
  children: React.ReactNode;
  pageProps?: { session?: Session };
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        timeoutId = setTimeout(
          () => {
            signOut();
          },
          20 * 60 * 1000,
        );
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

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <CustomThemeProvider>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <LayoutContent>{children}</LayoutContent>
          </QueryClientProvider>
        </SessionProvider>
      </CustomThemeProvider>
    </CacheProvider>
  );
}
