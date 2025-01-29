/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useCreateUserMutation } from "./userSlice";
import { UserForm } from "./components/UserForm";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

export const UserCreate = () => {
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [createUser, status] = useCreateUserMutation();
  const [isdisabled, setIsdisabled] = useState(false);

  const handleSubmit: SubmitHandler<FieldValues> = (data: any) => {
    createUser(data);
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Usuário criado com sucesso", { variant: "success" });
      setIsdisabled(true);
      navigate.push(`/dashboard/users`);
    }
    if (status.error) {
      enqueueSnackbar("Falha ao criar usuário", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Novo usuário</Typography>
          </Box>
        </Box>
        <UserForm
          isLoading={false}
          isdisabled={isdisabled}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};