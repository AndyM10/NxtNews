// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const key = process.env.API_KEY
    const data = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=0&q=election&api-key=${key}`)
    const responseData = await data.json()
    res.status(200).json(responseData.response.docs)
}
