import { ComponentStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools'

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
  Modal: (props: ComponentStyleConfig) => ({
    baseStyle: {
      dialog: {
        bg: mode('#000','#FFF')(props)
      }
    }
  })
}

const theme = extendTheme({styles, config, components})
export default theme
