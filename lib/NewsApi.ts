import { getUserPrefs } from '@lib/utils/getUserPrefs'
import { createZodFetcher } from "zod-fetch";
import { z } from "zod";
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

const Source = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  category: z.string(),
  language: z.string(),
  country: z.string(),
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
    Name: z.string(),
  }),
  publishedAt: z.string(),
  url: z.string(),

})

const NewsDataResponse = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(Article),
})

export type NewsArticle = z.infer<typeof Article>

const zFetch = createZodFetcher()

export const getNews = async (user?: DecodedIdToken) => {
  const userPrefs = user ? await getUserPrefs(user.uid) : undefined
  const sources = await getSources(userPrefs?.region)
  const news = await getArticles(sources, userPrefs?.interests)

  return news
}

const getSources = async (country?: string) => {
  const countryParam = country ? `${country}` : ''
  console.log(`https://newsapi.org/v2/top-headlines/sources?country=${countryParam}&apiKey=${process.env.API_KEY}`)
  const resp = await zFetch(
    NewsSourcesResponse,
    `https://newsapi.org/v2/top-headlines/sources?country=${countryParam}&apiKey=${process.env.API_KEY}`
  )

  const sources = resp.sources.slice(0, 20).map((source: z.infer<typeof Source>) => source.id).join(',')
  return sources
}

const getArticles = async (sources: string, prefs?: string) => {

  //Take user prefs and join then with 'OR' between each work
  //e.g. 'bitcoin OR ethereum'
  const query = prefs ? `q=${prefs.split(' ').join(' OR ')}` : ''

  console.log(`https://newsapi.org/v2/everything?${query}sources=${sources}&apiKey=${process.env.API_KEY}`)
  const resp = await zFetch(
    NewsDataResponse,
    `https://newsapi.org/v2/everything?${query}sources=${sources}&apiKey=${process.env.API_KEY}`
  )

  return resp.articles

}

