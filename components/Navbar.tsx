'use client'
import { useAuth } from '@lib/context'
import { signInWithPopup, signOut } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import { auth, googleAuthProvider } from '@lib/firebase/firebaseClient'
import Link from 'next/link'
import { useEffect } from 'react'
import UsernameForm from './UsernameForm'
import { useNewsStore } from '@lib/stores/newsStore'

export default function Navbar() {
  const router = useRouter()
  const { user, username } = useAuth()
  const path = usePathname()
  const signOutNow = () => {
    useNewsStore.setState({ articles: [] })
    signOut(auth)
    router.push('/')
  }

  useEffect(() => {
    if (path !== `/${username}` && username) {
      router.push(`/${username}`)
    }
  }, [username])

  return (
    <div className="navbar bg-black">
      <div className=" navbar-start">
        <Link href="/">
          <h1 className="font-semibold text-3xl" >
            NxtNews
          </h1>
        </Link>
      </div>
      <div className="navbar-end">
        {user
          ? username
            ? <button className="btn" onClick={signOutNow}>Sign Out</button>
            : <UsernameForm user={user} />
          : <SignInButton />}
      </div>
    </div >
  )
}

function SignInButton(): JSX.Element {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }

  return <button className="btn" onClick={signInWithGoogle}>Sign in</button>
}

