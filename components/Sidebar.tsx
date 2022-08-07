import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { NewsDataResult } from "../types/types"

interface SidebarProps {
  posts: NewsDataResult[]
}

export default function Sidebar({ posts }: SidebarProps) {

  const [themes, setThemes] = useState(new Set<string>())
  
  useEffect(() => {
    setThemes(getThemes(posts))
  }, [setThemes])

  return(
    <Box
      w='20%'
      minH='full'
      p='5px'
    >
      <Heading textColor='white'>
        Themes
      </Heading>
      <UnorderedList listStyleType='none'>
        {
          [...themes].map((value) => 
            <ListItem>{value}</ListItem>
          )
        }
      </UnorderedList>
    </Box>
  )
}

function getThemes(posts: any): Set<string> {

  let themes = new Set<string>()
  
  posts ? posts.map((post: NewsDataResult) => {
    post.keywords ? 
      themes.add(post.keywords[Math.floor(Math.random() * post.keywords.length)]) :
      null
  }) : null
 
 return themes

}
