import { auth, firestore } from './firebase'
import { Unsubscribe, doc, onSnapshot } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'

export function useUserData() {
  const [user] = useAuthState(auth)
  const [
    username,
    setUsername
  ] = useState(null)

  useEffect(() => {
    let unsubscribe: void | Unsubscribe

    if (user) {
      const ref = doc(firestore, 'users', user.uid)

      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }

    return unsubscribe

  }, [user])

  return { user,
    username }
}
