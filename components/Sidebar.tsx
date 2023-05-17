import { Box, Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Article } from '../types/types'

interface SidebarProps {
  postsList: Array<Article>;
}

export default function Sidebar({ postsList }: SidebarProps) {
  const [
    themes,
    setThemes
  ] = useState(new Set<string>())

  useEffect(() => {
    setThemes(getThemes(postsList))
  }, [])

  return (
    <Box minH="full" p="5px" w="20%">
      <Heading>Themes</Heading>
      <Flex flexDir="row" flexWrap="wrap">
        {[...themes].map((value) => <Box
            background="whiteAlpha.200"
            m="2"
            p="2"
            rounded="md"
            w="fit-content"
          >
            {value}
           </Box>)}
      </Flex>
    </Box>
  )
}

function getThemes(posts: Array<Article>): Set<string> {
  const themes = new Set<string>()

  posts
    ? posts.map((post: Article) => {
      const words = post.title.split(' ')

      themes.add(words[Math.floor(Math.random() * words.length)])
    })
    : null

  return themes
}
