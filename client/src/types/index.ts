export interface User {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  role: string
  _id: string
}

export interface Token {
  token: string
}
