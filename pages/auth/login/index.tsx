import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getCsrfToken, signIn } from 'next-auth/react';

import { LoginForm } from '../../../src/types';

import Routes from '../../../src/constants/routes';
import CommonConstants from '../../../src/constants/common';
import LoginInputForm from '../../../src/components/organisms/LoginForm';

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken: csrfToken || null },
  };
}

export default function Login({
  csrfToken,
}: {
  csrfToken: string | undefined;
}) {
  const toast = useToast();
  const router = useRouter();

  const onLogin = async (data: LoginForm) => {
    const status = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });

    if (status?.ok) {
      router.push(Routes.DASHBOARD);
    } else {
      toast({
        title: CommonConstants.ERROR_OCCURRED,
        description: CommonConstants.USERNAME_OR_PASSWORD_INVALID,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return <LoginInputForm csrfToken={csrfToken} onLogin={onLogin} />;
}
