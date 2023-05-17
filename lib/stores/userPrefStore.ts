import { NxtUserPrefs } from '@lib/utils/getUserPrefs'
import { create } from 'zustand'

export interface UserDataState {
  userPrefs: NxtUserPrefs | undefined,
}

export const useUserPrefStore = create<UserDataState>()(() => ({
  userPrefs: undefined
}))

