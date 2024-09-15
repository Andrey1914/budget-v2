// app/ClientProviders.tsx (клиентский компонент)
"use client"; // Это клиентский компонент

import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/styles/theme";
import createEmotionCache from "@/lib/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
