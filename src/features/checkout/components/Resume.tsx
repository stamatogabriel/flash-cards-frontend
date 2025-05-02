import { IPlan } from "@/features/plans/types/Plan";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { Skeleton } from "@mui/material";

interface Props {
  plan?: IPlan;
  isFetching?: boolean;
}

export function CheckoutResume({ plan = {} as IPlan, isFetching = false }: Props) {
  if (!plan) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5">Resumo do Pedido</Typography>
        </Grid>

        {isFetching ? (
          <>
            <Grid size={{ xs: 6 }}>
              <Skeleton variant="text" height={32} width="80%" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Skeleton variant="text" height={32} width="60%" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Skeleton variant="text" height={80} width="100%" />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h6">{plan.name}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h6">
                {typeof plan.signature_value === "string" &&
                plan.signature_value.toLowerCase() === "free"
                  ? "Free"
                  : `R$ ${(isNaN(Number(plan.signature_value))
                      ? 0
                      : Number(plan.signature_value)
                    )
                      .toFixed(2)
                      .replace(".", ",")}`}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body1">{plan.description}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
