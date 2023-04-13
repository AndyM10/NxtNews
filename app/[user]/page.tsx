import { cookies } from 'next/headers'
import { firebaseAdmin } from '@lib/firebase/firebaseAdmin'
import { getNews } from '@lib/NewsApi'
import { Feed } from '@components/Feed'
import { redirect } from 'next/navigation'

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

  const news = user ? await getNews(user) : null
  return (
    <div className='mx-auto px-2 pt-20'>
      User page
      {news ? <Feed articles={news} /> : <p>loading...</p>}
    </div>
  )
}
