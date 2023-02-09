import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';

import { addUser } from '../../../src/api';

import CommonConstants from '../../../src/constants/CommonConstants';

import { AddNewUserMutation } from '../../../src/types';
import { isExistingEmailUsed } from '../../../src/utils';
import RegisterInputForm from '../../../src/components/organisms/RegisterForm';
import Routes from '../../../src/constants/Routes';

export default function Register() {
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

  const onFormSubmit = (data: AddNewUserMutation) => {
    return createUser.mutate(data);
  };

  return <RegisterInputForm onSignup={onFormSubmit} />;
}
