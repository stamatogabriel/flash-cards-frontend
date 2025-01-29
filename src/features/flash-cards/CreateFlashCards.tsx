/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box } from "@mui/material";
import { CreateFlashCardForm } from "./components/CreateFlashCardForm";
import { FlashCards } from "./components/FlashCards";
import { useCreateFlashCardMutation } from "./flashCardsSlice";
import { IFlashCard } from "./types/FlashCard";

export function CreateFlashCards() {
  const [createFlashCard, status] = useCreateFlashCardMutation();

  const handleSubmit = (values: any) => {
    createFlashCard(values);
  };

  return (
    <Box sx={{ mt: 5}}>
      <CreateFlashCardForm
        isDisabled={status.isLoading}
        isLoading={status.isLoading}
        onSubmit={handleSubmit}
      />
      {!status.isLoading && status?.data ? (
        <FlashCards
          cards={
            (Array.isArray(status?.data) ? status.data : []) as IFlashCard[]
          }
          isFetching={status.isLoading}
        />
      ) : (
        <div />
      )}
    </Box>
  );
}
