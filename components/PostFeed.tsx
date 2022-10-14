import {
  Box,
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { NewsDataResult, NewsDataResponse } from "../types/types";
import { useState, useEffect } from "react";
import { useGetFetchPosts } from "@lib/hooks";

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
  const increaseCursor = async () => {
    setPostsCursor(postCursor + 1);
    const data = await useGetFetchPosts(postCursor);

    setPosts(posts.concat(data!));
  };

  return (
    <Flex flexDir="row" flexWrap="wrap" w="80%">
      {posts ? posts.map((post: any) => <PostItem post={post} />) : null}
      <Button onClick={increaseCursor}>Load More Articles</Button>
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
