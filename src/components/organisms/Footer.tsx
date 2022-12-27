import { Box, Center, Container, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" p="4" minH="77px" borderTopWidth={4} borderTopColor="#eee">
      <Container maxW="container.xl">
        <Center>
          <Text>Copyright 2022-23</Text>
        </Center>
      </Container>
    </Box>
  );
}
