import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { dehydrate, useQuery } from 'react-query';
import { getUser, queryClient } from '../../src/api';
import Button from '../../src/components/atoms/Button';
import Input from '../../src/components/atoms/Input';
import Select from '../../src/components/atoms/Select';
import { H1 } from '../../src/components/atoms/typography';
import {
  ACCOUNT_CATEGORIES,
  ACCOUNT_TYPE,
  NewAccountForm,
} from '../../src/types';
import { authOptions } from '../api/auth/[...nextauth]';

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
  const { data, isFetching, isError } = useQuery(['dogs'], () =>
    getUser({ emailAddress })
  );
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<NewAccountForm>({
    mode: 'onChange',
    defaultValues: {
      type: ACCOUNT_TYPE.SAVINGS,
      category: undefined,
    },
  });

  // get value of type from watch
  const accountTypeWatch = watch('type');
  const isCreditCardSelected = accountTypeWatch === ACCOUNT_TYPE.CREDIT_CARD;

  useEffect(() => {
    return setValue('category', '');
  }, [accountTypeWatch, setValue]);

  const onSubmit = (data: NewAccountForm) => {
    console.log('data', data);
  };

  if (isError) {
    return <Text>Failed to load user data.</Text>;
  }

  if (isFetching) {
    return <Text>Loading form...</Text>;
  }

  return (
    <Box maxW="50%" marginX="auto">
      <H1>Open new account</H1>
      <Divider mt="2" mb="10" borderColor="black" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl mt="4">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            variant="filled"
            isReadOnly
            aria-readonly="true"
            value={data?.user.name}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            variant="filled"
            isReadOnly
            aria-readonly="true"
            value={data?.user.email}
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            variant="filled"
            isReadOnly
            aria-readonly="true"
            value={data?.user.phone}
          />
        </FormControl>

        <Controller
          name="type"
          control={control}
          rules={{
            required: 'You must select an account type',
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.type)}>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select {...field}>
                <option value={ACCOUNT_TYPE.SAVINGS}>Savings</option>
                <option value={ACCOUNT_TYPE.CREDIT_CARD}>Credit card</option>
              </Select>
              <FormErrorMessage>
                {errors.type && errors.type.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        {isCreditCardSelected ? (
          <Controller
            name="category"
            control={control}
            rules={{
              required: 'You must select an account category',
            }}
            render={({ field, formState: { errors } }) => (
              <FormControl mt="4" isInvalid={Boolean(errors.category)}>
                <FormLabel htmlFor="type">Category (Credit card)</FormLabel>
                <Select {...field}>
                  <option value="">Select category</option>
                  <option value={ACCOUNT_CATEGORIES.GOLD}>Gold</option>
                  <option value={ACCOUNT_CATEGORIES.PLATINUM}>Platinum</option>
                </Select>
                <FormErrorMessage>
                  {errors.category && errors.category.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        ) : (
          <Controller
            name="category"
            control={control}
            rules={{
              required: 'You must select an account category',
            }}
            render={({ field, formState: { errors } }) => (
              <FormControl mt="4" isInvalid={Boolean(errors.category)}>
                <FormLabel htmlFor="type">Category (Savings)</FormLabel>
                <Select {...field}>
                  <option value="">Select category</option>
                  <option value={ACCOUNT_CATEGORIES.REGULAR}>Regular</option>
                  <option value={ACCOUNT_CATEGORIES.PREMIUM}>Premium</option>
                </Select>
                <FormErrorMessage>
                  {errors.category && errors.category.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        )}

        <Button type="submit" mt="8" variant="primary" isLoading={isSubmitting}>
          Create account
        </Button>
      </form>
    </Box>
  );
}
