import { ComponentStyleConfig } from '@chakra-ui/react';

export const LinkStyles: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    color: 'brand.500',
    _hover: {
      textDecoration: 'underline',
    },
    _focus: {
      textDecoration: 'underline',
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: () => ({
      color: 'brand.500',
    }),

    secondary: () => ({
      color: 'brand.900',
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
};
