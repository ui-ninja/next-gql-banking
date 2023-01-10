import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Routes from '../../constants/routes';
import Button from '../atoms/Button';

export default function AddNewAccount() {
  return (
    <Button variant="secondary" borderRadius={0}>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        <Icon as={BsFillPlusCircleFill} fontSize="3xl" aria-hidden />
        <Text mt={2} fontSize="2xl">
          Open new account
        </Text>
      </Flex>
    </Button>
  );
}
