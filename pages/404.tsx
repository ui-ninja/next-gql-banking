import { Box } from "@chakra-ui/react";
import Link from "next/link";

import { H1 } from "../src/components/atoms/typography";
import CustomLink from "../src/components/atoms/Link";

import CommonConstants from "../src/constants/CommonConstants";

export default function Generic404ErrorPage() {
  return (
    <Box>
      <H1>{CommonConstants.FOUR_OH_FOUR_TITLE}</H1>
      <CustomLink as={Link} href="/">
        {CommonConstants.FOUR_OH_FOUR_TAKE_HOME_BUTTON_TEXT}
      </CustomLink>
    </Box>
  );
}
