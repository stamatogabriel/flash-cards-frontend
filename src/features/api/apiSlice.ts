import { getAccessToken } from "@/lib/actions/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ['auth', 'users', 'flash-cards', 'topics', 'plans', 'signatures'],
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers
    }
  }),
});