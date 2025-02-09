import { Box, Grid2 as Grid } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", p: 6 }}>
      <Box textAlign="center">
        <p>© {new Date().getFullYear()} Flashy</p>
      </Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box textAlign="center">
            <p>
              Desenvolvido por <a href="#">Pandora Soluções em Tecnologia</a>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
