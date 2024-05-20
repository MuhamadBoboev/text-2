import { INewProducts } from '@models/INewProducts'
import { ICatalog } from '@models/ICatalog'
import { hitProductsType } from '@utils/requests/getProducts'

export async function getForWhoList(api?: string): Promise<ICatalog[] | null> {
  try {
    const responseForWho = await fetch(`${api || process.env.API_URL}/for-who`)
    return await responseForWho.json()
  } catch (e) {
    return null
  }
}

export async function getForWho(slug: string): Promise<INewProducts | null> {
  try {
    const responseForWho = await fetch(`${process.env.API_URL}/for-who/${slug}`)
    return await responseForWho.json()
  } catch (e) {
    return null
  }
}

export async function getHitsProducts() {
  const hits: hitProductsType = {}

  // Для всех
  try {
  } catch (e) {}

  // Для мужчин
  try {
  } catch (e) {}

  // Для женщин
  try {
  } catch (e) {}
}
