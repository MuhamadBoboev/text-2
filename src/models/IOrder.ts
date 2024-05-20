export interface IOrderData {
  data: IOrder[]
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      active: boolean
      label: string
      url: string | null
    }[]
    path: string
    per_page: string
    to: number
    total: number
  }
}

export interface IOrder {
  id: number
  user_id: number
  payment_method: number
  payment_method_id: number
  payment?: {
    id: number
    status: number
    tran_id: string
    order_id: number
    created_at: string
    updated_at: string
  }
  shipping_type: string
  discount: number
  discount_type: 'percent' | 'fixed'
  total: number
  sub_total: number
  status_id: number
  status_name: string
  items: IOrderProduct[]
  created_at: string
  updated_at: string
}

export interface IOrderProduct {
  id: number
  order_id: number
  attribute_id: number
  attribute_name: string
  item_name: string
  item_price: number
  item_quantity: number
  product?: {
    id: number
    image: string
    name: string
    slug: string
    discount_percent: number | null
  }
}
