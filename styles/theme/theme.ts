import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from './ButtonStyles';
import { LinkStyles as Link } from './LinkStyles';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#e3eeff',
      100: '#b7ccfc',
      200: '#8baaf5',
      300: '#5e87ed',
      400: '#3165e7',
      500: '#184cce', // button bg or links
      600: '#103ba1',
      700: '#082a74',
      800: '#021949',
      900: '#00081e', // text
    },
    'body-background': '#ebf2fb',
  },
  components: {
    Button,
    Link,
  },
});
