'use client';
import { useGetPlansQuery } from "@/features/plans/plansSlice";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import Link from 'next/link';

import { useEffect } from "react";

export function Pricing() {
  const { isFetching, data, isError } = useGetPlansQuery();
  
  useEffect(() => {
    if (isError) {
      console.error("Erro ao buscar os planos");
    }
  }
  , [isError]);

  return (
    <Box mt={5} mb={5}>
      <Typography variant="h4" component="h2" gutterBottom>
        Planos
      </Typography>
      
      {isFetching ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography>Carregando planos...</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {data && data.map((plan) => (
            <Grid key={plan._id} size={{ xs: 12, md: 4 }}>
              <Link href={`/checkout?plan=${plan._id}`} style={{ textDecoration: 'none' }}>
              <Paper sx={{ p: 3, minHeight: "170px" }} elevation={3}>
                <Typography variant="h5" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h3" gutterBottom>
                  R$ {plan.signature_value !== 'Free' ? Number(plan.signature_value).toFixed(2) : 'Grátis'}
                </Typography>
                <Typography>{plan.description}</Typography>
              </Paper>
              </Link>
            </Grid>
          ))}
          
          {(!data || data.length === 0) && (
            <Grid size={{ xs: 12 }}>
              <Typography>Nenhum plano disponível no momento.</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}
