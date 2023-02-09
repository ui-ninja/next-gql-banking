import { Box, Flex, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { BsBank2 } from 'react-icons/bs';
import CommonConstants from '../../constants/CommonConstants';

export default function Logo() {
  return (
    <Flex
      as={Link}
      href="/"
      fontSize="3xl"
      alignItems="center"
      flexGrow={[1, 1, 'initial']}
      justifyContent={['center', 'center', 'initial']}
    >
      <Box mr={2}>
        <BsBank2 />
      </Box>
      <Text fontWeight="semibold">{CommonConstants.LOGO}</Text>
    </Flex>
  );
}
