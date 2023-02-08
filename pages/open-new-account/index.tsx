import { dehydrate, useMutation } from 'react-query';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { Text, useToast } from '@chakra-ui/react';

import { addAccount, getUser, queryClient } from '../../src/api';
import { authOptions } from '../api/auth/[...nextauth]';

import Routes from '../../src/constants/routes';
import { NewAccountForm } from '../../src/types';

import OpenNewAccountForm from '../../src/components/organisms/OpenNewAccountForm';
import useUser from '../../src/hooks/useUser';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get user id from session
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const emailAddress = session?.user.email;

  if (emailAddress) {
    await queryClient.prefetchQuery('user', () => getUser({ emailAddress }));
  }

  return {
    props: {
      emailAddress: emailAddress || null,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function OpenNewAccount({
  emailAddress,
}: {
  emailAddress: string;
}) {
  const { data, isFetching, isError } = useUser(emailAddress);

  const toast = useToast();
  const router = useRouter();

  const createAccount = useMutation(
    (data: NewAccountForm) =>
      addAccount({
        newAccountData: data,
      }),
    {
      onSuccess: async (res) => {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push(Routes.DASHBOARD);
      },
      onError(error) {
        toast({
          title: 'Error occurred.',
          description:
            'We are unable to create your account at the moment. Please try again after some time.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleAccountCreation = (data: NewAccountForm) => {
    return createAccount.mutate(data);
  };

  if (isError) {
    return <Text>Failed to load user data.</Text>;
  }

  if (isFetching) {
    return <Text>Loading form...</Text>;
  }

  if (data) {
    return (
      <OpenNewAccountForm data={data} onCreateAccount={handleAccountCreation} />
    );
  }

  return null;
}
