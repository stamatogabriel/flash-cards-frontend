'use client';

import { useAppTheme } from "@/hooks/useAppTheme";
import { Box, Button, Container, Typography, useTheme, alpha } from "@mui/material";
import { useRouter } from "next/navigation";

export function HeroBanner() {
  const [currentTheme] = useAppTheme();
  const muiTheme = useTheme();
  const router = useRouter();

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
        background: currentTheme.palette.mode === "dark" 
          ? `linear-gradient(225deg, ${alpha(muiTheme.palette.primary.dark, 0.95)}, ${alpha(muiTheme.palette.background.paper, 0.95)})`
          : `linear-gradient(225deg, ${alpha(muiTheme.palette.primary.main, 0.95)}, ${alpha(muiTheme.palette.background.paper, 0.95)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: muiTheme.palette.text.primary,
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
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          fontSize={{ xs: "3rem" }} 
          sx={{ 
            fontWeight: 700,
            color: muiTheme.palette.text.primary,
            mb: 3
          }}
        >
          Transforme Seus Estudos com Flashcards Criados por IA!
        </Typography>
        <Typography 
          variant="h5" 
          component="p" 
          gutterBottom 
          fontSize={{ xs: "1.2rem", md: "1.5rem" }}
          sx={{
            color: muiTheme.palette.text.secondary,
            mb: 4
          }}
        >
          Diga adeus à procrastinação! Crie flashcards personalizados em
          segundos para acelerar seu aprendizado.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => router.push('/register')}
          sx={{ 
            px: 4,
            py: 1.5,
            backgroundColor: muiTheme.palette.primary.main,
            '&:hover': {
              backgroundColor: muiTheme.palette.primary.dark,
            }
          }}
        >
          Comece Já!
        </Button>
      </Container>
    </Box>
  );
}
