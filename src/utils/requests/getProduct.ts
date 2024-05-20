import { IProduct } from '@models/product/IProduct'

export async function getProduct(
  slug: string,
  isClient?: boolean,
): Promise<{ data: IProduct } | null> {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/product/${slug}`,
    )
    if (response.status >= 400) return null
    return response.json()
  } catch (e) {
    return null
  }
}

export async function getProductById(
  id: number,
  isClient?: boolean,
): Promise<{ data: IProduct } | null> {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/product/by-id/${id}`,
    )
    if (response.status >= 400) return null
    return response.json()
  } catch (e) {
    return null
  }
}
