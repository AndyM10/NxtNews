import { Box, Button, Heading, Highlight, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { auth, googleAuthProvider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'

export default function Navbar() {

  /*
   * 1. User is signed out show Signbutton
   * 2. user signed in, but missing username show username form
   * 3. user is signed in, has username show sign button
   */

  const user = null
  const username = null
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p="16px"
      pos="relative"
      position="static"
      w="100%"
    >
      <Heading fontSize="40px" lineHeight="tall" textColor="white">
        <Highlight
          query="News"
          styles={{ rounded: 'full',
            px: '2',
            bg: 'white' }}
        >
          NxtNews
        </Highlight>
        <Text fontSize="20px" >
          Personalised news platform giving you the stories that matter.
        </Text>
      </Heading>

      {!username &&
        <>
          <Button onClick={onOpen}>Sign In</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Sign In</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SignInButton />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>}
    </Box>
  )
}

function SignInButton(): JSX.Element {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }

  return (
    <Button onClick={signInWithGoogle}>
      Google
    </Button>
  )
}
