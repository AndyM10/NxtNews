import { Article, NewsDataResponse, NewsSourcesResponse, Source } from "types/types";
import { NxtUserPrefs } from '@lib/utils/getUserPrefs'

const fetcher = async (
  endpoint: string
): Promise<NewsDataResponse | NewsSourcesResponse> => {
  const url = `https://newsapi.org/v2/${endpoint}&apiKey=${process.env.API_KEY}`;

  try {
    const data = await fetch(url, { cache: 'no-store' });
    const resp: NewsDataResponse = await data.json();
    return resp;
  } catch (error) {
    throw error;
  }
};

export const getNews = async (sourceIds: string): Promise<Array<Article>> => {
  const query = "";
  const endpoint = `everything?q=${query}&language=en&sources=${sourceIds}`
  const news = await fetcher(endpoint) as NewsDataResponse;
  return news.articles;
};

export const getSources = async (): Promise<string> => {
  const endpoint = `top-headlines/sources?language=en&country=gb`
  const sourcesList = await fetcher(endpoint) as NewsSourcesResponse
  let sourceIds: Array<string> = []
  sourcesList.sources.map((source: Source) => {
    sourceIds.push(source.id)
  })
  return sourceIds.toString()
}

const sources = async (userLanguage: string, userCountry: string): Promise<string> => {
  const endpoint = `top-headlines/sources?language=${userLanguage}&country=${userCountry}`
  const sourcesList = await fetcher(endpoint) as NewsSourcesResponse
  let sourceIds: Array<string> = []
  sourcesList.sources.map((source: Source) => {
    sourceIds.push(source.id)
  })
  return sourceIds.toString()
}

const getNewss = async (sourceIds: string, query: string): Promise<Array<Article>> => {
  const endpoint = `everything?q=${query}&language=en&sources=${sourceIds}`
  const news = await fetcher(endpoint) as NewsDataResponse;
  return news.articles;
};



export const News = async (userPref: NxtUserPrefs) => {
  let language = userPref.language[0].value
  let country = userPref.region[0].value
  const s = await sources(language, country)
  const n = await getNewss(s, userPref.interests)

  return n
}
