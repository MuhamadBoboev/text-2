import { IProduct } from '@models/product/IProduct'

export interface IPromotion {
  id: number
  slug: string
  name: string
  image: string
  description: string
  deadline: string
  brand_id: number
  products_count: number
  products: IProduct[]
}
