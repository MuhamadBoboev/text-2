import { ICatalog } from '@models/ICatalog'
import { ICategory } from '@models/ICategory'
import { IBrand } from '@models/IBrand'

export interface IPromoCode {
  id: number
  code: string
  type: 'percent' | 'fixed'
  value: number
  once_use: 1 | 0
  main_categories: ICatalog[]
  categories: ICategory[]
  brands: IBrand[]
  expires_at: string
  created_at: string
  updated_at: string
}
