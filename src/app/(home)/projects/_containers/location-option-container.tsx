import { fetchLocations } from '../_lib/fetchers';

export async function LocationOptionContainer() {
  const locations = await fetchLocations();

  return (
    <>
      {locations.map((location) => (
        <option key={location.id} value={location.id}>
          {location.name}
        </option>
      ))}
    </>
  );
}
