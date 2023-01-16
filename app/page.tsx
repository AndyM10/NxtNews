import { getSources, getNews } from '@lib/NewsApi'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Feed } from 'components/Feed'
import { firebaseAdmin } from '@lib/firebase/firebaseAdmin'

const getNewsData = async () => {
  const Ids = await getSources()
  return await getNews(Ids)
}

const getUser = async () => {
  try {
    const tokenCookie = cookies().get('token')
    if (!tokenCookie) throw ('No cookie here!')
    const user = await firebaseAdmin.auth().verifyIdToken(tokenCookie.value)
    const data = await firebaseAdmin.firestore().collection('users').where('displayName', '==', user.name).get()
    if (data) {
      return data.docs!.at(0)!.data()
    }
  } catch (err) {
    console.error('Error:', err)
  }
}
export default async function Page() {

  const news = await getNewsData()
  const user = await getUser()

  if (user) {
    redirect(`/${user.username}`)
  }

  return (
    <div className="mx-auto px-2 pt-20">
      NEW HOMEPAGE
      <Feed articles={news} />
    </div>
  )
}
