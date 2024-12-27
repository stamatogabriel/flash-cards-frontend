"use client";

import { FlashCard } from "@/features/FlashCards/components/FlashCards";
import { useGetFlashCardsQuery } from "@/features/FlashCards/flashCardsSlice";
import TopicsList from "@/features/FlashCards/TopicsList";
import type { Metadata } from "next";

export default function IndexPage() {
  const { data: cards } = useGetFlashCardsQuery({});

  return (
    <>
      <TopicsList />
      <FlashCard
        cards={cards?.data ?? []}
      />
    </>
  );
}

// export const metadata: Metadata = {
//   title: "Redux Toolkit",
// };
