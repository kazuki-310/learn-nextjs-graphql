import { getProducts } from '@/lib/graphql/fetcher';
import { UserTable } from './user-table';

export async function UserList() {
  const products = await getProducts();

  // return <UserTable products={products} />;
  return <div>tet</div>;
}
