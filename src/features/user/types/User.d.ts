export interface IUser {
  _id: number
  username: string
  email: string
  phone: string
  type: 'admin' | 'teacher' | 'student'
  password: string
}

export interface IUserListResponse {
  data: IUser[]
  total: number
  limit: number
  page: number
}

export interface IUserListRequest {
  search: string
  page: number
  limit: number
}