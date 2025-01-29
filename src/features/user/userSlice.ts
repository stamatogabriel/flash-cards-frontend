import { IUser, IUserListRequest, IUserListResponse } from './types/User'
import { apiSlice } from '../api/apiSlice'

const endpointUrl = '/users'

function parseQueryParams(params: IUserListRequest) {
  const queryParams = new URLSearchParams()

  if (params.page) {
    queryParams.append('page', params.page.toString())
  }

  if (params.limit) {
    queryParams.append('limit', params.limit.toString())
  }

  if (params.search) {
    queryParams.append('search', params.search)
  }

  return queryParams.toString()
}

function getUsers({ page = 1, limit = 10, search = '' }) {
  const queryParams = parseQueryParams({ page, limit, search })

  return `${endpointUrl}?${queryParams}`
}

function deleteUserMutation(user: IUser) {
  return {
    url: `${endpointUrl}/${user.id}`,
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
    url: `${endpointUrl}/${user.id}`,
    method: 'PUT',
    body: user,
  }
}

function getUser({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getListUsers: query<IUserListResponse, IUserListRequest>({
      query: getUsers,
      providesTags: ['users'],
    }),
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

export const {
  useGetListUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApiSlice;
