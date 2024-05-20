import { ICategory } from '@models/ICategory'

export async function getCategory(slug: string): Promise<ICategory | null> {
  if (!slug) return null
  try {
    const response = await fetch(`${process.env.API_URL}/category/${slug}`)
    return await response.json()
  } catch (e) {
    return null
  }
}

interface QueryProps {
  categories?: string[] | string
  main_category_id?: string | string[]
  category_id?: string | string[]
  subcategory_id?: string | string[]
  brands?: string[] | string
  per_page?: number
  prices?: string | string[] // 0-155
  page?: string | string[]
  filter?: string // low_high, high_low
  isClient?: boolean
  q?: string
  forWho?: string
  type?: string
  price?: string
  has_discount?: string
}

export async function getCategoryByQuery({
  categories,
  brands,
  per_page,
  prices,
  page,
  filter,
  q,
  isClient,
  forWho,
  type,
  price,
  main_category_id,
  subcategory_id,
  category_id,
  has_discount,
}: QueryProps) {
  const categoriesId = Array.isArray(categories) ? categories : [categories]
  const brandsId = Array.isArray(brands) ? brands : [brands]

  try {
    const categoriesQuery = categoriesId
      .map((id) => `categories[]=${id}`)
      .join('&')
    const brandsQuery = brandsId.map((id) => `brands[]=${id}`).join('&')

    let queryStr = `${isClient ? process.env.NEXT_PUBLIC_API_URL : process.env.API_URL}/products?per_page=${per_page || 10}`

    if (categories) {
      queryStr += `&${categoriesQuery}`
    }

    if (main_category_id) {
      if (Array.isArray(main_category_id)) {
        queryStr += `&main_category_id=${main_category_id[0]}`
      } else {
        queryStr += `&main_category_id=${main_category_id}`
      }
    }

    if (has_discount === '1') {
      queryStr += '&has_discount=1'
    }

    if (category_id) {
      if (Array.isArray(category_id)) {
        queryStr += `&category_id=${category_id[0]}`
      } else {
        queryStr += `&category_id=${category_id}`
      }
    }

    if (subcategory_id) {
      if (Array.isArray(subcategory_id)) {
        queryStr += `&subcategory_id=${subcategory_id[0]}`
      } else {
        queryStr += `&subcategory_id=${subcategory_id}`
      }
    }

    if (brands) {
      queryStr += `&${brandsQuery}`
    }
    if (prices) {
      queryStr += `&prices=${prices}`
    }
    if (page) {
      queryStr += `&page=${page}`
    }

    if (filter) {
      queryStr += `&filter=${filter}`
    }

    if (q) {
      queryStr += `&q=${q}`
    }

    if (forWho) {
      queryStr += `&for_who[]=${forWho}`
    }

    if (type) {
      queryStr += `&type=${type}`
    }

    if (price) {
      queryStr += `&price=${price}`
    }

    const response = await fetch(queryStr)
    return await response.json()
  } catch (e) {
    return null
  }
}

export async function getMainCategory(id: number): Promise<number[] | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/main-category/${id}`)
    if (response.status !== 200) return null
    const ids: number[] = []

    const mainCategory: {
      data: { categories: { id: number; subcategories: { id: number }[] }[] }
    } = await response.json()

    if (mainCategory) {
      mainCategory.data.categories.forEach((category) => {
        ids.push(category.id)
        category.subcategories.forEach((subcategory) =>
          ids.push(subcategory.id),
        )
      })
    }

    return ids
  } catch (e) {
    return null
  }
}
