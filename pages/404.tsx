import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import CustomLink from '../src/components/atoms/Link';
import { H1 } from '../src/components/atoms/typography';

export default function Generic404ErrorPage() {
  return (
    <Box>
      <H1>404 - Page not found</H1>
      <CustomLink as={Link} href="/">
        Take me to homepage
      </CustomLink>
    </Box>
  );
}
