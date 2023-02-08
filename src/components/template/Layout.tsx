import Head from 'next/head';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import Main from '../organisms/Main';

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>Welcome to Next Gen banking!</title>
        <meta
          name="description"
          content="Welcome to next generation banking powered by React and GraphQL."
        ></meta>
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
