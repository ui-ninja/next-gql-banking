import { dehydrate, useMutation } from 'react-query';
import { getUserById, queryClient, addUser } from '../src/api';
import { H1 } from '../src/components/atoms/typography';

// export async function getServerSideProps() {
//   await queryClient.prefetchQuery('user', () =>
//     getUserById({ userId: '639d88a3e10ad82aa7c80699' })
//   );
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default function Home() {
  return <H1>Home</H1>;
}
