import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

export default function Link({ children, ...rest }: LinkProps) {
  return <ChakraLink {...rest}>{children}</ChakraLink>;
}
