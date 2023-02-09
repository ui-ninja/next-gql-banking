import { ComponentStyleConfig } from '@chakra-ui/react';

const disabledStyles = {
  backgroundColor: 'gray.100',
  borderColor: 'gray.100',
  color: 'gray.500',
};

export const ButtonStyles: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    padding: '12px 30px',
    borderRadius: '48px',
    borderWidth: '1px',
    _hover: {},
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: () => ({
      bg: 'brand.500',
      color: 'white',
      borderColor: 'brand.500',
      _hover: {
        bg: 'brand.900',
        borderColor: 'brand.900',
        boxShadow: 'md',
        _disabled: {
          ...disabledStyles,
        },
      },
      _disabled: {
        ...disabledStyles,
      },
    }),

    secondary: () => ({
      bg: 'white',
      color: 'brand.500',
      borderColor: 'brand.500',

      _hover: {
        color: 'brand.900',
        borderColor: 'brand.900',
        boxShadow: 'md',
      },
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
};
