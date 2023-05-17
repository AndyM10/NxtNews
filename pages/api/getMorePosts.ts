// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Article } from '../../types/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Article> | string>
) {
  const key = process.env.API_KEY
  const query = ''
  const data = JSON.parse(req.body)
  const { cursor, sources } = data
  const url = `https://newsapi.org/v2/everything?q=${query}&sources=${sources}&apiKey=${key}&page=${cursor}&language=en`

  res.status(200).json(resp.articles)
}
