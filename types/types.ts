export interface NewsDataResponse {
  status: string;
  totalResults: number;
  articles: Array<Article>;
}

export interface Article {
  title: string;
  author: string;
  source: {
    Id: string;
    Name: string;
  };
  publishedAt: string;
  url: string;
}
