export async function getSlides(isClient?: boolean) {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/web/banners/slider`,
    )
    const slides = await response.json()
    return slides.data
  } catch (e) {
    return null
  }
}

export async function fetchMainBanners(isClient?: boolean) {
  try {
    const response = await fetch(
      `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/web/banners/main`,
    )
    const slides = await response.json()
    return slides.data
  } catch (e) {
    return null
  }
}
