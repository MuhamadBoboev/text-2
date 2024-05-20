export interface IStore {
  id: number
  title: string
  street: string
  phone: string
  link: string | null
  store_id: number
}

export interface IStoreCategory {
  id: number
  logo: string
  name: string
  details: IStore[]
}
