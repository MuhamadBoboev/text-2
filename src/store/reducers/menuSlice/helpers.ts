import { menuPageType } from '@store/reducers/menuSlice/index'

export const deliveryNav = (
  page?: 'main' | 'delivery' | 'payment' | 'guarantees',
) => {
  const res: any = {
    main: false,
    delivery: false,
    payment: false,
    guarantees: false,
  }

  if (page) res[page] = true
  return res
}

export const purchaseNav = (
  page?: 'main' | 'delivery' | 'payment' | 'guarantees',
) => {
  const res: any = {
    main: false,
    delivery: false,
    payment: false,
    guarantees: false,
  }

  if (page) res[page] = true
  return res
}

export const contactsNav = (page?: 'main' | 'addresses' | 'telephones') => {
  const res: any = {
    main: false,
    addresses: false,
    telephones: false,
  }

  if (page) res[page] = true
  return res
}

export const isMainMenu = (pages: menuPageType) => {
  return (
    !pages.about &&
    !pages.contacts.main &&
    !pages.contacts.addresses &&
    !pages.contacts.telephones &&
    !pages.deliveryGroup.main &&
    !pages.deliveryGroup.delivery &&
    !pages.deliveryGroup.payment &&
    !pages.deliveryGroup.guarantees &&
    !pages.purchase.main &&
    !pages.purchase.payment &&
    !pages.purchase.delivery &&
    !pages.purchase.guarantees
  )
}
