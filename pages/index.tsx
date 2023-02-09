import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Box, Flex, Grid, Show } from '@chakra-ui/react';

import Button from '../src/components/atoms/Button';
import { H1, H3 } from '../src/components/atoms/typography';

import CommonConstants from '../src/constants/CommonConstants';
import HomeConstants from '../src/constants/HomeConstants';
import Routes from '../src/constants/Routes';

const DynamicFeaturesList = dynamic(
  () => import('../src/components/organisms/FeaturesList'),
  {
    loading: () => <H3>{'Loading...'}</H3>,
  }
);

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Box>
      <Flex mb={10}>
        <Show above="lg">
          <Image
            src={'/hero.jpg'}
            alt="Illustration of bank"
            width="640"
            height="425"
          />
        </Show>
        <Box>
          <H1>{HomeConstants.heroBanner.heading}</H1>
          <H3>{HomeConstants.heroBanner.subHeading}</H3>
          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
            {session ? (
              <>
                <Button
                  onClick={() => router.push(Routes.DASHBOARD)}
                  variant="primary"
                  px={14}
                >
                  {CommonConstants.DASHBOARD}
                </Button>
                <Button
                  onClick={() => router.push(Routes.OPEN_NEW_ACCOUNT)}
                  variant="secondary"
                  px={14}
                >
                  {CommonConstants.OPEN_NEW_ACCOUNT}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push(Routes.LOGIN)}
                  variant="primary"
                  px={14}
                >
                  {CommonConstants.LOGIN}
                </Button>
                <Button
                  onClick={() => router.push(Routes.REGISTER)}
                  variant="secondary"
                  px={14}
                >
                  {CommonConstants.SIGNUP}
                </Button>
              </>
            )}
          </Grid>
        </Box>
      </Flex>

      <DynamicFeaturesList />
    </Box>
  );
}
