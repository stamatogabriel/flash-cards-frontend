import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ['auth', 'users', 'flash-cards', 'topics'],
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
});