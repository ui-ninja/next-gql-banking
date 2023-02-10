import { Box, Center, Container, Text } from "@chakra-ui/react";

const fullyear = new Date().getFullYear();

export default function Footer() {
  return (
    <Box
      bgColor="brand.900"
      as="footer"
      py="4"
      minH="77px"
      borderTopWidth={4}
      borderTopColor="#eee"
    >
      <Container maxW="container.xl">
        <Center>
          <Text color="white">Copyright &copy;{fullyear}</Text>
        </Center>
      </Container>
    </Box>
  );
}
