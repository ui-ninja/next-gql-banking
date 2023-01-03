import { Flex, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import Routes from '../../constants/routes';
import Button from '../atoms/Button';

import Link from '../atoms/Link';

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <Flex as="nav" flexGrow={1} justifyContent="flex-end" alignItems="center">
      {session ? (
        <>
          <Link
            as={NextLink}
            href={Routes.DASHBOARD}
            variant="secondary"
            ml={3}
          >
            <Text fontSize="md">Dashboard</Text>
          </Link>
          <Link
            as={NextLink}
            href={Routes.OPEN_NEW_ACCOUNT}
            variant="secondary"
            ml={3}
          >
            <Text fontSize="md">Open new account</Text>
          </Link>
          <Button ml={3} variant="secondary" onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Link as={NextLink} href={Routes.LOGIN} variant="secondary" ml={3}>
            <Text fontSize="md">Login</Text>
          </Link>
          <Link as={NextLink} href={Routes.REGISTER} variant="secondary" ml={3}>
            <Text fontSize="md">Sign up</Text>
          </Link>
        </>
      )}
    </Flex>
  );
}
