import { firebaseAdmin } from "@lib/firebase/firebaseAdmin"

export interface NxtUserPrefs {
  interests: string,
  region: string,
}

export const getUserPrefs = async (uid: string): Promise<NxtUserPrefs | undefined> => {
  try {
    const prefs = await firebaseAdmin.firestore().doc(`preferences/${uid}`).get()
    if (!prefs) throw ('Failed to fetch user preferences')
    return prefs.data() as NxtUserPrefs
  } catch (err) {
    console.error(err)
    return
  }
}
