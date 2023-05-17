
import { create } from 'zustand'
import { NewsArticle, getNews } from '../NewsApi'
import { NxtUserPrefs } from '../utils/getUserPrefs'

export interface NewsStore {
  articles: Array<NewsArticle>,
  fetchArticles: (page?: number) => Promise<void>,
  fetchUserArticles: (user: NxtUserPrefs, page?: number) => Promise<void>,
}


export const useNewsStore = create<NewsStore>()((set) => ({
  articles: [],
  fetchArticles: async (page) => {
    const res = await getNews(undefined, page)

    set((state) => ({ articles: state.articles.concat(res) }))
  },
  fetchUserArticles: async (user: NxtUserPrefs, page?: number) => {
    const res = await getNews(user, page)

    set((state) => ({ articles: state.articles.concat(res) }))
  }
}))

