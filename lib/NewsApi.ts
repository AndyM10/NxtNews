import { Article, NewsDataResponse, NewsSourcesResponse, Sources } from "types/types";

const fetcher = async (
  endpoint: string
): Promise<NewsDataResponse | NewsSourcesResponse> => {
  const url = `https://newsapi.org/v2/${endpoint}&apiKey=${process.env.API_KEY}`;

  try {
    const data = await fetch(url);
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
  let sourceIds: string[] = []
  sourcesList.sources.map(source => {
    sourceIds.push(source.id)
  })
  return sourceIds.toString()
}
