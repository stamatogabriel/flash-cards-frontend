export interface IUser {
  id: number
  fullname: string
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