import { useSession } from 'next-auth/react';
import { H1 } from '../../src/components/atoms/typography';

export default function Dashboard() {
  const { data: session } = useSession();

  return <H1>Welcome {session?.user?.name}, to next gen banking!</H1>;
}
