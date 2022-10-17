// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NewsDataResponse, Article } from "../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Article>>
) {
  const key = process.env.API_KEY;
  const query = "";
  const sources = "google-news-uk";
  const page = eval(req.body);
  const url = `https://newsapi.org/v2/everything?q=${query}&sources=${sources}&apiKey=${key}&page=${page}`;
  const data = await fetch(url);
  const resp: NewsDataResponse = await data.json();

  res.status(200).json(resp.articles);
}
