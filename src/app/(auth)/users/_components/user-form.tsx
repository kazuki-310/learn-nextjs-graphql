'use client';

import { useRouter } from 'next/navigation';
import { useAppForm } from '@/hooks/use-app-form';
import { Role, User } from '@/lib/graphql/__generated__';
import { createUser } from '../new/_server-actions/actions';
import { updateUser } from '../[id]/_server-actions/actions';
import {
  createUserSchema,
  updateUserSchema,
  CreateUserFormData,
  UpdateUserFormData,
} from '@/schemas/user';
import { toast } from 'sonner';

const USER_ROLE_OPTIONS = [
  { value: Role.Admin, label: '管理者' },
  { value: Role.Editor, label: '編集者' },
  { value: Role.Viewer, label: '閲覧者' },
];

export function UserForm({ user }: { user?: User }) {
  const router = useRouter();
  const isEditMode = !!user;

  const form = useAppForm({
    defaultValues: isEditMode
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : {
          name: '',
          email: '',
          password: '',
          role: Role.Admin,
        },
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          const updateData: UpdateUserFormData = {
            name: value.name,
            email: value.email,
            role: value.role,
          };
          await updateUser(user.id, updateData);
          toast.success(`「${value.name}」を更新しました`);
        } else {
          const createData = value as CreateUserFormData;
          await createUser(createData);
          toast.success(`「${value.name}」を作成しました`);
        }
        router.push('/users');
      } catch (error) {
        console.error('Error creating/updating user:', error);
        toast.error(isEditMode ? '更新に失敗しました' : '作成に失敗しました');
      }
    },
    validators: {
      onChange: isEditMode ? updateUserSchema : createUserSchema,
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
          {(field) => <field.TextField placeholder="ユーザー名を入力" label="ユーザー名" />}
        </form.AppField>

        <form.AppField name="email">
          {(field) => (
            <field.TextField
              placeholder="メールアドレスを入力"
              label="メールアドレス"
              type="email"
            />
          )}
        </form.AppField>

        {!isEditMode && (
          <form.AppField name="password">
            {(field) => (
              <field.TextField placeholder="パスワードを入力" label="パスワード" type="password" />
            )}
          </form.AppField>
        )}

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

      <div className="flex justify-end border-t pt-6">
        <form.AppForm>
          <form.SubscribeButton label={isEditMode ? '更新する' : '作成する'} className="min-w-32" />
        </form.AppForm>
      </div>
    </form>
  );
}
