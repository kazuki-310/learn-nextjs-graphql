import { getUser } from '../_lib/fetchers';
import { UserDetail } from '../_components/user-detail';

export async function UserDetailContainer({ userId }: { userId: string }) {
  const user = await getUser(userId);

  return <UserDetail user={user} />;
}
