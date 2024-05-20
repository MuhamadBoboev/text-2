import { IQuickLink } from '@models/IQuickLink'

export async function getQuickLinks(): Promise<IQuickLink[] | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/quick-links`)
    const quickLinks = await response.json()
    return quickLinks.data
  } catch (e) {
    return null
  }
}
