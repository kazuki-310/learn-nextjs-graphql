'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Role, User } from '@/lib/graphql/__generated__';
import {
  createUserSchema,
  updateUserSchema,
  CreateUserFormData,
  UpdateUserFormData,
} from '@/schemas/user';
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名を入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input type="email" placeholder="メールアドレスを入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEditMode && (
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="パスワードを入力" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ロール</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="ロールを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ROLE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditMode ? '更新' : '作成'}
        </Button>
      </form>
    </Form>
  );
}
