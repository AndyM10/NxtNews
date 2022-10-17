import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import Sidebar from "../components/Sidebar";
import PostFeed from "../components/PostFeed";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { getNews } from "@lib/NewsApi";

export const getServerSideProps: GetServerSideProps = async () => {
  const news = await getNews();
  return {
    props: { news },
  };
};

const Home: NextPage = ({
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>NxtNews</title>
    </Head>
    <Flex h="full" w="100%">
      <Sidebar postsList={news} />
      <PostFeed postsList={news} />
    </Flex>
  </>
);

export default Home;
