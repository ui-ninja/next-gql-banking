import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { dehydrate, useMutation, useQuery } from 'react-query';
import { addAccount, getUser, queryClient } from '../../src/api';
import Button from '../../src/components/atoms/Button';
import Input from '../../src/components/atoms/Input';
import Radio from '../../src/components/atoms/Radio';
import Select from '../../src/components/atoms/Select';
import { H1 } from '../../src/components/atoms/typography';
import RadioCard from '../../src/components/molecules/RadioCard';
import Routes from '../../src/constants/routes';
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

  const toast = useToast();
  const router = useRouter();

  const {
    register,
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

  const createAccount = useMutation(
    (data: NewAccountForm) =>
      addAccount({
        newAccountData: data,
      }),
    {
      onSuccess: async (res) => {
        console.log('res>>>>', res);
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
        console.error(error);
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

  const onFormSubmit = (data: NewAccountForm) => {
    return createAccount.mutate(data);
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

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
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

        <Controller
          name="category"
          control={control}
          rules={{
            required: 'You must select an account category',
            validate: (value) => {
              const userIncome = data?.user.income;
              if (userIncome && value === ACCOUNT_CATEGORIES.GOLD) {
                return userIncome > 200000 && userIncome <= 500000;
              }

              if (userIncome && value === ACCOUNT_CATEGORIES.PLATINUM) {
                return userIncome > 500000;
              }
            },
          }}
          render={({ field, formState: { errors } }) => (
            <FormControl mt="4" isInvalid={Boolean(errors.category)}>
              <FormLabel htmlFor="type">
                Category &lt;{isCreditCardSelected ? 'Credit card' : 'Savings'}
                &gt;
              </FormLabel>
              <RadioGroup {...field}>
                <Stack spacing={5} direction="column">
                  {isCreditCardSelected ? (
                    <>
                      <RadioCard
                        helpText="Credit limit is Rs. 50,000 and annual charges are Rs. 1,000."
                        value={ACCOUNT_CATEGORIES.GOLD}
                      >
                        Gold
                      </RadioCard>
                      <RadioCard
                        value={ACCOUNT_CATEGORIES.PLATINUM}
                        helpText="Credit limit is Rs. 150,000 and annual charges are Rs. 2,500."
                      >
                        Platinum
                      </RadioCard>
                    </>
                  ) : (
                    <>
                      <RadioCard
                        helpText="comes with ZERO minimum balance"
                        value={ACCOUNT_CATEGORIES.REGULAR}
                      >
                        Regular
                      </RadioCard>
                      <RadioCard
                        helpText="You must maintain a minimum balance of Rs. 10,000."
                        value={ACCOUNT_CATEGORIES.PREMIUM}
                      >
                        Premium
                      </RadioCard>
                    </>
                  )}
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.category &&
                  errors.category.type === 'required' &&
                  errors.category.message}
                {data?.user.income &&
                  errors.category &&
                  errors.category.type === 'validate' && (
                    <Text>
                      Based on your income declared i.e. {data?.user.income},
                      you can select{' '}
                      {data?.user.income > 500000 ? 'PLATINUM' : 'GOLD'} credit
                      card only.
                    </Text>
                  )}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <input type="hidden" {...register('userId')} value={data?.user.id} />

        <Button type="submit" mt="8" variant="primary" isLoading={isSubmitting}>
          Create account
        </Button>
      </form>
    </Box>
  );
}
