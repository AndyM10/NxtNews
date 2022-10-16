import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NewsDataResult } from "../types/types";

interface SidebarProps {
  postsList: NewsDataResult[];
}

export default function Sidebar({ postsList }: SidebarProps) {
  const [themes, setThemes] = useState(new Set<string>());

  useEffect(() => {
    setThemes(getThemes(postsList));
  }, [setThemes]);

  return (
    <Box minH="full" p="5px" w="20%">
      <Heading>Themes</Heading>
      <UnorderedList listStyleType="none" ml="0">
        {[...themes].map((value) => (
          <ListItem
            w="fit-content"
            rounded="md"
            p="2"
            m="2"
            background="whiteAlpha.200"
          >
            {value}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

function getThemes(posts: any): Set<string> {
  const themes = new Set<string>();

  posts
    ? posts.map((post: NewsDataResult) => {
        post.keywords
          ? themes.add(
              post.keywords[Math.floor(Math.random() * post.keywords.length)]
            )
          : null;
      })
    : null;

  return themes;
}
