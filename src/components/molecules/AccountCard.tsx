import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

import { H3 } from "../atoms/typography";

import { Account } from "../../generated/graphql";

import Illustration from "../../images/Business.svg";
import Routes from "../../constants/Routes";
import { ACCOUNT_TYPE } from "../../types";
import CommonConstants from "../../constants/CommonConstants";

export default function AccountCard({
  id,
  type,
  category,
  userName,
}: Omit<Account, "accountNumber" | "card" | "user"> & { userName: string }) {
  return (
    <Link href={`${Routes.TRANSACTIONS}/${id}`}>
      <Flex
        borderRadius={16}
        boxShadow="md"
        maxW="400px"
        border="1px solid"
        borderColor="gray.100"
        _hover={{
          transform: "translateY(-4px)",
          transition: "all ease 0.3s",
        }}
      >
        <Box
          as={Flex}
          aria-hidden
          w="30%"
          bgGradient={
            // due to unknown issue in chakra ui
            // jest fails to parse linear gradient values
            // because of this test cases fails. Hence had to wrap this in env condition.
            process.env.NODE_ENV === "test"
              ? ""
              : "linear-gradient(135deg, #F395BA 0%, #FED182 100%)"
          }
          justifyContent="center"
          borderRadius="16px 0 0 16px"
        >
          <Image
            width={70}
            height={70}
            src={Illustration}
            alt="icon for account"
          />
        </Box>
        <Box flexGrow={1} p={5}>
          <Flex justifyContent="space-between" mb={5} color="gray.500">
            <Text
              color="blackAlpha.700"
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
            >
              {type === ACCOUNT_TYPE.CREDIT_CARD
                ? CommonConstants.CREDIT_CARD
                : CommonConstants.SAVINGS}
            </Text>
            <Text color="blackAlpha.700" fontSize="sm">
              {category}
            </Text>
          </Flex>
          <Box>
            <H3 textTransform="capitalize">{userName}</H3>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}
