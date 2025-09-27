import { SelectItem } from '@/components/ui/select';
import { fetchCategories } from '../_lib/fetchers';

export async function CategoryOptionContainer() {
  const categories = await fetchCategories();

  return (
    <>
      {categories.map((category) => (
        <SelectItem key={category.id} value={category.id}>
          {category.name}
        </SelectItem>
      ))}
    </>
  );
}
