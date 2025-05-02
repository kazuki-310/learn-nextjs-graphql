// import { getProducts } from '@/lib/graphql/product/queries/get-products';

export async function UserList() {
  // const product = await getProducts();

  return (
    <div className="p-6">
      <ul>
        {/* {product.products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
