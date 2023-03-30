import { getSources, getNews } from '@lib/NewsApi'
import { getUser } from '@lib/utils/getUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Feed } from 'components/Feed'
import { NxtUser } from 'types/types'

const getNewsData = async () => {
  const Ids = await getSources()
  return await getNews(Ids)
}

export default async function Page() {
  const tokenCookie = cookies().get('token')
  const news = await getNewsData()
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
    <div className="mx-auto px-2 pt-20">
      NEW HOMEPAGE
      <Feed articles={news} />
    </div>
  )
}
