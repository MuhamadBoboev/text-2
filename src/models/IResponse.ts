export interface IResponse {
  data: any[]
  links: {
    first: string
    last: string
    next: null | string
    prev: null | string
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      active: boolean
      label: string
      url: null | string
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}
