export interface ICatalogMenu {
  id: number
  slug: string
  name: string
  for_whos_id: number
  order: number | null
  categories: ICatalogMenuItem[]
}

export interface ICatalogMenuItem {
  id: number
  name: string
  slug: string
  parent_id: number
  icon: string | null
  description: string | null
  for_whos_id: number
  main_category_id: number | null
  order: number | null
  subcategories?: ICatalogMenuSubItem[]
}

export interface ICatalogMenuSubItem {
  id: number
  name: string
  slug: string
  parent_id: number
  icon: null | string
  description: string | null
  for_whos_id: number
  main_category_id: number | null
}
