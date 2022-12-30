import { Box, Container, Flex } from '@chakra-ui/react';
import Logo from '../molecules/Logo';
import NavBar from '../molecules/NavBar';

export default function Header() {
  return (
    <Box
      as="header"
      p="4"
      boxShadow="md"
      minH="77px"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Container maxW="container.xl">
        <Flex>
          <Logo />
          <NavBar />
        </Flex>
      </Container>
    </Box>
  );
}
