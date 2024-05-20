export interface IAttribute {
  id: number
  name: string
  slug: string
  attribute_id: number
  price: number
  quantity: number
  type: IAttributeType
}

export interface IAttributeType {
  id: number
  name: string
  slug: string
}
