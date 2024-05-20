import { createSlice } from '@reduxjs/toolkit'

interface FeedbackState {
  isOpen: boolean
  pages: {
    main: boolean
    contacts: boolean
  }
}

export const initialState: FeedbackState = {
  isOpen: false,
  pages: {
    main: true,
    contacts: false,
  },
}

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    openFeedback(state) {
      state.isOpen = true
    },
    toggleFeedback(state) {
      state.isOpen = !state.isOpen
    },
    closeFeedback(state) {
      state.isOpen = false
    },
    toFeedbackMain(state) {
      state.pages = {
        main: true,
        contacts: false,
      }
    },
    toFeedbackContacts(state) {
      state.pages = {
        main: false,
        contacts: true,
      }
    },
  },
})

export const {
  openFeedback,
  toggleFeedback,
  closeFeedback,
  toFeedbackMain,
  toFeedbackContacts,
} = feedbackSlice.actions
