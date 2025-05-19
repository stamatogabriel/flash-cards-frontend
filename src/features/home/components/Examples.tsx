"use client";

import { FlashCards } from "@/features/flash-cards/components/FlashCards";
import { useGetFlashCardsToSiteQuery } from "@/features/flash-cards/flashCardsSlice";
import { Box, Typography, useTheme, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export function ExamplesComponent() {
  const { isFetching, data, isError } = useGetFlashCardsToSiteQuery();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Erro ao buscar os cards", { variant: "error" });
    }
  }, [enqueueSnackbar, isError]);

  console.log("data", data);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, justifyContent: 'center' }}>
          <AutoStoriesIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600
            }}
          >
            Exemplos de Flashcards
          </Typography>
        </Box>
        <FlashCards cards={data ?? []} isFetching={isFetching} isLoggedArea={false} />
      </Box>
    </Container>
  );
}
