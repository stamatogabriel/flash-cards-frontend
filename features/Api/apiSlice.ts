import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getSession } from "next-auth/react";


export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    // const session = await getSession();
    
    // if (session) {
    //   headers.set("Authorization", `Bearer ${(session as any)?.accessToken}`);
    // }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ['flash-cards', 'topics'],
  baseQuery,
  endpoints: (builder) => ({}),
});