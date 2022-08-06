export interface NewsDataResponse {
  status: string
  totalResults: number
  results: []
  nextPage: number
}

export interface NewsDataResult {
  title: string
  link: string
  source_id: string
  keywords: any[]
  creator: any[]
  image_url: string
  video_url: string
  description: string
  pubDate: string
  content: string
  country: any[]
  category: any[]
  language: string
}
