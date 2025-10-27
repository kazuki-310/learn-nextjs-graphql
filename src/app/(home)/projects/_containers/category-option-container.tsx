import { fetchCategories } from '../_lib/fetchers';

export async function CategoryOptionContainer() {
  const categories = await fetchCategories();

  return (
    <>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </>
  );
}
