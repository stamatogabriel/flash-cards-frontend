"use client";

import { FlashCards } from "@/features/flash-cards/components/FlashCards";
import { useGetFlashCardsToSiteQuery } from "@/features/flash-cards/flashCardsSlice";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export function ExamplesComponent() {
  const { isFetching, data, isError } = useGetFlashCardsToSiteQuery();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Erro ao buscar os cards", { variant: "error" });
    }
  }, [enqueueSnackbar, isError]);

  console.log("data", data);

  return (
    <Box mt={5} mb={5}>
      <Typography variant="h4" sx={{ mt: 5, textAlign: "center" }}>
        Exemplos de Flashcards
      </Typography>
      <FlashCards cards={data ?? []} isFetching={isFetching} />
    </Box>
  );
}
