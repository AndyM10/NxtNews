import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Article } from "../types/types";

interface SidebarProps {
  postsList: Array<Article>;
}

export default function Sidebar({ postsList }: SidebarProps) {
  const [themes, setThemes] = useState(new Set<string>());

  setThemes(getThemes(postsList));

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

function getThemes(posts: Array<Article>): Set<string> {
  const themes = new Set<string>();
  console.log(posts);

  posts
    ? posts.map((post: Article) => {
        const words = post.title.split(" ");
        themes.add(words[Math.floor(Math.random() * words.length)]);
      })
    : null;

  return themes;
}
