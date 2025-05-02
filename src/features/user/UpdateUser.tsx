/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "./userSlice";
import { UserForm } from "./components/UserForm";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface Params {
  id: string;
}

export const UserEdit: React.FC<Params> = ({ id }) => {
  const navigate = useRouter();

  const { data: user, isFetching, isError, error } = useGetUserQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateUser, status] = useUpdateUserMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    await updateUser({ ...data, id });
  };

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Não foi possível carregar seus dados", { variant: "error" });
      console.error(error);
    }
    if (status.isSuccess) {
      enqueueSnackbar("Usuário atualizado com sucesso", { variant: "success" });
      setIsdisabled(false);
    }
    if (status.error) {
      enqueueSnackbar("Usuário não atualizado", { variant: "error" });
    }
  }, [enqueueSnackbar, error, isError, navigate, status.error, status.isSuccess]);

  return (
    <Box mt={12}>
      <Paper sx={{ p: 3 }}>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Editar usuário</Typography>
          </Box>
        </Box>
        <UserForm
          isLoading={isFetching}
          user={user}
          isdisabled={isFetching || isdisabled}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};
