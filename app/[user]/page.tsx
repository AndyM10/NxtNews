import { cookies } from 'next/headers'
import { firebaseAdmin } from '@lib/firebase/firebaseAdmin'
import { News } from '@lib/NewsApi'
import { NxtUserPrefs } from '@lib/utils/getUserPrefs'
import { Feed } from '@components/Feed'
const getUser = async () => {
  try {
    const tokenCookie = cookies().get('token')
    if (!tokenCookie) throw ('No cookie here!')
    const user = await firebaseAdmin.auth().verifyIdToken(tokenCookie.value)
    const preference = await firebaseAdmin.firestore().doc(`preferences/${user.uid}`).get()
    const prefData = preference.data() as NxtUserPrefs
    if (prefData) {
      return prefData
    }

  } catch (err) {
    console.error('Error:', err)
  }
}
export default async function Page() {

  const pref = await getUser()
  const news = await News(pref!)
  return (
    <div className='mx-auto px-2 pt-20'>
      User page
      <Feed articles={news} />
    </div>
  )
}
