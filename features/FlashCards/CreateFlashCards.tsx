"use client";

import { CreateFlashCardForm } from "./components/CreateFlashCardForm";
import { FlashCards } from "./components/FlashCards";
import { useCreateFlashCardMutation } from "./flashCardsSlice";

export function CreateFlashCards() {
  const [createFlashCard, status] = useCreateFlashCardMutation();

  const handleSubmit = (values: any) => {
    createFlashCard(values);
  };

  return (
    <>
      <CreateFlashCardForm
        isDisabled={status.isLoading}
        isLoading={status.isLoading}
        onSubmit={handleSubmit}
      />
      {!status.isLoading && status?.data ? (
        <FlashCards cards={(status?.data ?? []) as any} />
      ) : (
        <div />
      )}
    </>
  );
}
