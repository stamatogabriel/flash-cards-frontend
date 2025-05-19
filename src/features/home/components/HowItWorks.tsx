'use client';

import { Grid, Paper, Typography, useTheme, alpha, Container } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StyleIcon from "@mui/icons-material/Style";

export function HowItWorks() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ py: 8 }}>
        <Grid item xs={12}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600,
              mb: 6,
              textAlign: 'center'
            }}
          >
            Como Funciona
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 4, 
                  minHeight: "200px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(8px)',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }
                }} 
                elevation={0}
              >
                <BorderColorIcon 
                  sx={{ 
                    mb: 3, 
                    fontSize: 40,
                    color: theme.palette.primary.main
                  }} 
                />
                <Typography 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  Descreva seu tema em poucas palavras.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 4, 
                  minHeight: "200px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(8px)',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }
                }} 
                elevation={0}
              >
                <PsychologyIcon 
                  sx={{ 
                    mb: 3, 
                    fontSize: 40,
                    color: theme.palette.primary.main
                  }} 
                />
                <Typography 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  Nossa IA analisa seu tema e cria flashcards personalizados
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 4, 
                  minHeight: "200px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(8px)',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }
                }} 
                elevation={0}
              >
                <StyleIcon 
                  sx={{ 
                    mb: 3, 
                    fontSize: 40,
                    color: theme.palette.primary.main
                  }} 
                />
                <Typography 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 500
                  }}
                >
                  Estude com os flashcards e acelere seu aprendizado
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
