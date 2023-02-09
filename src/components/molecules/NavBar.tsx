import { Flex, Icon, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MdLogout } from 'react-icons/md';

import CommonConstants from '../../constants/CommonConstants';
import Routes from '../../constants/Routes';

import Button from '../atoms/Button';
import Link from '../atoms/Link';

export default function NavBar() {
  const { data: session } = useSession();
  const { pathname: routerPathname } = useRouter();

  return (
    <Flex
      as="nav"
      flexGrow={1}
      alignItems="center"
      mt={[5, 5, 0]}
      justifyContent={['center', 'center', 'flex-end']}
    >
      {session ? (
        <>
          <Link
            as={NextLink}
            href={Routes.DASHBOARD}
            variant="secondary"
            ml={3}
            isActive={routerPathname === Routes.DASHBOARD}
          >
            <Text fontSize="md">{CommonConstants.DASHBOARD}</Text>
          </Link>
          <Link
            as={NextLink}
            href={Routes.OPEN_NEW_ACCOUNT}
            variant="secondary"
            ml={3}
            isActive={routerPathname === Routes.OPEN_NEW_ACCOUNT}
          >
            <Text fontSize="md">{CommonConstants.OPEN_NEW_ACCOUNT}</Text>
          </Link>
          <Button
            ml={3}
            variant="secondary"
            onClick={() => signOut()}
            title="Sign out"
          >
            <Icon as={MdLogout} />
          </Button>
        </>
      ) : (
        <>
          <Link
            as={NextLink}
            href={Routes.LOGIN}
            variant="secondary"
            ml={3}
            isActive={routerPathname === Routes.LOGIN}
          >
            <Text fontSize="md">{CommonConstants.LOGIN}</Text>
          </Link>
          <Link
            as={NextLink}
            href={Routes.REGISTER}
            variant="secondary"
            ml={3}
            isActive={routerPathname === Routes.REGISTER}
          >
            <Text fontSize="md">{CommonConstants.SIGNUP}</Text>
          </Link>
        </>
      )}
    </Flex>
  );
}
