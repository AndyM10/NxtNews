import * as firebaseAdmin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'

/*
 * Get this JSON from the Firebase board
 * you can also store the values in environment variables
 */

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://nxtnews-34cfe.firebaseio.com'
  })
}

export { firebaseAdmin }
