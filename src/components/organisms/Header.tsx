import { Box, Container, Flex } from "@chakra-ui/react";
import Logo from "../molecules/Logo";
import NavBar from "../molecules/NavBar";

export default function Header() {
  return (
    <Box
      as="header"
      py="4"
      boxShadow="md"
      minH="77px"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Container maxW="container.xl">
        <Flex flexWrap={["wrap", "wrap", "nowrap"]}>
          <Logo />
          <NavBar />
        </Flex>
      </Container>
    </Box>
  );
}
