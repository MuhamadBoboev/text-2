import { IProduct } from '@models/product/IProduct'

export interface INewProducts {
  data: {
    products: IProduct[]
  }
}
