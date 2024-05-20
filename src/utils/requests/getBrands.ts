export async function getBrands() {
  try {
    const response = await fetch(`${process.env.API_URL}/brands`)
    return response.json()
  } catch (e) {
    return null
  }
}
