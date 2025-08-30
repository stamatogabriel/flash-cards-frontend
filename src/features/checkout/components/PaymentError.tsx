'use client'

import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/hooks/useStore";

export function PaymentError() {
  const { errorMessage } = useAppSelector((state) => state.checkout);

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
          Ocorreu um erro ao processar o pagamento
        </Typography>
        <Typography variant="body1" mb={5} color="error">
          {errorMessage || "Caso queira, utilize outro método de pagamento ou tente novamente."}
        </Typography>
        <Button variant="contained" color="primary" href="/checkout">
          Tentar novamente
        </Button>
      </Paper>
    </Box>
  );
}