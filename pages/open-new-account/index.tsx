import { dehydrate, useMutation } from "react-query";
import { GetServerSidePropsContext } from "next";
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { Text, useToast } from "@chakra-ui/react";

import { addAccount, getUser, queryClient } from "../../src/api";
import { authOptions } from "../api/auth/[...nextauth]";

import OpenNewAccountForm from "../../src/components/organisms/OpenNewAccountForm";

import useUser from "../../src/hooks/useUser";

import { NewAccountForm } from "../../src/types";
import OpenNewAccountConstants from "../../src/constants/OpenNewAccount";
import Routes from "../../src/constants/Routes";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get user id from session
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const emailAddress = session?.user.email;

  if (emailAddress) {
    await queryClient.prefetchQuery("user", () => getUser({ emailAddress }));
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
  const { data, isLoading, isError } = useUser(emailAddress);

  const toast = useToast();
  const router = useRouter();

  const createAccount = useMutation(
    (result: NewAccountForm) =>
      addAccount({
        newAccountData: result,
      }),
    {
      onSuccess: async () => {
        toast({
          title: OpenNewAccountConstants.ACCOUNT_CREATED_SUCCESS_TOAST.TITLE,
          description:
            OpenNewAccountConstants.ACCOUNT_CREATED_SUCCESS_TOAST.DESCRIPTION,
          status: "success",
        });
        router.push(Routes.DASHBOARD);
      },
      onError() {
        toast({
          title: OpenNewAccountConstants.ACCOUNT_CREATED_ERROR_TOAST.TITLE,
          description:
            OpenNewAccountConstants.ACCOUNT_CREATED_ERROR_TOAST.DESCRIPTION,
          status: "error",
        });
      },
    }
  );

  const handleAccountCreation = (res: NewAccountForm) => {
    return createAccount.mutate(res);
  };

  if (isError) {
    return <Text>{OpenNewAccountConstants.ERROR_LOADING_DATA}</Text>;
  }

  if (isLoading) {
    return <Text>{OpenNewAccountConstants.LOADING_DATA}</Text>;
  }

  if (data) {
    return (
      <OpenNewAccountForm data={data} onCreateAccount={handleAccountCreation} />
    );
  }

  return null;
}
