'use client';

import {
  Box,
  Button,
  FormControl,
  // FormControlLabel,
  // FormGroup,
  Grid2 as Grid,
  Skeleton,
  // Switch,
  TextField,
} from "@mui/material";

import Link from "next/link";
import { IUser } from "../types/User";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../validations/User.validation";

type Props = {
  user?: IUser;
  isdisabled?: boolean;
  isLoading?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  // handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UserForm({
  user,
  isdisabled = false,
  isLoading = false,
  onSubmit,
}: // handleToggle,
Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return user || {};
    }, [user]),
    resolver: zodResolver(userValidation),
  });

  return !user && isLoading ? (
    <Box>
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ mt: 2, borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ mt: 2, borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ mt: 2, borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ mt: 2, borderRadius: 1 }}
      />
    </Box>
  ) : (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                label="Nome"
                {...register("username")}
                disabled={isdisabled}
                focused={!!user?.username}
                defaultValue={user?.username}
                helperText={
                  errors.username ? String(errors.username.message) : ""
                }
                error={!!errors.username}
              />
            </FormControl>
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                label="E-mail"
                {...register("email")}
                focused={!!user?.email}
                defaultValue={user?.email}
                disabled={isdisabled}
                helperText={errors.email ? String(errors.email.message) : ""}
                error={!!errors.email}
              />
            </FormControl>
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                label="Telefone"
                {...register("phone")}
                focused={!!user?.phone}
                defaultValue={user?.phone}
                disabled={isdisabled}
                helperText={errors.phone ? String(errors.phone.message) : ""}
                error={!!errors.phone}
              />
            </FormControl>
          </Grid>

          {/* <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                label="Tipo"
                {...register("type")}
                focused={!!user?.type}
                defaultValue={user?.type}
                disabled={isdisabled}
                helperText={errors.type ? String(errors.type.message) : ""}
                error={!!errors.type}
              />
            </FormControl>
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                label="Senha"
                {...register("password")}
                focused={!!user?.password}
                defaultValue={user?.password}
                disabled={isdisabled}
                helperText={errors.password ? String(errors.password.message) : ""}
                error={!!errors.password}
              />
            </FormControl>
          </Grid> */}

          {/* <Grid size={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={user.is_active || false}
                    inputProps={{ "aria-label": "controlled" }}
                    data-testid="is_active"
                    disabled={isdisabled}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid> */}
          <Grid size={12}>
            <Box display="flex" gap={2}>
              <Link href="/users" passHref>
                <Button variant="contained">Voltar</Button>
              </Link>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isdisabled || isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
