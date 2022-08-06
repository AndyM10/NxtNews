import { Box, LinkBox, Heading, LinkOverlay, Flex } from '@chakra-ui/react';
import { NewsDataResult } from '../types/types';

interface PostFeedProps {
  posts: NewsDataResult[]
}

interface PostItemProps {
  post: NewsDataResult
}

export default function PostFeed({ posts }: PostFeedProps) {
  return (
    <Flex flexDir='row' w='80%' flexWrap='wrap'>
      {posts ? posts.map((post: any) => <PostItem post={post}/>): null}
    </Flex>
  )
}

function PostItem({ post }: PostItemProps) {
  
  return(
    <Box p='2'>
      <LinkBox as='article' borderWidth='1px' rounded='md' p='3'>
        <Heading size='md' my='2'>
          <LinkOverlay href={post.link} isExternal>
            {post.title}
          </LinkOverlay>
        </Heading>
      </LinkBox>
   </Box>
  )
}
