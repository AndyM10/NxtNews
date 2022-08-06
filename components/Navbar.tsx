import { Box, Heading, Highlight, Text } from "@chakra-ui/react";

export default function Navbar() {
  return(
    <Box
      position='static'
      w='100%'
      pos='relative'
      p='16px'

    >
      <Heading lineHeight='tall' textColor='white' fontSize='40px'>       
        <Highlight
          query='News'
          styles={{rounded: 'full',px: '2', bg:'white'}}
        >
          NxtNews 
        </Highlight>
        <Text fontSize='20px' >
          Personalised news platform giving you the stories that matter.
        </Text>
      </Heading>
    </Box>
  )
}
