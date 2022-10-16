// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NewsDataResponse, NewsDataResult } from "../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsDataResult[]>
) {
  const key = process.env.API_KEY;
  console.log(key);
  console.log(eval(req.body));
  const data = await fetch(
    `https://newsdata.io/api/1/news?apikey=${key}&country=gb&page=${eval(
      req.body
    )}`
  );
  const responseData: NewsDataResponse = await data.json();
  console.log(responseData);
  res.status(200).json(responseData.results);
}
