import { ICatalogMenu } from '@models/ICatalogMenu'
import { ICatalog } from '@models/ICatalog'

export async function getCatalog(
  isClient?: boolean,
): Promise<ICatalogMenu[] | null> {
  try {
    const catalogResponse = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/catalog`,
    )
    const catalog: { data: ICatalogMenu[] } = await catalogResponse.json()
    // return catalog.data.sort((a, b) => (a.order || 0) > (b.order || 0) ? 1 : -1)
    return catalog.data
  } catch (e) {
    return null
  }
}
