import { getSources, getNews } from '@lib/NewsApi'
import { Feed } from 'components/Feed'

const getNewsData = async () => {
  const Ids = await getSources()
  return await getNews(Ids)
}
export default async function Page() {
  const news = await getNewsData()

  return (
    <div className="mx-auto px-2 pt-20">
      NEW HOMEPAGE
      <Feed articles={news} />
    </div>
  )
}
