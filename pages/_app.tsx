import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
const styles = {
  global: {
    'body': {
      bg: '#111'
    }
  }
}

const theme = extendTheme({ styles })

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
      </Layout>
      </ChakraProvider>
    </UserContext.Provider>
    
  )
}

export default MyApp
