import { getProducts } from './_server-actions/fetchers/get-products';
import { ProjectTable } from './project-table';

export async function ProjectList() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <ProjectTable products={products} />
    </div>
  );
}
