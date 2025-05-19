/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { CreateFlashCardForm } from "./components/CreateFlashCardForm";
import { FlashCards } from "./components/FlashCards";
import { useCreateFlashCardMutation } from "./flashCardsSlice";
import { IFlashCard } from "./types/FlashCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export function CreateFlashCards() {
  const [createFlashCard, status] = useCreateFlashCardMutation();
  const theme = useTheme();

  const handleSubmit = (values: any) => {
    createFlashCard({ ...values, signatureId: '67df0e8aa40492ad85863e15' });
  };

  return (
    <Box sx={{ px: 1, maxWidth: '1400px', mx: 'auto' }}>
      <Box sx={{ mb: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AddCircleOutlineIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Criar Novos Flashcards
          </Typography>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 2,
            color: theme.palette.text.secondary,
            maxWidth: '600px'
          }}
        >
          Use o formulário abaixo para adicionar novas perguntas e respostas.
          Seus flashcards criados aparecerão listados em seguida.
        </Typography>
      </Box>

      <Box sx={{ px: 0.5 }}>
        <CreateFlashCardForm
          isDisabled={status.isLoading}
          isLoading={status.isLoading}
          onSubmit={handleSubmit}
        />

        <Box 
          sx={{ 
            mt: 4,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {status.isLoading && !status.data && (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <CircularProgress size={40} />
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Gerando seus flashcards...
              </Typography>
            </Box>
          )}
          {!status.isLoading && status.isSuccess && status.data && (Array.isArray(status.data) ? status.data : []).length > 0 ? (
            <FlashCards
              cards={
                (Array.isArray(status.data) ? status.data : []) as IFlashCard[]
              }
              isFetching={status.isLoading}
            />
          ) : (
            !status.isLoading && (
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  mt: 3,
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic'
                }}
              >
                Você ainda não criou nenhum flashcard ou eles estão carregando.
              </Typography>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
