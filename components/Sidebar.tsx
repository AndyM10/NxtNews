import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface SidebarProps {
  posts: any
}

export default function Sidebar({ posts }: SidebarProps) {

  const [themes, setThemes] = useState([])
  
  useEffect(() => {
    setThemes(getThemes(posts))
  }, [setThemes])

  return(
    <Box
      maxW='20%'
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
    const i = Math.floor(Math.random() * post.keywords.length)
    arr.push(post.keywords[i]['value'])
    return arr
  }): null

  console.log(themes)
  return themes

}
