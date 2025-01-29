import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema } from "../validations/Auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Grid2 as Grid } from "@mui/material";

type Props = {
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
};

export function FormAuth({ isLoading = false, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <Box p={2}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
