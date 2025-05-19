/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Typography, useTheme, alpha } from "@mui/material";
import { TopicsGrid } from "./components/TopicsGrid";
import { useGetTopicsQuery, useGetFlashCardsByTopicQuery } from "./flashCardsSlice";
import { useState } from "react";
import { FlashCards } from "./components/FlashCards";
import SchoolIcon from '@mui/icons-material/School';
import { useRouter } from "next/navigation";
import { CreateFlashCardForm } from "./components/CreateFlashCardForm";

export default function TopicsList() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedTopicName, setSelectedTopicName] = useState<string | null>(null);
  const { data: topics, isFetching: isTopicsLoading } = useGetTopicsQuery();
  const { data: flashcards, isFetching: isFlashcardsLoading } = useGetFlashCardsByTopicQuery(selectedTopicId ?? '', {
    skip: !selectedTopicId,
  });

  const handleTopicClick = (topicId: string, topicName: string) => {
    setSelectedTopicId(topicId);
    setSelectedTopicName(topicName);
  };

  const handleBack = () => {
    setSelectedTopicId(null);
    setSelectedTopicName(null);
  };

  const handleCreateFlashCards = (values: any) => {
    // TODO: Implementar a criação de flashcards
    console.log(values);
  };

  return (
    <Box sx={{ px: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2"
          sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 600
          }}
        >
          {selectedTopicName ? `Flashcards de ${selectedTopicName}` : 'Meus Flashcards'}
        </Typography>
      </Box>

      {selectedTopicId ? (
        <FlashCards
          cards={flashcards ?? []}
          isFetching={isFlashcardsLoading}
          onBack={handleBack}
          topicName={selectedTopicName ?? undefined}
          isLoggedArea={true}
        />
      ) : (
        <>
          <CreateFlashCardForm 
            isDisabled={false}
            isLoading={false}
            onSubmit={handleCreateFlashCards}
          />
          <TopicsGrid 
            data={topics ?? []} 
            isFetching={isTopicsLoading} 
            onTopicClick={handleTopicClick}
          />
        </>
      )}
    </Box>
  );
}