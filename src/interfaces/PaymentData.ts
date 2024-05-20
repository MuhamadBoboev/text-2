export interface PaymentData {
  data: {
    id: number
    discount: number
    created_at: string
    payment?: {
      id: number
      created_at: string
      order_id: number
      status: 0
      tran_id: string
      updated_at: string
    }
    payment_link: string
    payment_method_id: number
    status_id: null | number
    status_name: null | string
    sub_total: number
    total: string
    updated_at: string
    user: {
      id: number
      name: string
      address: string
      phone: string
    }
  }
}
