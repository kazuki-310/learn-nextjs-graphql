import { getProducts } from '@/lib/graphql/product/queries/get-products';
import { ProjectTable } from './project-table';

export async function ProjectList() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <ProjectTable products={products} />
    </div>
  );
}
