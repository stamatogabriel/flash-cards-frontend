/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "./userSlice";
import { UserForm } from "./components/UserForm";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface Params {
  id: string;
}

export const UserEdit: React.FC<Params> = ({ id }) => {
  const navigate = useRouter();
  const theme = useTheme();

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
    <Box sx={{ px: 1, maxWidth: '1400px', mx: 'auto' }}>
      <Box sx={{ mb: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PersonOutlineIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Editar Perfil
          </Typography>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 2,
            color: theme.palette.text.secondary,
            maxWidth: '600px'
          }}
        >
          Atualize suas informações pessoais e preferências.
        </Typography>
      </Box>

      <Box sx={{ px: 0.5 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 3 }, 
            mt: 3, 
            maxWidth: 600, 
            margin: "0 auto",
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <UserForm
            isLoading={isFetching}
            user={user}
            isdisabled={isFetching || isdisabled}
            onSubmit={handleSubmit}
          />
        </Paper>
      </Box>
    </Box>
  );
};
