import { getUserPrefs, NxtUserPrefs } from "@lib/utils/getUserPrefs";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { create, StateCreator } from "zustand";

export interface UserDataState {
  userPrefs: NxtUserPrefs | undefined,
  fetchUserPrefs: (user: DecodedIdToken) => Promise<void>
}

export const useUserPrefStore = create<UserDataState>()((set) => ({
  userPrefs: undefined,
  fetchUserPrefs: async (user: DecodedIdToken) => {
    const prefs = await getUserPrefs(user.uid)
    set({ userPrefs: prefs })
  }
}))

