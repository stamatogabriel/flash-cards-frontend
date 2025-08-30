/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateUserMutation } from "../user/userSlice";
import { RegisterStep } from "./components/RegisterStep";
import { Box, Grid2 as Grid, Button, Paper, Typography, Divider } from "@mui/material";
import { CheckoutResume } from "./components/Resume";
import { useAppSelector } from "@/hooks/useStore";
import { MPBriksComponent } from "./components/MPBriksComponent";
import { useGetPlanByIdQuery } from "../plans/plansSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from "react-redux";
import { setStatus, setErrorMessage } from "./checkoutSlice";

interface Props {
  planId: string;
}

export function CheckoutComponent({ planId }: Props) {
  const [createUser, userStatus] = useCreateUserMutation();
  const { user } = useAppSelector((state) => state.user);
  const { isFetching, data: plan, isError } = useGetPlanByIdQuery(planId, {
    skip: !planId,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const isFreePlan = plan?.signature_value === "0" || 
    plan?.signature_value?.toLowerCase() === "grátis" || 
    plan?.signature_value?.toLowerCase() === "free";

  useEffect(() => {
    if (user && isFreePlan) {
      handleFreePlanSignup();
    }
  }, [user, isFreePlan]);

  const handleSubmit: SubmitHandler<FieldValues> = (data: any) => {
    createUser(data);
  };

  const handleFreePlanSignup = async () => {
    if (!user || !plan) return;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/signatures`;
    const signatureRequest = {
      plan_id: plan._id,
      signature_value: "0",
      status: "approved",
      user_id: user._id,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(signatureRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao processar assinatura');
      }

      router.push("/dashboard/flashcards");
    } catch (error: any) {
      console.error(error);
      const errorMessages: { [key: string]: string } = {
        'You already have an active subscription for this plan': 'Você já possui uma assinatura ativa para este plano',
        'Plan not found': 'Plano não encontrado',
        'Error creating signature': 'Erro ao criar assinatura'
      };

      const errorMessage = errorMessages[error.message] || 'Ocorreu um erro ao processar sua assinatura. Por favor, tente novamente.';
      
      dispatch(setStatus("error"));
      dispatch(setErrorMessage(errorMessage));
      router.push("/checkout/error");
    }
  };

  const handleLoginClick = () => {
    router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
  };

  return (
    <Box sx={{ pt: 20, minHeight: "calc(100vh - 210px)" }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid size={{ sm: 12, md: 6 }}>
          {!user ? (
            <Box sx={{ p: 3 }}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom align="center" color="primary">
                  Crie sua Conta
                </Typography>
                <RegisterStep
                  isDisabled={userStatus.isLoading}
                  isLoading={userStatus.isLoading}
                  onSubmit={handleSubmit}
                />
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    ou
                  </Typography>
                </Divider>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleLoginClick}
                  disabled={userStatus.isLoading}
                >
                  Já tenho uma conta
                </Button>
              </Paper>
            </Box>
          ) : isFreePlan ? (
            <Box sx={{ p: 3 }}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom align="center" color="primary">
                  Ative seu Plano Grátis Agora!
                </Typography>
                
                <Typography variant="body1" paragraph align="center" sx={{ mb: 3 }}>
                  Você está prestes a começar sua jornada de aprendizado com flashcards.
                  O plano grátis inclui:
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    Acesso a todos os recursos básicos
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    Crie seus próprios flashcards
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    Até 5 requisições por mês
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    Sem custos ou compromissos
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleFreePlanSignup}
                  disabled={isFetching}
                  sx={{ 
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  {isFetching ? "Processando..." : "Ativar Plano Grátis Agora"}
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                  Cancele a qualquer momento
                </Typography>
              </Paper>
            </Box>
          ) : (
            <MPBriksComponent />
          )}
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <CheckoutResume plan={plan} isFetching={isFetching} />
        </Grid>
      </Grid>
    </Box>
  );
}
