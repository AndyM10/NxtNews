import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import Sidebar from '../components/Sidebar'
import PostFeed from '../components/PostFeed'
import { Flex } from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async () => {
  const key = process.env.API_KEY
  const data = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=0&q=election&api-key=${key}`)
  const responseData = await data.json()

  return {
    props: { responseData },
  }
}

const Home: NextPage = (props:any) => {
  return (
   <Flex w='100%'>
    <Sidebar posts={props.responseData.response.docs}/>
    <PostFeed posts={props.responseData.response.docs}/>
   </Flex>
  )
}

export default Home
