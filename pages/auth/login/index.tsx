import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getCsrfToken, signIn } from 'next-auth/react';

import { H1 } from '../../../src/components/atoms/typography';
import Input from '../../../src/components/atoms/Input';
import Button from '../../../src/components/atoms/Button';
import PasswordInput from '../../../src/components/molecules/PasswordInput';

import loginConstants from '../../../src/constants/loginConstants';

import { LoginForm } from '../../../src/types';

import { login } from '../../../src/api';
import Routes from '../../../src/constants/routes';

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

export default function Login({
  csrfToken,
}: {
  csrfToken: string | undefined;
}) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    mode: 'onChange',

    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const status = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });

    if (status?.ok) {
      router.push(status?.url || Routes.DASHBOARD);
    } else {
      toast({
        title: 'Error occurred.',
        description: 'Username or password is wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW={'sm'} margin="0 auto">
      <H1>Log in to your account</H1>

      <Divider mt="2" mb="10" borderColor="black" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{
            required: loginConstants.EMAIL_REQUIRED,
            pattern: {
              value: loginConstants.EMAIL_REGEX,
              message: loginConstants.EMAIL_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">
                {loginConstants.EMAIL_LABEL}
              </FormLabel>
              <Input
                type="email"
                placeholder={loginConstants.EMAIL_PLACEHOLDER}
                {...field}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: loginConstants.PASSWORD_REQUIRED,
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">
                {loginConstants.PASSWORD_LABEL}
              </FormLabel>
              <PasswordInput
                {...field}
                placeholder={loginConstants.PASSWORD_PLACEHOLDER}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Button type="submit" mt="4" variant="primary" isLoading={isSubmitting}>
          Log In
        </Button>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      </form>
    </Box>
  );
}
