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

export interface NewsSourcesResponse {
  status: string;
  sources: Array<Sources>;
}
export interface Sources {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

