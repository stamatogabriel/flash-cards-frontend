/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserForm } from "@/features/user/components/UserForm";
import { Box, Typography } from "@mui/material";

interface Props {
  isLoading: boolean;
  isDisabled: boolean;
  onSubmit: (data: any) => void;
}

export function RegisterStep({ isLoading, isDisabled, onSubmit }: Props) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Cadastre-se</Typography>
      <UserForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        isdisabled={isDisabled}
      />
    </Box>
  );
}
