'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Button, Input, VStack, NativeSelectRoot, NativeSelectField, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Role, User } from '@/lib/graphql/__generated__';
import { createUserSchema, CreateUserFormData } from '../new/_lib/schemas';
import { updateUserSchema, UpdateUserFormData } from '../[id]/_lib/schemas';
import { toast } from 'sonner';
import { updateUser } from '../[id]/_lib/actions';
import { createUser } from '../new/_lib/actions';

const USER_ROLE_OPTIONS = [
  { value: Role.Admin, label: '管理者' },
  { value: Role.Editor, label: '編集者' },
  { value: Role.Viewer, label: '閲覧者' },
];

export function UserForm({ user }: { user?: User }) {
  const router = useRouter();
  const isEditMode = !!user;

  const form = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
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
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
    try {
      if (isEditMode) {
        const updateData = data as UpdateUserFormData;
        await updateUser(user.id, updateData);
        toast.success(`「${updateData.name}」を更新しました`);
      } else {
        const createData = data as CreateUserFormData;
        await createUser(createData);
        toast.success(`「${createData.name}」を作成しました`);
      }

      router.push('/users');
    } catch (error) {
      console.error('Error creating/updating user:', error);
      toast.error(isEditMode ? '更新に失敗しました' : '作成に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={8} align="stretch">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>ユーザー名</Field.Label>
              <Input placeholder="ユーザー名を入力" {...field} />
              {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>メールアドレス</Field.Label>
              <Input type="email" placeholder="メールアドレスを入力" {...field} />
              {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />

        {!isEditMode && (
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field.Root invalid={!!fieldState.error}>
                <Field.Label>パスワード</Field.Label>
                <Input type="password" placeholder="パスワードを入力" {...field} />
                {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
              </Field.Root>
            )}
          />
        )}

        <Controller
          control={control}
          name="role"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>ロール</Field.Label>
              <NativeSelectRoot>
                <NativeSelectField {...field}>
                  {USER_ROLE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
              {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />

        <Button type="submit" disabled={!isValid || isSubmitting} colorPalette="blue">
          {isSubmitting && <Spinner size="sm" mr={2} />}
          {isEditMode ? '更新' : '作成'}
        </Button>
      </VStack>
    </form>
  );
}
