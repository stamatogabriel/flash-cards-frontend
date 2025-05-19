import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CardSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timeout = setTimeout(() => {
      router.push("/dashboard/flashcards");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

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
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push("/dashboard/flashcards")}
        >
          Ir para minha conta
        </Button>
      </Paper>
    </Box>
  );
}
