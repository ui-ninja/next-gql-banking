import { Box, Text } from "@chakra-ui/react";

import { H3 } from "../atoms/typography";

import CommonConstants from "../../constants/CommonConstants";

const IS_DEV_ENV = process.env.NODE_ENV === "development";

function ErrorFallbackView({ error }: { error: unknown }) {
  return (
    <Box role="alert">
      <H3>{CommonConstants.ERROR_FALLBACK_VIEW_TITLE}</H3>
      {IS_DEV_ENV && <Text>{String(error)}</Text>}
    </Box>
  );
}

export default ErrorFallbackView;
