import { Article, NewsDataResponse } from "types/types";
import ErrorMessage from "./utils/ErrorMessage";

const fetcher = async (
  query: string,
  sources: string
): Promise<NewsDataResponse> => {
  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sources=${sources}&apiKey=${process.env.API_KEY}`;

  try {
    const data = await fetch(url);
    const resp: NewsDataResponse = await data.json();
    return resp;
  } catch (error) {
    throw error;
  }
};

export const getNews = async (): Promise<Array<Article>> => {
  const query = "";
  const source = "google-news-uk";
  const news = await fetcher(query, source);
  return news.articles;
};
