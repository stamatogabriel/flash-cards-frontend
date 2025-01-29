'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Typography } from "@mui/material";
import { FormAuth } from "./components/FormAuth";
import { useLoginMutation } from "./authSlice";
import { signIn } from "next-auth/react";

export function SignInComponent() {
  const [signinMutation, status] = useLoginMutation();

  const handleSubmit = async (data: any) => {
    signinMutation(data);
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard', // URL de redirecionamento após o login bem-sucedido
    });
    console.log(status?.data);
  };

  return (
    <Box p={2}>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Sign In</Typography>
          </Box>
        </Box>
        <FormAuth isLoading={status.isLoading} onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
}
