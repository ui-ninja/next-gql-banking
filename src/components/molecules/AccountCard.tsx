import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiCreditCard } from 'react-icons/fi';
import { Account } from '../../generated/graphql';
import { ACCOUNT_CATEGORIES, ACCOUNT_TYPE } from '../../types';
import { H2, H5 } from '../atoms/typography';

export default function AccountCard({
  type,
  category,
}: Omit<Account, 'id' | 'card' | 'user'>) {
  const isSavingsAccount = type === ACCOUNT_TYPE.SAVINGS;
  const accountType = isSavingsAccount ? 'Savings account' : 'Credit account';
  return (
    <Box
      w="325px"
      h="170px"
      borderWidth={1}
      borderColor="gray.300"
      borderRadius={12}
      py={5}
      px={8}
      mr={5}
    >
      <Flex color="brand.500" alignItems={'center'}>
        <Icon as={FiCreditCard} mr={3} fontSize="2xl" />
        <H2 m={0}>{accountType}</H2>
      </Flex>
      <H5 m={0}>{category}</H5>
      <Box mt={3}>
        {isSavingsAccount ? (
          <Text>Balance: Rs. 5,400</Text>
        ) : (
          <Text>
            Credit limit:{' '}
            {category === ACCOUNT_CATEGORIES.GOLD ? 'Rs 50,000' : 'Rs 1,50,000'}{' '}
          </Text>
        )}
      </Box>
    </Box>
  );
}
