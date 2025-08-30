import { apiSlice } from "../api/apiSlice";
import { setUser } from "../user/userSlice";

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Erro ao fazer login:', error);
        }
      },
      invalidatesTags: ['auth'],
    }),
  }),
})

export const { useLoginMutation } = authApiSlice