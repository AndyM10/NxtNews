import {
  Box,
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { NewsDataResult } from "../types/types";
import { useState } from "react";
import Loader from "../components/Loader";

interface PostFeedProps {
  postsList: NewsDataResult[];
  postStart: number;
}

interface PostItemProps {
  post: NewsDataResult;
}

export default function PostFeed({ postsList, postStart }: PostFeedProps) {
  const [posts, setPosts] = useState(postsList);
  const [postCursor, setPostsCursor] = useState(postStart);
  const [loading, setLoading] = useState(false);

  const increaseCursor = async () => {
    setLoading(true);
    setPostsCursor(postCursor + 1);
    const data = await fetch("/api/getMorePosts", {
      body: `{cursor: ${postCursor}}`,
      method: "POST",
    }).then((res) => res.json());

    setPosts(posts.concat(data));
    setLoading(false);
  };

  return (
    <Flex flexDir="column" flexWrap="wrap" w="80%">
      <Flex flexDir="row" flexWrap="wrap">
        {posts ? posts.map((post: any) => <PostItem post={post} />) : null}
      </Flex>
      {!loading && <Button onClick={increaseCursor}>Load More Articles</Button>}
      <Loader show={loading} />
    </Flex>
  );
}

function PostItem({ post }: PostItemProps) {
  return (
    <Box p="2">
      <LinkBox as="article" borderWidth="1px" p="3" rounded="md">
        <Heading my="2" size="md">
          <LinkOverlay href={post.link} isExternal>
            {post.title}
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </Box>
  );
}
