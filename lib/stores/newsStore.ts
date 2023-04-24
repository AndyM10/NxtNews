
import { create } from "zustand";
import { getNews, NewsArticle } from "../NewsApi";
import { NxtUserPrefs } from "../utils/getUserPrefs";

export interface NewsStore {
  articles: Array<NewsArticle>,
  page: number,
  incrementPage: () => void,
  fetchArticles: (page?: number) => Promise<void>,
  fetchUserArticles: (user: NxtUserPrefs) => Promise<void>,
}


export const useNewsStore = create<NewsStore>()((set) => ({
  articles: [],
  page: 1,
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  fetchArticles: async (page) => {
    const res = await getNews(undefined, page);
    set((state) => ({ articles: state.articles.concat(res) }));
  },
  fetchUserArticles: async (user: NxtUserPrefs) => {
    const res = await getNews(user);
    set((state) => ({ articles: state.articles.concat(res) }));
  }
}));

