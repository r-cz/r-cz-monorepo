"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Use the updated import path for ThemeProviderProps
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // This ensures the theme provider only runs on the client side
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so this ensures the component renders
  // only after the initial client-side hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure but without any theme functionality
    // This prevents hydration errors and ensures a smooth initial render
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
