export interface IBanner {
  id: number
  path: string
  mobile_path?: string
  type: string
  order: number
  is_active: number
  title?: string
  description: string | null
  link_name: string
  link: string
}
