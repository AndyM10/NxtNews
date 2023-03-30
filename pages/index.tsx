import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import Sidebar from "../components/Sidebar";
import PostFeed from "../components/PostFeed";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { getNews, getSources } from "@lib/NewsApi";

export const getServerSideProps: GetServerSideProps = async () => {
  const sources = await getSources()
  const news = await getNews(sources);
  return {
    props: { news, sources },
  };
};

const Home: NextPage = ({
  news,
  sources
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>NxtNews</title>
    </Head>
    <Flex h="full" w="100%">
      <Sidebar postsList={news} />
      <PostFeed postsList={news} sources={sources} />
    </Flex>
  </>
);

export default Home;
