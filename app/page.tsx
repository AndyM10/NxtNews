import { getUser } from '@lib/utils/getUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Feed } from 'components/Feed'
import { NxtUser } from 'types/types'
import PageButton from '@components/PageButton'
import { getNews } from '@lib/NewsApi'
import { useNewsStore } from '@lib/stores/newsStore'
import StoreInitalizer from '@lib/stores/storeInitalizer'

export default async function Page() {
  const news = await getNews()
  useNewsStore.setState({ articles: news })

  const tokenCookie = cookies().get('token')
  let user: NxtUser | undefined = undefined

  if (tokenCookie) {
    user = await getUser(tokenCookie.value)
  } else {
    console.warn('No token cookie found')
  }

  if (user) {
    redirect(`/${user.username}`)
  }


  return (
    <div className="m-auto">
      <StoreInitalizer articles={news} />
      <h1 className="text-4xl font-semibold text-center">Welcome to NxtNews</h1>
      <Feed />
      <PageButton />
    </div>
  )
}
