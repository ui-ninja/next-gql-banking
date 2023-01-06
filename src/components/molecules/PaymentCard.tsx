import { Box, Icon, Text } from '@chakra-ui/react';
import { RiVisaLine } from 'react-icons/ri';
import { Card } from '../../generated/graphql';
import { formatCardNumber } from '../../utils';

export default function PaymentCard({
  cardNumber,
  expiryMonth,
  expiryYear,
  userName,
}: Card & { userName: string }) {
  const formattedCardNumber = formatCardNumber(cardNumber);
  return (
    <Box
      pos="relative"
      w={['315px', '315px', '385px']}
      h={['180px', '180px', '230px']}
      textAlign="left"
      p={15}
      color="white"
      borderRadius={20}
      bgGradient="linear(to-l, #7928CA, #FF0080)"
    >
      <Box pos="absolute" right={5} top={0}>
        <Icon as={RiVisaLine} color="white" fontSize={['4xl', '4xl', '6xl']} />
      </Box>
      <Text
        fontSize={['2xl', '2xl', '3xl']}
        padding={['40px 0 15px', '40px 0 15px', '60px 0 15px']}
        textAlign="center"
      >
        {formattedCardNumber}
      </Text>
      <Text fontSize={'md'} paddingBottom="20px" textAlign="center">
        {expiryMonth}/{expiryYear}
      </Text>
      <Text pos="absolute" left={'20px'} bottom={'20px'}>
        {userName}
      </Text>
    </Box>
  );
}
