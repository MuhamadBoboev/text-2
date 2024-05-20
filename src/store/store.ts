import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import modalCallReducer from './reducers/modalCall'
import modalOrderReducer from './reducers/modalOrder'
import menuReducer from './reducers/menuSlice'
import browsedReducer from './reducers/browsedSlice'
import signUpReducer from './reducers/signUpSlice'
import signInReducer from './reducers/signInSlice'
import favoriteReducer from './reducers/favoriteSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { catalogSlice } from '@store/reducers/catalogSlice'
import { feedbackSlice } from '@store/reducers/feedbackSlice'
import { cartSlice } from '@store/reducers/cartSlice'
import { userSlice } from '@store/reducers/userSlice'
import { createWrapper } from 'next-redux-wrapper'
import { contactsSlice } from '@store/reducers/contactsSlice'
import { searchSlice } from '@store/reducers/searchSlice'
import { filterSlice } from '@store/reducers/filterSlice'
import { profileSlice } from '@store/reducers/profileSlice'
import { passwordSlice } from '@store/reducers/passwordSlice'
import { forgotPasswordSlice } from '@store/reducers/forgotPasswordSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      modalCall: modalCallReducer,
      modalOrder: modalOrderReducer,
      menu: menuReducer,
      browsed: browsedReducer,
      signUp: signUpReducer,
      signIn: signInReducer,
      favorite: favoriteReducer,
      // cart: useCartReducer,
      // [apiSlice.reducerPath]: apiSlice.reducer,
      catalog: catalogSlice.reducer,
      feedback: feedbackSlice.reducer,
      user: userSlice.reducer,
      contacts: contactsSlice.reducer,
      search: searchSlice.reducer,
      filter: filterSlice.reducer,
      profile: profileSlice.reducer,
      password: passwordSlice.reducer,
      forgotPassword: forgotPasswordSlice.reducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

setupListeners(store.dispatch)
export default store
