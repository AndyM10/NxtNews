'use client'
import { useAuth } from "@lib/context"
import { signInWithPopup, signOut } from "firebase/auth"
import { useRouter, usePathname } from "next/navigation"
import { auth, googleAuthProvider } from "@lib/firebase/firebaseClient"
import Link from "next/link"
import { useEffect } from "react"
import UsernameForm from "./UsernameForm"

export default function Navbar() {
  const router = useRouter()
  const { user, username } = useAuth()
  const path = usePathname()
  const signOutNow = () => {
    signOut(auth)
    router.push('/')
  }

  useEffect(() => {
    if (path !== `/${username}` && username) {
      router.push(`/${username}`)
    }
  }, [username])

  return (
    <div className="fixed top-0 flex w-full border-b border-gray-800 bg-black ">
      <div className="flex h-14 items-center py-4 px-4 ">
        <Link href='/'>
          <h3 className="font-semibold tracking-wide  group-hover:text-gray-50" >
            New Nav
          </h3>

        </Link>
      </div>
      <div className="flex group absolute right-0 top-0 h-14">
        {user ?
          username ?
            <button className="px-4 right-0 top-0 tracking-wide" onClick={signOutNow}>Sign Out</button>
            : <UsernameForm user={user} />
          : <SignInButton />
        }
      </div>
    </div>
  )
}

const SignInButton = (): JSX.Element => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }
  return <button className="tracking-wide" onClick={signInWithGoogle}>Sign in</button>
}

