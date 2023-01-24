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

import { H1 } from '../../../src/components/atoms/typography';
import Input from '../../../src/components/atoms/Input';
import Button from '../../../src/components/atoms/Button';
import PasswordInput from '../../../src/components/molecules/PasswordInput';

import { LoginForm } from '../../../src/types';

import LoginConstants from '../../../src/constants/loginConstants';
import CommonConstants from '../../../src/constants/common';

export default function LoginInputForm({
  csrfToken,
  onLogin,
}: {
  csrfToken: string | undefined;
  onLogin: (data: LoginForm) => void;
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
    await onLogin(data);
  };

  return (
    <Box maxW={'sm'} margin="0 auto">
      <H1>{LoginConstants.LOGIN_PAGE_HEADING}</H1>

      <Divider mt="2" mb="10" borderColor="black" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{
            required: LoginConstants.EMAIL_REQUIRED,
            pattern: {
              value: LoginConstants.EMAIL_REGEX,
              message: LoginConstants.EMAIL_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">
                {LoginConstants.EMAIL_LABEL}
              </FormLabel>
              <Input
                {...field}
                type="email"
                placeholder={LoginConstants.EMAIL_PLACEHOLDER}
                id="email"
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
            required: LoginConstants.PASSWORD_REQUIRED,
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">
                {LoginConstants.PASSWORD_LABEL}
              </FormLabel>
              <PasswordInput
                {...field}
                id="password"
                placeholder={LoginConstants.PASSWORD_PLACEHOLDER}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Button type="submit" mt="4" variant="primary" isLoading={isSubmitting}>
          {CommonConstants.LOGIN}
        </Button>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      </form>
    </Box>
  );
}
