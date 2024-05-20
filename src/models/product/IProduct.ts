import { IBrand } from '@models/IBrand'
import { IAttribute } from '@models/product/attibutes'
import { IResponse } from '@models/IResponse'

export interface IProduct {
  id: number
  name: string // Название товара
  slug: string // имя товара в url
  categories: IProductCategory[] // Категория товара
  is_only_on_retail_store: 1 | 0
  categories_tree: {
    main_category: {
      id: number
      slug: string
      name: string
      for_whos_id: number
    }
    category: {
      id: number
      name: string
      slug: string
    }
    subcategory?: {
      id: number
      name: string
      slug: string
      description: string
    }
  }
  brand: IBrand // Бренд
  price: number //цена без скидки
  description: string // описание
  quantity: number // количество товара
  code: number // Артикул
  image: string // главное изображение товара
  images: IProductImage[]
  status: boolean // Товар в наличии?
  compound?: string // Состав продукта
  characteristics?: string // Характеристика
  brandInfo?: string // Информация о бренде
  discount?: IDiscount //скидка
  colors?: IProductColor[] // цвета продукта
  sizes?: string[] // размер продукта
  attributes: IAttribute[]
  isNew?: boolean //Новинка
  sku: number
  discount_percent: number | null
  for_who: {
    id: number
    slug: string
    name: string
  } | null
  product_type_id: number | null
}

export interface IProductData extends IResponse {
  data: IProduct[]
}

export interface IProductImage {
  id: number
  url: string
}

export interface IProductCategory {
  id: number
  name: string
  slug: string
  parent_id: number
  icon: null | string
  description: null | string
}

// export interface IProductSize {
//   sizeList: string[] // Размер продукта (пример: L, S, M, XL, XS)
// }

export interface IProductVolume {
  type: 'ML' | 'L' // Величина объема (ML, L)
  volumeList: number[]
}

export interface IProductColor {
  name: string
  color: string
}

export interface IDiscount {
  id: number
  slug: string
  name: string
  image: string | null
  description: string
  brand_id: null
  percent: number // скидка в процентах (пример: 20)
  deadline: string // дата конца акции
}
