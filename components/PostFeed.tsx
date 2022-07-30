import { Box, LinkBox, Heading, LinkOverlay, Text } from '@chakra-ui/react';

interface PostFeedProps {
  posts: any
}

interface PostItemProps {
  post: any
}

export default function PostFeed({ posts }: PostFeedProps) {
  return posts ? posts.map((post: any) => <PostItem post={post}/>): null
}

function PostItem({ post }: PostItemProps) {
  const minutesToRead = (post.word_count / 100 + 1).toFixed(0)
  
  return(
    <Box display='flex' p='2'>
      <LinkBox as='article' borderWidth='1px' rounded='md' p='3'>
        <Heading size='md' my='2'>
          <LinkOverlay href={post.web_url} isExternal>
            {post.headline.main}
          </LinkOverlay>
        </Heading>
        <Text>
          {post.word_count} words. {minutesToRead} min read
        </Text>
      </LinkBox>
   </Box>
  )
}
