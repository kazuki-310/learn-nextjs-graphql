import { SelectItem } from '@/components/ui/select';
import { fetchLocations } from '../_lib/fetchers';

export async function LocationOptionContainer() {
  const locations = await fetchLocations();

  return (
    <>
      {locations.map((location) => (
        <SelectItem key={location.id} value={location.id}>
          {location.name}
        </SelectItem>
      ))}
    </>
  );
}
