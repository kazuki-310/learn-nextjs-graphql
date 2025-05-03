import { getProducts } from '../projects/_server-actions/fetchers/get-products';
import { UserTable } from './user-table';

export async function UserList() {
  const products = await getProducts();

  return <UserTable products={products} />;
}
