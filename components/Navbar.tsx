'use client'
import { useAuth } from "@lib/context"
import { signInWithPopup, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth, googleAuthProvider } from "../firebase/firebaseClient"

export default function Navbar() {
  const router = useRouter()
  const { user, username } = useAuth()

  const signOutNow = () => {
    signOut(auth)
    router.refresh()
  }

  return (
    <div className="fixed top-0 flex w-full border-b border-gray-800 bg-black ">
      <div className="flex h-14 items-center py-4 px-4 ">
        <h3 className="font-semibold tracking-wide  group-hover:text-gray-50" >
          New Nav
        </h3>
      </div>
      <div className="flex group absolute right-0 top-0 h-14">
        {user ? <button className="px-4 right-0 top-0 tracking-wide" onClick={signOutNow}>Sign Out</button> : null}
        {user ? <div className="px-4 py-4 right-0 top-0">IM IN {username}</div> : <SignInButton />}
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

