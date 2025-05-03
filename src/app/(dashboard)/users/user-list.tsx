import { getProducts } from '@/lib/graphql/fetcher';
import { UserTable } from './user-table';

export async function UserList() {
  const products = await getProducts();

  if (!products) {
    return <div className="p-6">Loading...</div>;
  }

  return <UserTable products={products} />;
}
