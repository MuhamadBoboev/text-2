import { IProduct } from '@models/product/IProduct'

export async function getProducts(
  isClient?: boolean,
  query: string = '',
): Promise<IProduct[] | null> {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/products${query}`,
    )
    const products = await response.json()
    return products.data
  } catch (e) {
    return null
  }
}

export type hitProductsType = {
  // men?: IProduct[],
  // women?: IProduct[],
  // all?: IProduct[]
  [key: string]: IProduct[]
}
