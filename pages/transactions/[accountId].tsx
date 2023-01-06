import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { H1 } from '../../src/components/atoms/typography';

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context', context.query);

  return {
    props: {
      data: '',
    },
  };
};

function Transactions({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <H1>Transactions</H1>;
}

export default Transactions;
