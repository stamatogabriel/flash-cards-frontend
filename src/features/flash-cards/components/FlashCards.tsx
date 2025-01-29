import { Box, Grid2 as Grid, Skeleton } from "@mui/material";
import { FlashcardArray } from "react-quizlet-flashcard";
import { IFlashCard } from "../types/FlashCard";

interface Props {
  cards: IFlashCard[];
  isFetching?: boolean;
}

export function FlashCards({ cards, isFetching }: Props) {
  return (
    <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      {!isFetching ? (
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
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" width={800} height={400} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" width={800} height={400} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" width={800} height={400} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" width={800} height={400} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
