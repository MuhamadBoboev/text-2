import { IProduct } from '@models/product/IProduct'

export interface ICategory {
  id: number
  name: string
  slug: string
  icon: null | string
  parent_id: number
  description: null | string
  for_whos_id: number
  subcategories?: ISubCategory[]
  main_category_id: number | null
  products: IProduct[]
}

export interface ISubCategory {
  id: number
  name: string
  slug: string
  parent_id: number
  icon: null | string
  description: null | string
}
