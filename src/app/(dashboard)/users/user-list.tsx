import { getProducts } from '../projects/_server-actions/fetcher';
import { UserTable } from './user-table';

export async function UserList() {
  const products = await getProducts();

  return <UserTable products={products} />;
}
