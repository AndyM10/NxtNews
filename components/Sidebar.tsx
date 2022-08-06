import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { NewsDataResult } from "../types/types"

interface SidebarProps {
  posts: NewsDataResult[]
}

export default function Sidebar({ posts }: SidebarProps) {

  const [themes, setThemes] = useState([])
  
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
        {themes ? themes.map((theme: any) => <ListItem >{theme}</ListItem>): null}
      </UnorderedList>
    </Box>
  )
}

function getThemes(posts: any): [] {

  const themes = posts ? posts.map((post: any) => {
    let arr =[]
    post.keywords ? 
      arr.push(post.keywords[Math.floor(Math.random() * post.keywords.length)]) :
      null
    return arr
  }): null

  console.log(themes)
  return themes

}

