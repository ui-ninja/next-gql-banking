import '../styles/nprogress.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';

import { queryClient } from '../src/api';
import { theme } from '../styles/theme/theme';
import Layout from '../src/components/template/Layout';
import ErrorBoundary from '../src/components/organisms/ErrorBoundary';
import ErrorFallbackView from '../src/components/molecules/ErrorFallbackView';
import { useEffect } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();

    const handleRouteChangeDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeDone);
    router.events.on('routeChangeError', handleRouteChangeDone);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeDone);
      router.events.off('routeChangeError', handleRouteChangeDone);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <Layout>
              <ErrorBoundary FallbackComponent={ErrorFallbackView}>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Layout>
          </ChakraProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
