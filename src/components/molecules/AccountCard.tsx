import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Routes from '../../constants/routes';
import { Account } from '../../generated/graphql';
import Illustration from '../../images/Business.svg';

import { H3 } from '../atoms/typography';
import Image from 'next/image';

export default function AccountCard({
  id,
  type,
  category,
  userName,
}: Omit<Account, 'accountNumber' | 'card' | 'user'> & { userName: string }) {
  return (
    <Link href={`${Routes.TRANSACTIONS}/${id}`}>
      <Flex
        borderRadius={16}
        boxShadow="md"
        maxW={'400px'}
        border="1px solid"
        borderColor="gray.100"
      >
        <Box
          aria-hidden
          w="30%"
          bgGradient="linear-gradient(135deg, #F395BA 0%, #FED182 100%)"
          as={Flex}
          justifyContent="center"
          borderRadius={'16px 0 0 16px'}
        >
          <Image
            width={70}
            height={70}
            src={Illustration}
            alt="icon for account"
          />
        </Box>
        <Box flexGrow={1} p={5}>
          <Flex justifyContent="space-between" mb={5} color="gray.500">
            <Text fontWeight="semibold">{type}</Text>
            <Text>{category}</Text>
          </Flex>
          <Box>
            <H3 textTransform={'capitalize'}>{userName}</H3>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}
