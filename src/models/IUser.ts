import { IOrder } from '@models/IOrder'

export interface IUser {
  id: number
  name: string
  phone: string
  email: string
  address: string
  gender_id: number | null
  orders: IOrder[]
}
