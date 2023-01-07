import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

export default function Link({
  children,
  isActive,
  ...rest
}: LinkProps & { isActive?: boolean }) {
  return (
    <ChakraLink {...rest} textDecoration={isActive ? 'underline' : ''}>
      {children}
    </ChakraLink>
  );
}
