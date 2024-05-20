import { ICategory } from '@models/ICategory'
import { IProduct } from '@models/product/IProduct'

export interface ICatalog {
  id: number
  name: string
  slug: string
  categories: ICatalogGroup[]
}

export interface ICatalogGroup {
  id: number
  name: string
  slug: string
  for_whos_id: number
  categories: ICatalogCategory[]
}

export interface ICatalogCategory {
  id: number
  name: string
  slug: string
  icon?: string
  subcategories: ICategory[]
  products: IProduct[]
  products_count: number
}

export interface ICatalogMenu {}

export interface IForWho {
  id: number
  name: string
  quickCategory: ICatalog[] // категории
}
