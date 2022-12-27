import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { H1 } from '../../../src/components/atoms/typography';
import Input from '../../../src/components/atoms/Input';
import Button from '../../../src/components/atoms/Button';
import Select from '../../../src/components/atoms/Select';
import PasswordInput from '../../../src/components/molecules/PasswordInput';

import registerConstants from '../../../src/constants/registerConstants';
import { addUser } from '../../../src/api';
import { AddNewUserMutation, RegisterForm } from '../../../src/types';
import { useRouter } from 'next/router';
import Routes from '../../../src/constants/routes';
import { signIn } from 'next-auth/react';

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
            title: 'Account created.',
            description: "We've created your account for you.",
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
            router.push(status?.url || Routes.DASHBOARD);
          } else {
            throw new Error('Invalid username or password');
          }
        }
      },
      onError(error) {
        toast({
          title: 'Error occurred.',
          description:
            'We are unable to create your account at the moment. Please try again after some time.',
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
      <H1>Create an account with us!</H1>

      <Divider mt="2" mb="10" borderColor="black" />

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          rules={{
            required: registerConstants.NAME_REQUIRED,
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="name">
                {registerConstants.NAME_LABEL}
              </FormLabel>
              <Input
                placeholder={registerConstants.NAME_PLACEHOLDER}
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
            required: registerConstants.EMAIL_REQUIRED,
            pattern: {
              value: registerConstants.EMAIL_REGEX,
              message: registerConstants.EMAIL_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                placeholder={registerConstants.EMAIL_PLACEHOLDER}
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
            required: registerConstants.PASSWORD_REQUIRED,
            pattern: {
              value: registerConstants.PASSWORD_REGEX,
              message: registerConstants.PASSWORD_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordInput
                {...field}
                placeholder={registerConstants.PASSWORD_PLACEHOLDER}
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
            required: registerConstants.PHONE_REQUIRED,
            minLength: {
              value: 10,
              message: registerConstants.PHONE_NOT_VALID,
            },
            maxLength: {
              value: 10,
              message: registerConstants.PHONE_NOT_VALID,
            },
            pattern: {
              value: registerConstants.PHONE_REGEX,
              message: registerConstants.PHONE_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.phone)}>
              <FormLabel htmlFor="phone">
                {registerConstants.PHONE_LABEL}
              </FormLabel>
              <Input
                type="tel"
                {...field}
                placeholder={registerConstants.PHONE_PLACEHOLDER}
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
                {registerConstants.RESIDENCE_LABEL}
              </FormLabel>
              <Textarea
                borderColor="gray.400"
                {...field}
                placeholder={registerConstants.RESIDENCE_PLACEHOLDER}
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
                {registerConstants.OCCUPATION_LABEL}
              </FormLabel>
              <Select {...field}>
                {registerConstants.OCCUPATION_OPTIONS.map((item) => (
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
            required: registerConstants.INCOME_REQUIRED,
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.income)}>
              <FormLabel htmlFor="income">
                {registerConstants.INCOME_LABEL}
              </FormLabel>
              <Select {...field}>
                {registerConstants.INCOME_OPTIONS.map((item) => (
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
            required: registerConstants.GOVTID_REQUIRED,
            minLength: {
              value: 10,
              message: registerConstants.GOVTID_NOT_VALID,
            },
            maxLength: {
              value: 10,
              message: registerConstants.GOVTID_NOT_VALID,
            },
            pattern: {
              value: registerConstants.GOVTID_REGEX,
              message: registerConstants.GOVTID_NOT_VALID,
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.govtId)}>
              <FormLabel htmlFor="govtId">
                {registerConstants.GOVTID_LABEL}
              </FormLabel>
              <Input
                {...field}
                placeholder={registerConstants.GOVTID_PLACEHOLDER}
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
          Create account
        </Button>
      </form>
    </Box>
  );
}
