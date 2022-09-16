import { ComponentStyleConfig, type ThemeConfig, extendTheme } from '@chakra-ui/react'
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: mode('#FFF', '#000')(props),
      color: mode('#000', '#FFF')(props)
    }
  })
}


const components = {
  Modal: {
    baseStyle: {
      dialog: {
        bg: '#FFF',
        _dark: {
          bg: '#121212'
        }
      }
    }
  }
}

const theme = extendTheme({ styles,
  config,
  components })

export default theme
