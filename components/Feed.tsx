import { NewsArticle } from "@lib/NewsApi"

interface FeedProps {
  articles: Array<NewsArticle>
}

interface FeedItemProps {
  article: NewsArticle
}

const FeedItem = ({ article }: FeedItemProps) => {
  return (
    <div className="feed-item">
      <a href={article.url} target="blank" rel=" noopener noreferrer">
        <h3 className="px-2"> {article.title}</h3>
        <h4 className="px-2">Source: {article.source.Name}</h4>
      </a>
    </div>
  )
}

export const Feed = ({ articles }: FeedProps) => {
  return (
    <div className="flex flex-col rounded bg-black border border-gray-800">
      {articles ? articles.map((article: NewsArticle) => <FeedItem key={article.title} article={article} />) : null}
    </div>
  )
}
