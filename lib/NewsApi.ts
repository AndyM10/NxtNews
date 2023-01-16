import { Article, NewsDataResponse, NewsSourcesResponse, Source } from "types/types";

const fetcher = async (
  endpoint: string
): Promise<NewsDataResponse | NewsSourcesResponse> => {
  const url = `https://newsapi.org/v2/${endpoint}&apiKey=${process.env.API_KEY}`;

  try {
    const data = await fetch(url, { cache: 'no-store' });
    console.log('Getting the news')
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
  console.log(sourcesList)
  let sourceIds: Array<string> = []
  sourcesList.sources.map((source: Source) => {
    sourceIds.push(source.id)
  })
  return sourceIds.toString()
}
