import { Box, Button, Heading, Highlight, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { auth, googleAuthProvider } from '../lib/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { UserContext } from '@lib/context'
import { useRouter } from 'next/router'
import UsernameForm from './UsernameForm'


export default function Navbar() {
  const { user, username } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const signOutNow = () => {
    signOut(auth)
    router.reload()
  }

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
      {username && (
        <>
          <Button onClick={signOutNow}>Sign Out</Button>
        </>
      )}

      {!username &&
        <Button onClick={onOpen}>Sign In</Button>}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {user ? <UsernameForm/>: <SignInButton />}
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
