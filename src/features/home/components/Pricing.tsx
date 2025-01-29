import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";

export function Pricing() {
  return (
    <Box mt={5} mb={5}>
      <Typography variant="h4" component="h2" gutterBottom>
        Planos
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
            <Typography variant="h5" gutterBottom>
              Básico
            </Typography>
            <Typography variant="h3" gutterBottom>
              R$ 0,00
            </Typography>
            <Typography>10 flashcards por mês</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
            <Typography variant="h5" gutterBottom>
              Pro
            </Typography>
            <Typography variant="h3" gutterBottom>
              R$ 9,99
            </Typography>
            <Typography>100 flashcards por mês</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
            <Typography variant="h5" gutterBottom>
              Premium
            </Typography>
            <Typography variant="h3" gutterBottom>
              R$ 19,99
            </Typography>
            <Typography>Ilimitado</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
