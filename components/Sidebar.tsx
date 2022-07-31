import { Box, Heading } from "@chakra-ui/react"

export default function Sidebar() {
  return(
    <Box
      maxW='20%'
      minH='full'
      p='5px'
      pos='absolute'
    >
      <Heading textColor='white'>
        Themes
      </Heading>
      <ul>
        <li>
          ITEM
        </li>
      </ul>

    </Box>
  )
}
