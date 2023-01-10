import { Box, Flex, Icon, Text } from '@chakra-ui/react';
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
      textAlign="left"
      maxW="375px"
      minH="200px"
      p={15}
      color="white"
      borderRadius={20}
      backgroundColor="#633EF8"
      overflow={'hidden'}
      _before={{
        display: 'block',
        content: '""',
        backgroundColor: '#8567FF',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        top: '-20%',
      }}
      _after={{
        display: 'block',
        content: '""',
        backgroundColor: '#7856FF',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        position: 'absolute',
        left: '54%',
        top: '30%',
      }}
    >
      <Flex
        pos="relative"
        zIndex={10}
        height="100%;"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box pos="absolute" right={0} top={'-20px'}>
          <Icon
            as={RiVisaLine}
            color="white"
            fontSize={['4xl', '4xl', '6xl']}
          />
        </Box>
        <Text fontSize={['2xl', '2xl', '3xl']} textAlign="center">
          {formattedCardNumber}
        </Text>
        <Text fontSize={'md'} textAlign="center">
          {expiryMonth}/{expiryYear}
        </Text>
        <Text pos="absolute" left={'10px'} bottom={'10px'}>
          {userName}
        </Text>
      </Flex>
    </Box>
  );
}
