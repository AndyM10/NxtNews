// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NewsDataResponse, Article } from "../../types/types";
import ErrorMessage from "@lib/utils/ErrorMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Article> | string>
) {
  const key = process.env.API_KEY;
  const query = "";
  const sources = "google-news-uk";
  const page = eval(req.body);
  console.log(page);
  const url = `https://newsapi.org/v2/everything?q=${query}&sources=${sources}&apiKey=${key}&page=${page}&language=en`;

  try {
    const data = await fetch(url);
    const resp: NewsDataResponse = await data.json();
    console.log(resp);
    console.log(url);
    console.log(resp.articles);
    res.status(200).json(resp.articles);
  } catch (err) {
    const error = ErrorMessage(err);
    res.status(500).send(error!);
  }
}
