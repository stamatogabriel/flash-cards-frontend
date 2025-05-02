"use client";

import { AppBar, Box, CssBaseline } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import { SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { LoggedHeader } from "./LoggedHeader";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { useAppTheme } from "@/hooks/useAppTheme";

const drawerWidth = 240;

export function LoggedLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <LoggedHeader
            handleDrawerToggle={handleDrawerToggle}
            toggle={toggleCurrentTheme}
            theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
          />
        </AppBar>

        <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle} />

        <SnackbarProvider
          autoHideDuration={2000}
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Container maxWidth="lg" sx={{ mx: "auto", pt: 8 }}>
            {children}
          </Container>
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  );
}
