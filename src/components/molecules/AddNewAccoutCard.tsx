import { Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Routes from '../../constants/routes';

export default function AddNewAccount() {
  return (
    <Link href={Routes.OPEN_NEW_ACCOUNT}>
      <Flex
        w="290px"
        h="150px"
        borderWidth={1}
        borderColor="gray.300"
        borderRadius={12}
        py={5}
        px={8}
        mr={5}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={BsFillPlusCircleFill} fontSize="3xl" />
        <Text fontSize="2xl">Open new account</Text>
      </Flex>
    </Link>
  );
}
