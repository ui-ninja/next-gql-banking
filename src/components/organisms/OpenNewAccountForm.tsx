import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';

import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import { H1 } from '../atoms/typography';
import RadioCard from '../molecules/RadioCard';

import { ACCOUNT_CATEGORIES, ACCOUNT_TYPE, NewAccountForm } from '../../types';
import { GetUserQuery } from '../../generated/graphql';

type Props = {
  data: GetUserQuery;
  onCreateAccount: (data: NewAccountForm) => void;
};

export default function OpenNewAccountForm({ data, onCreateAccount }: Props) {
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

  const onFormSubmit = (data: NewAccountForm) => {
    return onCreateAccount(data);
  };

  return (
    <Box maxW={['100%', '100%', '50%']} marginX="auto">
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
              <Select {...field} data-testid="account_type_field">
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
                        description="Credit limit is Rs. 50,000 and annual charges are Rs. 1,000."
                        value={ACCOUNT_CATEGORIES.GOLD}
                      >
                        Gold
                      </RadioCard>
                      <RadioCard
                        value={ACCOUNT_CATEGORIES.PLATINUM}
                        description="Credit limit is Rs. 150,000 and annual charges are Rs. 2,500."
                      >
                        Platinum
                      </RadioCard>
                    </>
                  ) : (
                    <>
                      <RadioCard
                        description="comes with ZERO minimum balance"
                        value={ACCOUNT_CATEGORIES.REGULAR}
                      >
                        Regular
                      </RadioCard>
                      <RadioCard
                        description="You must maintain a minimum balance of Rs. 10,000."
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
