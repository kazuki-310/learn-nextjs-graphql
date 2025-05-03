import { getProducts } from '@/lib/graphql/fetcher';
import { ProjectTable } from './project-table';

export async function ProjectList() {
  const products = await getProducts();

  if (!products) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <ProjectTable products={products} />
    </div>
  );
}
