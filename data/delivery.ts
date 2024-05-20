import { IDelivery } from '@models/IDelivery'

export const deliveryList: IDelivery[] = [
  {
    id: 1,
    name: 'Экспресс-доставка',
    slug: 'express',
    description:
      'В течении двух часов ваш товар будет доставлен. Стоимость 30 сомони',
  },
  {
    id: 2,
    name: 'Обычная доставка',
    slug: 'standard',
    description: 'Ваш товар будет доставлен в течении дня. Стоимость 15 сомони',
  },
]
