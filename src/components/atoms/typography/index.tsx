import { Text, TextProps } from "@chakra-ui/react";

type Props = TextProps;

export function H1({ children, ...props }: Props) {
  return (
    <Text
      as="h1"
      fontSize="3xl"
      my={6}
      fontWeight="semibold"
      color="brand.900"
      {...props}
    >
      {children}
    </Text>
  );
}

export function H3({ children, ...props }: Props) {
  return (
    <Text as="h3" fontSize="xl" fontWeight="semibold" my={4} {...props}>
      {children}
    </Text>
  );
}

export function H4({ children, ...props }: Props) {
  return (
    <Text as="h4" fontSize="lg" my={3} {...props}>
      {children}
    </Text>
  );
}
