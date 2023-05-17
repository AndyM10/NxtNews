// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/*
 * TODO: Add SDKs for Firebase products that you want to use
 * https://firebase.google.com/docs/web/setup#available-libraries
 */

/*
 * Your web app's Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBjTphybQQt8sBByNUZMb1TycKO3rJX1e0',
  authDomain: 'nxtnews-34cfe.firebaseapp.com',
  projectId: 'nxtnews-34cfe',
  storageBucket: 'nxtnews-34cfe.appspot.com',
  messagingSenderId: '271325909828',
  appId: '1:271325909828:web:0476b0bfef4b6fce92fd11',
  measurementId: 'G-46Y7LR4M8C'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
setPersistence(auth, browserSessionPersistence)
export const googleAuthProvider = new GoogleAuthProvider()
export const firestore = getFirestore(firebaseApp)
