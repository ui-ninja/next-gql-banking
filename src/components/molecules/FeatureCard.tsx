import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from '../atoms/Link';
import { H3 } from '../atoms/typography';

type Props = {
  heading: string;
  description: string;
  link: string;
  icon: any;
};

export default function FeatureCard({
  heading,
  description,
  link,
  icon,
}: Props) {
  return (
    <Flex>
      <Icon pr={3} fontSize="4xl" as={icon} color="brand.500" />
      <Box>
        <Link href={link}>
          <H3 margin={0}>{heading}</H3>
        </Link>
        <Text>{description}</Text>
      </Box>
    </Flex>
  );
}
