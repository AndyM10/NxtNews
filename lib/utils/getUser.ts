import { firebaseAdmin } from '@lib/firebase/firebaseAdmin'
import { NxtUser } from 'types/types'


export const getUser = async (userToken: string): Promise<NxtUser | undefined> => {

  try {
    const userAuthData = await firebaseAdmin.auth().verifyIdToken(userToken)

    if (!userAuthData) {
      throw 'Id Token failed to verify'
    }

    const user = await firebaseAdmin.firestore().doc(`users/${userAuthData.uid}`).
      get()

    if (!user) {
      throw 'Failed to fetch user doc'
    }

    return user.data() as NxtUser

  } catch (err) {
    console.error('Error', err)

  }
}
