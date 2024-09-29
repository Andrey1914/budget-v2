"use client";

import { useEffect } from "react";
import { signOut, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/styles/theme";
import createEmotionCache from "@/lib/createEmotionCache";
import useIdleLogout from "@/hooks/useIdleLogout";

const clientSideEmotionCache = createEmotionCache();

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

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          {children}
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
