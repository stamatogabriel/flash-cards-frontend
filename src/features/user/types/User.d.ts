export interface IUser {
  _id: number
  username: string
  email: string
  plan: {
    name: string
    type: 'free' | 'premium'
    features: string[]
  }
  createdAt: Date
  updatedAt: Date
  // phone: string
  // type: 'admin' | 'teacher' | 'student'
  // password: string
}