import { createSlice } from '@reduxjs/toolkit'

interface ContactsState {
  isOpen: boolean
}

const initialState: ContactsState = {
  isOpen: false,
}

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
  reducers: {
    modalOpenContacts(state) {
      state.isOpen = true
    },
    modalCloseContacts(state) {
      state.isOpen = false
    },
    modalToggleContacts(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { modalCloseContacts, modalToggleContacts, modalOpenContacts } =
  contactsSlice.actions
