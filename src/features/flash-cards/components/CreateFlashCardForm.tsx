/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { createFlashCardsValidation } from "../validations/createFlashCards.validation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2 as Grid, TextField, Paper, Typography, useTheme } from "@mui/material";

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
  const theme = useTheme();
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
    <Paper 
      elevation={2} 
      sx={{ 
        p: { xs: 2, md: 3 }, 
        mt: 3, 
        maxWidth: 600, 
        margin: "0 auto",
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 3,
          color: theme.palette.text.primary,
          fontWeight: 500
        }}
      >
        Configure seu Novo Deck de Flashcards
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Número de cards a gerar"
              disabled={isLoading}
              margin="normal"
              variant="outlined"
              type="number"
              InputProps={{ 
                inputProps: { min: 1, max: 10 },
                sx: { 
                  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                    opacity: 1
                  }
                }
              }}
              {...register("quantityCards", { valueAsNumber: true })}
              error={!!errors.quantityCards}
              helperText={errors.quantityCards?.message?.toString() || "Quantos flashcards você deseja gerar sobre este tema? (1-10)"}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box 
          mt={4} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            '& button': {
              minWidth: '160px',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }
          }}
        >
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isDisabled || isLoading}
            size="large"
          >
            {isLoading ? 'Gerando Flashcards...' : 'Gerar Flashcards'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
