/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateUserMutation } from "../user/userSlice";
import { RegisterStep } from "./components/RegisterStep";
import { Box, Grid2 as Grid } from "@mui/material";
import { CheckoutResume } from "./components/Resume";
import { useAppSelector } from "@/hooks/useStore";
import { MPBriksComponent } from "./components/MPBriksComponent";
import { useGetPlanByIdQuery } from "../plans/plansSlice";
import { useEffect } from "react";

interface Props {
  planId: string;
}

export function CheckoutComponent({ planId }: Props) {
  const [createUser, userStatus] = useCreateUserMutation();
  const { user } = useAppSelector((state) => state.user);
  const { isFetching, data: plan, isError } = useGetPlanByIdQuery(planId, {
    skip: !planId,
  });

  console.log(plan)

  const handleSubmit: SubmitHandler<FieldValues> = (data: any) => {
    createUser(data);
  };

  useEffect(() => {
    if (isError) {
      console.error("Erro ao buscar o plano");
    }
  }
  , [isError]);

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
            <RegisterStep
              isDisabled={userStatus.isLoading}
              isLoading={userStatus.isLoading}
              onSubmit={handleSubmit}
            />
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
