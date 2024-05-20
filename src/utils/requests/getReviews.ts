export async function getReviews(isClient?: boolean) {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/web/reviews`,
    )
    const data = await response.json()
    return data
  } catch (e) {
    return null
  }
}
