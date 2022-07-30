import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import PostFeed from '../components/PostFeed'

export const getServerSideProps: GetServerSideProps = async () => {
  const key = process.env.API_KEY
  const data = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=0&q=election&api-key=${key}`)
  const responseData = await data.json()

  return {
    props: { responseData },
  }
}

const Home: NextPage = (props) => {
  return (
    <PostFeed posts={props.responseData.response.docs} />
  )
}

export default Home
