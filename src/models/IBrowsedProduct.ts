import { IProduct } from '@models/product/IProduct'

export interface IBrowsedProduct extends IProduct {
  browsedDate: number
}
