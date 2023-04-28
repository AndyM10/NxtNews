import { getUserPrefs, NxtUserPrefs } from "@lib/utils/getUserPrefs";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { create, StateCreator } from "zustand";

export interface UserDataState {
  userPrefs: NxtUserPrefs | undefined,
}

export const useUserPrefStore = create<UserDataState>()(() => ({
  userPrefs: undefined,
}))

