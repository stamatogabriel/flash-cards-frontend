import { useMemo } from "react";
import { createFlashCardsValidation } from "../validations/createFlashCards.validation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2 as Grid, TextField } from "@mui/material";

interface Props {
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

export function CreateFlashCardForm({
  isDisabled,
  isLoading,
  onSubmit,
}: Props) {
  const validationSchema = useMemo(() => createFlashCardsValidation, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: useMemo(() => ({ topic: "", quantityCards: 0 }), []),
    resolver: zodResolver(validationSchema),
  });

  return (
    <Box p={2} mt={3} sx={{ maxWidth: 600, margin: "auto" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Tema"
              margin="normal"
              disabled={isLoading}
              variant="outlined"
              {...register("topic")}
              error={!!errors.topic}
              helperText={errors.topic?.message?.toString()}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Número de cards"
              disabled={isLoading}
              margin="normal"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              {...register("quantityCards")}
              error={!!errors.quantityCards}
              helperText={errors.quantityCards?.message?.toString()}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" disabled={isDisabled || isLoading} sx={{ margin: "0 0 0 auto"}}>
            {isLoading ? 'Carregando cards...' : 'Criar Flashcards'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
