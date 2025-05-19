"use client";

import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, toggleTheme] = useAppTheme();
  const pathname = usePathname();

  const isPublicRoute = !pathname?.startsWith("/dashboard");

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {isPublicRoute && (
          <Header
            theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
            toggle={toggleTheme}
          />
        )}
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
          {children}
        </Container>
        {isPublicRoute && <Footer />}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
