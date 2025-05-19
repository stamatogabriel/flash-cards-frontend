'use client';
import { useGetPlansQuery } from "@/features/plans/plansSlice";
import { Box, Grid, Paper, Typography, useTheme, alpha, Container } from "@mui/material";
import Link from 'next/link';
import { useEffect } from "react";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export function Pricing() {
  const { isFetching, data, isError } = useGetPlansQuery();
  const theme = useTheme();
  
  useEffect(() => {
    if (isError) {
      console.error("Erro ao buscar os planos");
    }
  }, [isError]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
          <CardGiftcardIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600
            }}
          >
            Planos
          </Typography>
        </Box>
        
        {isFetching ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography>Carregando planos...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data && data.map((plan) => (
              <Grid key={plan._id} item xs={12} md={4}>
                <Link href={`/checkout?plan=${plan._id}`} style={{ textDecoration: 'none' }}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      minHeight: "200px",
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(8px)',
                      border: 1,
                      borderColor: 'divider',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }} 
                    elevation={0}
                  >
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{ 
                        color: theme.palette.text.primary,
                        fontWeight: 600
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography 
                      variant="h3" 
                      gutterBottom
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 700
                      }}
                    >
                      R$ {plan.signature_value !== 'Free' ? Number(plan.signature_value).toFixed(2) : 'Grátis'}
                    </Typography>
                    <Typography
                      sx={{ 
                        color: theme.palette.text.secondary,
                        mt: 2
                      }}
                    >
                      {plan.description}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
            
            {(!data || data.length === 0) && (
              <Grid item xs={12}>
                <Typography>Nenhum plano disponível no momento.</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
