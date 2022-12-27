import { Container } from '@chakra-ui/react';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import Main from '../organisms/Main';

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
