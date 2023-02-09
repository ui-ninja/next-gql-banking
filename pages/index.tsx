import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';

import Button from '../src/components/atoms/Button';
import { H1, H3 } from '../src/components/atoms/typography';
import FeatureCard from '../src/components/molecules/FeatureCard';

import Routes from '../src/constants/Routes';
import CommonConstants from '../src/constants/CommonConstants';
import HomeConstants from '../src/constants/HomeConstants';

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

      <Box>
        <H1 textAlign="center">{HomeConstants.featureCards.heading}</H1>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {HomeConstants.featureCards.features.map((card) => (
            <GridItem key={card.heading}>
              <FeatureCard
                heading={card.heading}
                description={card.description}
                link={card.link}
                icon={card.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
