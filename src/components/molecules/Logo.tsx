import { Box, Flex, Text } from '@chakra-ui/react';

import { Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { BsBank2 } from 'react-icons/bs';

export default function Logo() {
  return (
    <Link href="/">
      <Flex fontSize="3xl" alignItems="center">
        <Box mr={2}>
          <BsBank2 />
        </Box>
        <Text fontWeight="semibold">NextGen Bank</Text>
      </Flex>
    </Link>
  );
}
