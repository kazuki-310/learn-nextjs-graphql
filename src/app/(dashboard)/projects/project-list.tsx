import { getProducts } from '@/lib/graphql/product/queries/get-products';

export async function ProjectList() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <ul className="space-y-3">
        {products.map((product) => (
          <li key={product.id}>
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
