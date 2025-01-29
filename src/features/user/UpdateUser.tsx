/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "./userSlice";
import { UserForm } from "./components/UserForm";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface Params {
  id: string;
}

export const UserEdit: React.FC<Params> = ({ id }) => {
  const navigate = useRouter();
  
  const { data: user, isFetching } = useGetUserQuery({ id });
  const [isdisabled, setIsdisabled] = useState(false);
  const [updateUser, status] = useUpdateUserMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    await updateUser({...data, id});
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Usuário atualizado com sucesso", { variant: "success" });
      setIsdisabled(false);
      // navigate.push("/users");
    }
    if (status.error) {
      enqueueSnackbar("Usuário não atualizado", { variant: "error" });
    }
  }, [enqueueSnackbar, navigate, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
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