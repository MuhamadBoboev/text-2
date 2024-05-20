import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  contactsNav,
  deliveryNav,
  purchaseNav,
} from '@store/reducers/menuSlice/helpers'

export type menuPageType = {
  deliveryGroup: {
    main: boolean
    delivery: boolean
    payment: boolean
    guarantees: boolean
  }
  purchase: {
    main: boolean
    delivery: boolean
    payment: boolean
    guarantees: boolean
  }
  contacts: {
    main: boolean
    addresses: boolean
    telephones: boolean
  }
  about: boolean
}

interface MenuState {
  isOpen: boolean
  pages: menuPageType
  outsideOpen?: boolean
}

const initialState: MenuState = {
  isOpen: false,
  pages: {
    deliveryGroup: {
      main: false,
      delivery: false,
      payment: false,
      guarantees: false,
    },
    purchase: {
      main: false,
      delivery: false,
      payment: false,
      guarantees: false,
    },
    contacts: {
      main: false,
      addresses: false,
      telephones: false,
    },
    about: false,
  },
  outsideOpen: false,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpen = !state.isOpen
    },
    openMenu(state) {
      state.isOpen = true
    },
    closeMenu(state) {
      state.isOpen = false
    },
    toMainMenu(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuDeliveryGroup(state, action?: PayloadAction<boolean | undefined>) {
      state.pages = {
        deliveryGroup: deliveryNav('main'),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav(),
      }
      state.outsideOpen = action?.payload || false
    },
    toMenuDelivery(state) {
      state.pages = {
        deliveryGroup: deliveryNav('delivery'),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuPayment(state) {
      state.pages = {
        deliveryGroup: deliveryNav('payment'),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuGuarantees(state) {
      state.pages = {
        deliveryGroup: deliveryNav('guarantees'),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuContacts(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav('main'),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuAddresses(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav('addresses'),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuTelephones(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav('telephones'),
        about: false,
        purchase: purchaseNav(),
      }
    },
    toMenuAbout(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav(),
        about: true,
        purchase: purchaseNav(),
      }
    },
    toMenuPurchase(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav('main'),
      }
    },
    toMenuPurchaseDelivery(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav('delivery'),
      }
    },
    toMenuPurchasePayment(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav('payment'),
      }
    },
    toMenuPurchaseGuarantees(state) {
      state.pages = {
        deliveryGroup: deliveryNav(),
        contacts: contactsNav(),
        about: false,
        purchase: purchaseNav('guarantees'),
      }
    },
    clearMenuState(state) {
      state.pages = initialState.pages
      state.outsideOpen = false
    },
  },
})

export const {
  toMenuAddresses,
  toMenuContacts,
  toMenuDelivery,
  toMenuGuarantees,
  toMenuAbout,
  toMenuPayment,
  openMenu,
  closeMenu,
  toMainMenu,
  toMenuDeliveryGroup,
  toggleMenu,
  toMenuTelephones,
  clearMenuState,
  toMenuPurchase,
  toMenuPurchasePayment,
  toMenuPurchaseDelivery,
  toMenuPurchaseGuarantees,
} = menuSlice.actions

export default menuSlice.reducer
