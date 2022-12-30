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
      w="425px"
      h="270px"
      textAlign="left"
      p={30}
      color="white"
      borderRadius={20}
      bgGradient="linear(to-l, #7928CA, #FF0080)"
    >
      <Box pos="absolute" right={5} top={0}>
        <Icon as={RiVisaLine} color="white" fontSize="6xl" />
      </Box>
      <Text fontSize={'3xl'} padding="90px 0 15px" textAlign="center">
        {formattedCardNumber}
      </Text>
      <Text fontSize={'md'} paddingBottom="20px" textAlign="center">
        {expiryMonth}/{expiryYear}
      </Text>
      <Text textAlign="left">{userName}</Text>
    </Box>
  );
}
