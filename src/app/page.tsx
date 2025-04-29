import { WithApollo } from '@/providers/with-apollo';
import { User } from './_components/user';

export default function Home() {
  return (
    <main>
      <WithApollo>
        <User />
      </WithApollo>
    </main>
  );
}
