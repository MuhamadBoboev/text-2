export async function getDiscounts(isClient?: boolean) {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/discount`,
    )
    return response.json()
  } catch (e) {
    return null
  }
}
