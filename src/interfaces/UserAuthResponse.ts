import { IUser } from '@models/IUser'

export interface UserAuthResponse {
  token: string
  user: IUser
}
