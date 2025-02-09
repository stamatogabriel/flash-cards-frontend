/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateUserMutation } from "../user/userSlice";
import { RegisterStep } from "./components/RegisterStep";
import { Box, Grid2 as Grid } from "@mui/material";
import { CheckoutResume } from "./components/Resume";
import { useAppSelector } from "@/hooks/useStore";
import { MPBriksComponent } from "./components/MPBriksComponent";

export function CheckoutComponent() {
  const [createUser, userStatus] = useCreateUserMutation();
  const { user } = useAppSelector((state) => state.user);

  const handleSubmit: SubmitHandler<FieldValues> = (data: any) => {
    createUser(data);
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
          <CheckoutResume />
        </Grid>
      </Grid>
    </Box>
  );
}
