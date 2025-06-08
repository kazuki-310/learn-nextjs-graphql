'use client';

import { useRouter } from 'next/navigation';
import { useAppForm } from '@/hooks/use-app-form';
import { Role, User } from '@/lib/graphql/__generated__';
import { createUser } from '../new/_server-actions/actions';
import { updateUser } from '../[id]/_server-actions/actions';
import { createUserSchema } from '@/schemas/user';

const USER_ROLE_OPTIONS = [
  { value: Role.Admin, label: '管理者' },
  { value: Role.Editor, label: '編集者' },
  { value: Role.Viewer, label: '閲覧者' },
];

export function UserForm({ user }: { user?: User }) {
  const router = useRouter();
  const isEditMode = !!user;

  const form = useAppForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      role: user?.role ?? Role.Admin,
    },
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          await updateUser(user.id, value);
        } else {
          await createUser(value);
        }
        router.push('/users');
      } catch (error) {
        console.error('Error creating/updating user:', error);
      }
    },
    validators: {
      onChange: createUserSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-1">
        <form.AppField name="name">
          {(field) => <field.TextField label="ユーザー名" placeholder="山田太郎" />}
        </form.AppField>

        <form.AppField name="email">
          {(field) => <field.TextField label="メールアドレス" placeholder="user@example.com" type="email" />}
        </form.AppField>

        <form.AppField name="role">
          {(field) => (
            <field.SelectField
              label="ロール"
              selectOptions={USER_ROLE_OPTIONS}
              defaultValue={field.state.value}
            />
          )}
        </form.AppField>
      </div>

      <div className="flex justify-end pt-6 border-t">
        <form.AppForm>
          <form.SubscribeButton 
            label={isEditMode ? '更新する' : '作成する'} 
            className="min-w-32"
          />
        </form.AppForm>
      </div>
    </form>
  );
}
