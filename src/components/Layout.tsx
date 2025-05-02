"use client";

import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, toggleTheme] = useAppTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {!window.location.pathname.includes("dashboard") && (
          <Header
            theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
            toggle={toggleTheme}
          />
        )}
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
          {children}
        </Container>
        {!window.location.pathname.includes("dashboard") && (
        <Footer />
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
