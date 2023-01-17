import { Box, Text } from '@chakra-ui/react';

import { H3 } from '../atoms/typography';

const IS_DEV_ENV = process.env.NODE_ENV === 'development';

function ErrorFallbackView({ error }: { error: any }) {
  return (
    <Box role="alert">
      <H3>Oops, there is an error!</H3>
      {IS_DEV_ENV && <Text>{String(error)}</Text>}
    </Box>
  );
}

export default ErrorFallbackView;
