/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppSelector } from "@/hooks/useStore";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PixSuccess() {
  const { pix } = useAppSelector((state) => state.checkout);
  const router = useRouter();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pix?.qrCode ?? "");
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard/flashcards");
  };

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
          Aqui está o seu QR Code
        </Typography>
        <Typography variant="body1" mb={5}>
          Obrigado por comprar conosco! Utilize o aplicativo do seu banco para
          realizar o pagamento.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={`data:image/png;base64,${pix?.qrCodeBase64 ?? ""}`}
            alt="QR Code"
            style={{ height: 200, marginBottom: 20, borderRadius: 5 }}
          />
          <Button onClick={copyToClipboard} sx={{ mb: 2 }}>Copiar QR Code</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoToDashboard}
          >
            Ir para minha conta
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
