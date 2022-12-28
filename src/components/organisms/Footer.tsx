import { Box, Center, Container, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      bgColor="brand.900"
      as="footer"
      p="4"
      minH="77px"
      borderTopWidth={4}
      borderTopColor="#eee"
    >
      <Container maxW="container.xl">
        <Center>
          <Text color="white">Copyright 2022-23</Text>
        </Center>
      </Container>
    </Box>
  );
}
