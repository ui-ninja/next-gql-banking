import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

import { queryClient } from '../src/api';
import { theme } from '../styles/theme/theme';
import Layout from '../src/components/template/Layout';
import ErrorBoundary from '../src/components/organisms/ErrorBoundary';
import ErrorFallbackView from '../src/components/molecules/ErrorFallbackView';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
