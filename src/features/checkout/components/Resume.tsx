import { Box, Grid2 as Grid, Typography } from "@mui/material";

export function CheckoutResume() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5">Resumo do Pedido</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant="h6">Flashy Básico</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography variant="h6">R$ 99,00</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            facilis debitis, eveniet beatae quis temporibus aut porro impedit
            deserunt, possimus tempora! Ratione sint suscipit quae provident
            laudantium porro, omnis obcaecati?
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
