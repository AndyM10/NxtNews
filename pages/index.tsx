import type { NextPage } from 'next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Sidebar from '../components/Sidebar'
import PostFeed from '../components/PostFeed'
import { Flex } from '@chakra-ui/react'
import { NewsDataResponse } from '../types/types'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async () => {
  const key = process.env.API_KEY
  const data = await fetch(`https://newsdata.io/api/1/news?apikey=${key}&country=gb&page=3`)
  const responseData: NewsDataResponse = await data.json()

  console.log(responseData)

  return {
    props: { responseData }
  }
}

const Home: NextPage = ({ responseData }: InferGetServerSidePropsType<typeof getServerSideProps>) => <>
    <Head>
      <title>NxtNews</title>
    </Head>
    <Flex h="full" w="100%">
      <Sidebar posts={responseData.results} />
      <PostFeed posts={responseData.results} />
    </Flex>
   </>


export default Home
