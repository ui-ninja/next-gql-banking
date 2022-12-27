import { Text } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement } from 'react';

type Props = {
  children: string | ReactElement<any, string | JSXElementConstructor<any>>;
};

export function H1({ children }: Props) {
  return (
    <Text as="h1" fontSize="3xl" my={6} fontWeight="semibold">
      {children}
    </Text>
  );
}

export function H2({ children }: Props) {
  return (
    <Text as="h2" fontSize="2xl" my={5}>
      {children}
    </Text>
  );
}

export function H3({ children }: Props) {
  return (
    <Text as="h3" fontSize="xl" my={4}>
      {children}
    </Text>
  );
}

export function H4({ children }: Props) {
  return (
    <Text as="h4" fontSize="lg" my={3}>
      {children}
    </Text>
  );
}

export function H5({ children }: Props) {
  return (
    <Text as="h5" fontSize="md" my={2}>
      {children}
    </Text>
  );
}

export function H6({ children }: Props) {
  return (
    <Text as="h6" fontSize="sm" my={1}>
      {children}
    </Text>
  );
}
