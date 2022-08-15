import { Box, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { NewsDataResult } from '../types/types'

interface PostFeedProps {
  posts: NewsDataResult[]
}

interface PostItemProps {
  post: NewsDataResult
}

export default function PostFeed({ posts }: PostFeedProps) {
  return (
    <Flex flexDir="row" flexWrap="wrap" w="80%">
      {posts
        ? posts.map((post: any) => <PostItem post={post} />)
        : null}
    </Flex>
  )
}

function PostItem({ post }: PostItemProps) {

  return (
    <Box p="2">
      <LinkBox
        as="article"
        borderWidth="1px"
        p="3"
        rounded="md"
      >
        <Heading my="2" size="md">
          <LinkOverlay href={post.link} isExternal>
            {post.title}
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </Box>
  )
}
