import { Box, Button, Heading, Highlight, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, useColorMode } from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'
import { auth, googleAuthProvider } from '../lib/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { UserContext } from '@lib/context'
import { useRouter } from 'next/router'
import UsernameForm from './UsernameForm'
import { useColorModeValue } from '@chakra-ui/react'

export default function Navbar() {
  const { user, username } = useContext(UserContext)
  const { toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const highlightBG = useColorModeValue('#000', '#FFF')
  const highlighTxt = useColorModeValue('#FFF','#000')
  const router = useRouter()

  const signOutNow = () => {
    signOut(auth)
    router.reload()
  }

  return (
    <Box
      display="flex"
      p="16px"
      pos="relative"
      position="static"
      w="100%"
    >
      <Heading fontSize="40px" lineHeight="tall">
        <Highlight
          query="News"
          styles={{ 
            rounded: 'full',
            px: '2',
            color: highlighTxt,
            bg: highlightBG}}
        >
          NxtNews
        </Highlight>
        <Text fontSize="20px" >
          Personalised news platform giving you the stories that matter.
        </Text>
      </Heading>
      <Button onClick={toggleColorMode} marginLeft='auto'>
        <SunIcon/>
      </Button>
      {username && (
        <>
          <Button onClick={signOutNow}>Sign Out</Button>
        </>
      )}

      {!username &&
        <Button ml='5' onClick={onOpen}>Sign In</Button>}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {user ? <UsernameForm/> : <SignInButton />}
            </ModalBody>
          </ModalContent>
        </Modal>
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
