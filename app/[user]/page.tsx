import { cookies } from 'next/headers'
import { firebaseAdmin } from '@lib/firebase/firebaseAdmin'
import { Feed } from '@components/Feed'
import { redirect } from 'next/navigation'
import { useUserPrefStore } from '@lib/stores/userPrefStore'

const getUser = async () => {
  try {
    const tokenCookie = cookies().get('token')
    if (!tokenCookie?.value) throw ('No cookie here!')

    const user = await firebaseAdmin.auth().verifyIdToken(tokenCookie.value)
    if (!user) throw ('No user here!')

    return user

  } catch (err) {
    console.error('Error:', err)
    return null
  }
}
export default async function Page() {

  const user = await getUser()
  if (!user) redirect('/')

  useUserPrefStore().fetchUserPrefs(user)

  return (
    <div className='mx-auto px-2 pt-20'>
      User page
      <Feed />
      //button to increment page number
    </div>
  )
}
