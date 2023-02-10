import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getCsrfToken, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

import { LoginForm } from "../../../src/types";

import LoginInputForm from "../../../src/components/organisms/LoginForm";

import CommonConstants from "../../../src/constants/CommonConstants";
import Routes from "../../../src/constants/Routes";

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (status?.ok) {
      router.push(Routes.DASHBOARD);
    } else {
      toast({
        title: CommonConstants.ERROR_OCCURRED,
        description: CommonConstants.USERNAME_OR_PASSWORD_INVALID,
        status: "error",
      });
    }
  };

  return <LoginInputForm csrfToken={csrfToken} onLogin={onLogin} />;
}
