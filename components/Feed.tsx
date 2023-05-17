'use client'
import { NewsArticle } from '@lib/NewsApi'
import { useNewsStore } from '@lib/stores/newsStore'

interface FeedItemProps {
  article: NewsArticle
}

function FeedItem({ article }: FeedItemProps) {
  return (
    <div className="feed-item">
      <div className="card-body">
        <a href={article.url} rel=" noopener noreferrer" target="blank">
          <h3 className="card-title px-2"> {article.title}</h3>
          <h4 className="px-2">Source: {article.source.Name}</h4>
        </a>
      </div>

    </div>
  )
}

export function Feed() {
  const { articles } = useNewsStore()

  return (
    <div className="flex flex-col rounded bg-black border border-gray-800 m-auto w-1/2 ">
      {articles
        ? articles.map((article: NewsArticle) => <FeedItem article={article} key={article.title} />)
        : null}
    </div>
  )
}
