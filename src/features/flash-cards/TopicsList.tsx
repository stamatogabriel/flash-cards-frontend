/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Typography } from "@mui/material";
import { TopicsGrid } from "./components/TopicsGrid";
import { useGetTopicsQuery } from "./flashCardsSlice";

export default function TopicsList() {
  const { data: topics, isFetching, error } = useGetTopicsQuery();

  if (error) return <Typography>Error: {(error as any)?.error}</Typography>;

  return <TopicsGrid data={topics ?? []} isFetching={isFetching} />;
}