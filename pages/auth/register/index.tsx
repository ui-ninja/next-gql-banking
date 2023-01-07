import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useMutation } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import { addUser } from '../../../src/api';

import { H1 } from '../../../src/components/atoms/typography';
import Input from '../../../src/components/atoms/Input';
import Button from '../../../src/components/atoms/Button';
import Select from '../../../src/components/atoms/Select';
import PasswordInput from '../../../src/components/molecules/PasswordInput';

import RegisterConstants from '../../../src/constants/registerConstants';
import Routes from '../../../src/constants/routes';
import CommonConstants from '../../../src/constants/common';

import { AddNewUserMutation, RegisterForm } from '../../../src/types';
import { isExistingEmailUsed } from '../../../src/utils';

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      residence: '',
      occupation: '',
      income: '',
      govtId: '',
    },
  });

  const toast = useToast();
  const router = useRouter();

  const createUser = useMutation(
    (data: AddNewUserMutation) =>
      addUser({
        newUserData: data,
      }),
    {
      onSuccess: async (res, variables) => {
        const { id } = res.addUser;
        const { email, password } = variables;
        if (id) {
          toast({
            title: CommonConstants.ACCOUNT_CREATED,
            description: CommonConstants.REDIRECT_TO_DASHBOARD,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          // sign in user with nextAuth
          const status = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/',
          });

          if (status?.ok) {
            router.push(Routes.DASHBOARD);
          } else {
            throw new Error(CommonConstants.SIGNUP_FAILED);
          }
        }
      },
      onError(error) {
        // check if error is due to existing email address in system
        toast({
          title: CommonConstants.ERROR_OCCURRED,
          description: isExistingEmailUsed(error)
            ? CommonConstants.EMAIL_ALREADY_IN_USE
            : CommonConstants.SIGNUP_FAILED,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const onFormSubmit = (data: RegisterForm) => {
    const submittableData = {
      ...data,
      phone: +data.phone,
      income: +data.income,
    };
    return createUser.mutate(submittableData);
  };

  return (
    <Box maxW={'sm'} margin="0 auto">
      <H1>{RegisterConstants.PAGE_HEADING}</H1>

      <Divider mt="2" mb="10" borderColor="black" />

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          rules={{
            required: RegisterConstants.NAME_REQUIRED,
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="name">
                {RegisterConstants.NAME_LABEL}
              </FormLabel>
              <Input
                placeholder={RegisterConstants.NAME_PLACEHOLDER}
                {...field}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: RegisterConstants.EMAIL_REQUIRED,
            pattern: {
              value: RegisterConstants.EMAIL_REGEX,
              message: RegisterConstants.EMAIL_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                placeholder={RegisterConstants.EMAIL_PLACEHOLDER}
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
            required: RegisterConstants.PASSWORD_REQUIRED,
            pattern: {
              value: RegisterConstants.PASSWORD_REGEX,
              message: RegisterConstants.PASSWORD_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordInput
                {...field}
                placeholder={RegisterConstants.PASSWORD_PLACEHOLDER}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{
            required: RegisterConstants.PHONE_REQUIRED,
            minLength: {
              value: 10,
              message: RegisterConstants.PHONE_NOT_VALID,
            },
            maxLength: {
              value: 10,
              message: RegisterConstants.PHONE_NOT_VALID,
            },
            pattern: {
              value: RegisterConstants.PHONE_REGEX,
              message: RegisterConstants.PHONE_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.phone)}>
              <FormLabel htmlFor="phone">
                {RegisterConstants.PHONE_LABEL}
              </FormLabel>
              <Input
                type="tel"
                {...field}
                placeholder={RegisterConstants.PHONE_PLACEHOLDER}
              />
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="residence"
          control={control}
          render={({ field }) => (
            <FormControl mt="4">
              <FormLabel htmlFor="residence">
                {RegisterConstants.RESIDENCE_LABEL}
              </FormLabel>
              <Textarea
                borderColor="brand.900"
                {...field}
                placeholder={RegisterConstants.RESIDENCE_PLACEHOLDER}
              />
            </FormControl>
          )}
        />

        <Controller
          name="occupation"
          control={control}
          render={({ field }) => (
            <FormControl mt="4">
              <FormLabel htmlFor="occupation">
                {RegisterConstants.OCCUPATION_LABEL}
              </FormLabel>
              <Select {...field}>
                {RegisterConstants.OCCUPATION_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="income"
          control={control}
          rules={{
            required: RegisterConstants.INCOME_REQUIRED,
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.income)}>
              <FormLabel htmlFor="income">
                {RegisterConstants.INCOME_LABEL}
              </FormLabel>
              <Select {...field}>
                {RegisterConstants.INCOME_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.income && errors.income.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="govtId"
          control={control}
          rules={{
            required: RegisterConstants.GOVTID_REQUIRED,
            minLength: {
              value: 10,
              message: RegisterConstants.GOVTID_NOT_VALID,
            },
            maxLength: {
              value: 10,
              message: RegisterConstants.GOVTID_NOT_VALID,
            },
            pattern: {
              value: RegisterConstants.GOVTID_REGEX,
              message: RegisterConstants.GOVTID_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.govtId)}>
              <FormLabel htmlFor="govtId">
                {RegisterConstants.GOVTID_LABEL}
              </FormLabel>
              <Input
                {...field}
                placeholder={RegisterConstants.GOVTID_PLACEHOLDER}
              />
              <FormErrorMessage>
                {errors.govtId && errors.govtId.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          mt="10"
          variant="primary"
          isLoading={isSubmitting}
        >
          {CommonConstants.SIGNUP}
        </Button>
      </form>
    </Box>
  );
}
