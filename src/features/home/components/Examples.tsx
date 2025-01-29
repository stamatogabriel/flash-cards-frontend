"use client";

import { FlashCards } from "@/features/flash-cards/components/FlashCards";
import { useGetFlashCardsQuery } from "@/features/flash-cards/flashCardsSlice";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export function ExamplesComponent() {
  const { isFetching, data, isError } = useGetFlashCardsQuery({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Erro ao buscar os cards", { variant: "error" });
    }
  }, [enqueueSnackbar, isError]);

  return (
    <Box mt={5} mb={5}>
      <Typography variant="h4" sx={{ mt: 5, textAlign: "center" }}>
        Exemplos de Flashcards
      </Typography>
      <FlashCards cards={data?.data ?? []} isFetching={isFetching} />
    </Box>
  );
}
