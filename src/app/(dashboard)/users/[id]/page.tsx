import { UserForm } from '../_components/user-form';
import { getUser } from './_server-actions/fetchers';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return <div>ユーザーは存在しません</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ユーザー編集</h1>
        <p className="text-muted-foreground">ユーザー情報を編集します。</p>
      </div>

      <UserForm user={user} />
    </div>
  );
}
