import React from 'react';
import { Box, Container } from '@chakra-ui/react';

export default function Main({ children }: { children: React.ReactElement }) {
  return (
    <Box
      bgColor="body-background"
      as="main"
      minH={'calc(100vh - 154px)'}
      p="4"
      pb={14}
    >
      <Container maxW="container.xl">{children}</Container>
    </Box>
  );
}
