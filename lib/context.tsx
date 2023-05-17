import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth, firestore } from '@lib/firebase/firebaseClient'
import { Unsubscribe, doc, onSnapshot } from 'firebase/firestore'
import nookies from 'nookies'

const AuthContext = createContext<{ user: User | null, username: string | null }>({ user: null,
  username: null })

export function AuthProvider({ children }: any) {
  const [
    user,
    setUser
  ] = useState<User | null>(null)
  const [
    username,
    setUsername
  ] = useState<string | null>(null)

  useEffect(() => auth.onIdTokenChanged(async (user) => {
    if (!user) {
      setUser(null)
      setUsername(null)
      nookies.set(undefined, 'token', '', { path: '/' })
    } else {
      const token = await user.getIdToken()

      setUser(user)
      nookies.set(undefined, 'token', token, { path: '/' })
    }
  }), [])

  useEffect(() => {
    const handler = setInterval(async () => {
      const user = auth.currentUser

      if (user) {
        await user.getIdToken(true)
      }
    }, 10 * 60 * 1000)

    return () => clearInterval(handler)
  }, [])

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

  return (
    <AuthContext.Provider value={{ user,
      username }}
    >{children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
