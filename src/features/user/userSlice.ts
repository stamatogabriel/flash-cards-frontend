import { IUser } from './types/User'
import { apiSlice } from '../api/apiSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const endpointUrl = '/users'

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

function deleteUserMutation(user: IUser) {
  return {
    url: `${endpointUrl}/${user._id}`,
    method: 'DELETE',
  }
}

function createUserMutation(user: IUser) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: user,
  }
}

function updateUserMutation(user: IUser) {
  return {
    url: `${endpointUrl}/${user._id}`,
    method: 'PUT',
    body: user,
  }
}

function getUser({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    deleteUser: mutation<void, IUser>({
      query: deleteUserMutation,
      invalidatesTags: ['users'],
    }),
    createUser: mutation<IUser, IUser>({
      query: createUserMutation,
      invalidatesTags: ['users'],
    }),
    updateUser: mutation<IUser, IUser>({
      query: updateUserMutation,
      invalidatesTags: ['users'],
    }),
    getUser: query<IUser, { id: string }>({
      query: getUser,
      providesTags: ['users'],
    }),
  })
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.createUser.matchFulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      });
    builder.addMatcher(
      userApiSlice.endpoints.updateUser.matchFulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      });
    builder.addMatcher(
      userApiSlice.endpoints.getUser.matchFulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      });
  },
});

export const {
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApiSlice;

export const { setLoading, setError } = userSlice.actions;

export default userSlice.reducer;

