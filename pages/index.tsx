import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '../src/components/atoms/Button';
import { H1, H3 } from '../src/components/atoms/typography';
import FeatureCard from '../src/components/molecules/FeatureCard';

import HomeConstants from '../src/constants/HomeConstants';
import Routes from '../src/constants/routes';

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
          <H1>Shop smart and safely with a NextGen choice account</H1>
          <H3>
            Open a NextGen account and get a Digi Card, with dynamic CVC that
            refreshes every 24 hours.
          </H3>
          <Flex
            flexWrap={['wrap', 'wrap', 'nowrap']}
            justifyContent={['center', 'center', 'initial']}
          >
            {session ? (
              <>
                <Button
                  onClick={() => router.push(Routes.DASHBOARD)}
                  mr="5"
                  variant="primary"
                  px={14}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={() => router.push(Routes.TRANSACTIONS)}
                  variant="secondary"
                  px={14}
                  mt={[5, 5, 0]}
                >
                  View all transactions
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push(Routes.LOGIN)}
                  mr="5"
                  variant="primary"
                  px={14}
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push(Routes.REGISTER)}
                  variant="secondary"
                  px={14}
                >
                  Sign up
                </Button>
              </>
            )}
          </Flex>
        </Box>
      </Flex>

      <Box>
        <H1 textAlign="center">Much more with us!</H1>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {HomeConstants.featureCards.map((card) => (
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
