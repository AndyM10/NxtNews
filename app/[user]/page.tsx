import { cookies } from 'next/headers'
import { firebaseAdmin } from '@lib/firebase/firebaseAdmin'
import { Feed } from '@components/Feed'
import { redirect } from 'next/navigation'
import { useUserPrefStore } from '@lib/stores/userPrefStore'
import PageButton from '@components/PageButton'
import { getUserPrefs } from '@lib/utils/getUserPrefs'
import { useNewsStore } from '@lib/stores/newsStore'
import { getNews } from '@lib/NewsApi'
import StoreInitalizer from '@lib/stores/storeInitalizer'
import { useRouter } from 'next/navigation'

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
export default async function Page({ params }: { params: { user: string } }) {
  useNewsStore.setState({ articles: [] })
  const user = await getUser()
  if (!user) redirect('/')
  const prefs = await getUserPrefs(user.uid)
  prefs ? useUserPrefStore.setState({ userPrefs: prefs }) : null

  const news = await getNews(prefs)
  useNewsStore.setState({ articles: news })


  return (
    <div className='mx-auto my-auto mt-5'>
      <StoreInitalizer articles={news} />
      <h1 className='text-4xl font-semibold text-center'>Welcome {params.user}</h1>
      <Feed />
      <PageButton />
    </div>
  )
}
