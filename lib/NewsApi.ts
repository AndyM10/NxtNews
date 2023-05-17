import { NxtUserPrefs } from '@lib/utils/getUserPrefs'
import { createZodFetcher } from 'zod-fetch'
import { z } from 'zod'

const Source = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  category: z.string(),
  language: z.string(),
  country: z.string()
})

const NewsSourcesResponse = z.object({
  status: z.string(),
  sources: z.array(Source)
})

const Article = z.object({
  title: z.string(),
  author: z.string().nullable(),
  source: z.object({
    Id: z.string().nullable(),
    Name: z.string()
  }),
  publishedAt: z.string(),
  url: z.string()

})

const NewsDataResponse = z.object({
  status: z.string(),
  totalResults: z.number().nullable(),
  articles: z.array(Article)
})

export type NewsArticle = z.infer<typeof Article>

const zFetch = createZodFetcher()

export const getNews = async (user?: NxtUserPrefs, page?: number) => {
  const sources = await getSources(user?.region[0].value)
  const news = await getArticles(sources, user?.interests, page)

  return news
}

const getSources = async (country: string = 'en') => {
  console.log(`https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=${process.env.API_KEY}`)
  const resp = await zFetch(
    NewsSourcesResponse,
    `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=${process.env.API_KEY}`
  )

  const sources = resp.sources.slice(0, 20).map((source: z.infer<typeof Source>) => source.id).
    join(',')

  return sources
}

const getArticles = async (sources: string, prefs: string = '', page: number = 1) => {

  /*
   * Take user prefs and join then with 'OR' between each work
   * e.g. 'bitcoin OR ethereum'
   */
  const query = `q=${prefs.split(' ').join(' OR ')}`

  console.log(`https://newsapi.org/v2/everything?${query}sources=${sources}&page=${page}&apiKey=${process.env.API_KEY}`)
  const resp = await zFetch(
    NewsDataResponse,
    `https://newsapi.org/v2/everything?${query}sources=${sources}&page=${page}&apiKey=${process.env.API_KEY}`
  )

  return resp.articles

}

