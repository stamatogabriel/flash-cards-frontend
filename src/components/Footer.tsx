import { Box, Grid2 as Grid } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", p: 6 }}>
      <Box textAlign="center">
        <p>© 2021 Flashcards</p>
      </Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box textAlign="center">
            <p>
              Desenvolvido por <a href="#">Seu Nome</a>
            </p>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box textAlign="center">
            <p>
              Template por <a href="https://mui.com/">Material-UI</a>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
