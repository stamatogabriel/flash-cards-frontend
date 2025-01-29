'use client';

import { useAppTheme } from "@/hooks/useAppTheme";
import { Box, Button, Container, Typography } from "@mui/material";

export function HeroBanner() {
  const [currentTheme] = useAppTheme();

  return (
    <Box
      sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundImage: currentTheme.palette.mode === "dark" ? "linear-gradient(225deg, #4B00B2, #222)" : "linear-gradient(225deg, #4B00B2, #ccc)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      textAlign: "center",
      '@media (max-width: 600px)': {
        p: 1,
        pt: 15,
        width: "100%",
        backgroundSize: "contain",
      },
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom fontSize={{ xs: "3rem" }} sx={{ fontWeight: 700 }}>
          Transforme Seus Estudos com Flashcards Criados por IA!
        </Typography>
        <Typography variant="h5" component="p" gutterBottom fontSize={{ xs: "1.2rem", md: "1.5rem" }}>
          Diga adeus à procrastinação! Crie flashcards personalizados em
          segundos para acelerar seu aprendizado.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
          Comece Já!
        </Button>
      </Container>
    </Box>
  );
}
