import { Box, Button, Paper, Typography } from "@mui/material";

export function CardSuccess() {
  return (
    <Box
      sx={{
        p: 3,
        pt: 15,
        textAlign: "center",
        minHeight: "calc(100vh - 210px)",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 450 }}>
        <Typography variant="h4" mb={2}>
          Pagamento realizado com sucesso
        </Typography>
        <Typography variant="body1" mb={5}>
          Acesse a sua conta e comece a criar seus cards.
        </Typography>
        <Button variant="contained" color="primary" href="/cards">
          Ir para minha conta
        </Button>
      </Paper>
    </Box>
  );
}
