import { Grid2 as Grid, Paper, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StyleIcon from "@mui/icons-material/Style";

export function HowItWorks() {
  return (
    <Grid container mt={4} mb={2}>
      <Grid size={12}>
        <Typography variant="h4" component="h2" gutterBottom>
          Como Funciona
        </Typography>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
              <BorderColorIcon fontSize="large" sx={{ mb: 4, transform: 'scale(1.5)' }}  />
              <Typography>Descreva seu tema em poucas palavras.</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
              <PsychologyIcon fontSize="large" sx={{ mb: 4, transform: 'scale(1.5)' }} />
              <Typography>
                Nossa IA analisa seu tema e cria flashcards personalizados
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
              <StyleIcon fontSize="large" sx={{ mb: 4, transform: 'scale(1.5)' }} />
              <Typography>
                Estude com os flashcards e acelere seu aprendizado
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
