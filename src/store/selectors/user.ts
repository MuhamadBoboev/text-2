import { AppState } from '@store/store'

export const selectUser = (state: AppState) => state.user
export const selectUserData = (state: AppState) => state.user.user
