"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Typography } from "@mui/material";
import { FormAuth } from "./components/FormAuth";
import { login } from "@/lib/actions/auth";
import { useSearchParams } from "next/navigation";
// import { useLoginMutation } from "./authSlice";

export function SignInComponent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  // const [signinMutation, status] = useLoginMutation();

  const handleSubmit = async (data: any) => {
    // Se veio do checkout, mantém a referência do produto
    if (callbackUrl?.includes('/checkout')) {
      const url = new URL(callbackUrl);
      const planId = url.searchParams.get('plan');
      if (planId) {
        await login({ ...data, callbackUrl: `/checkout?plan=${planId}` });
        return;
      }
    }
    
    // Caso contrário, usa o callbackUrl padrão
    await login({ ...data, callbackUrl });
  };

  return (
    <Box p={2}>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Sign In</Typography>
          </Box>
        </Box>
        <FormAuth isLoading={false} onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
}
