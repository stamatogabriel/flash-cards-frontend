"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Typography } from "@mui/material";
import { FormAuth } from "./components/FormAuth";
import { login } from "@/lib/actions/auth";
// import { useLoginMutation } from "./authSlice";

export function SignInComponent() {
  // const [signinMutation, status] = useLoginMutation();

  const handleSubmit = async (data: any) => {
    // signinMutation(data);
   login(data);
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
