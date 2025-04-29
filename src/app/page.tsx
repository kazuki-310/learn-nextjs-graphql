import { WithApolloProvider } from '@/providers/with-apollo-provider';
import { User } from './_components/user';

export default function Home() {
  return (
    <main>
      <WithApolloProvider>
        <User />
      </WithApolloProvider>
    </main>
  );
}
