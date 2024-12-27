import { Box } from "@mui/material";
import { FlashcardArray } from "react-quizlet-flashcard";
import { IFlashCard } from "../types/FlashCard";

interface Props {
  cards: IFlashCard[];
}

export function FlashCards({ cards }: Props) {
  return (
    <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <FlashcardArray
        cards={
          cards?.map((card, idx) => ({
            id: idx + 1,
            frontHTML: <h5>{card.question}</h5>,
            backHTML: <p>{card.answer}</p>,
            frontCardStyle: {
              backgroundColor: "lightblue",
              color: "black",
              display: "flex",
              padding: "2rem",
            },
            frontContentStyle: {
              fontSize: "2.5rem",
              textAlign: "center",
            },
            backCardStyle: {
              backgroundColor: "lightgreen",
              color: "black",
              display: "flex",
              padding: "2rem",
            },
            backContentStyle: {
              fontSize: "1.5rem",
              textAlign: "center",
            },
          })) ?? []
        }
      />
    </Box>
  );
}
