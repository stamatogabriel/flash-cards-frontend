import { apiSlice } from "../api/apiSlice";

const endpointUrl = '/auth'

function loginMutation({ email, password }: { email: string; password: string }) {
  return {
    url: `${endpointUrl}/login`,
    method: 'POST',
    body: { email, password },
  }
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ mutation }) => ({
    login: mutation({
      query: loginMutation,
      invalidatesTags: ['auth'],
    }),
  }),
})

export const { useLoginMutation } = authApiSlice