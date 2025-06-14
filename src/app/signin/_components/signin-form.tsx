'use client';

import { useRouter } from 'next/navigation';
import { useAppForm } from '@/hooks/use-app-form';
import { signinSchema } from '@/schemas/auth';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export function SigninForm() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await signIn('credentials', {
          email: value.email,
          password: value.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error('メールアドレスまたはパスワードが正しくありません');
        } else {
          toast.success('ログインしました');
          router.push('/dashboard');
        }
      } catch (error) {
        toast.error('ログインエラーが発生しました');
        console.error('ログインエラー:', error);
      }
    },
    validators: {
      onChange: signinSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.AppField name="email">
        {(field) => (
          <field.TextField label="メールアドレス" type="email" placeholder="example@email.com" />
        )}
      </form.AppField>

      <form.AppField name="password">
        {(field) => (
          <field.TextField label="パスワード" type="password" placeholder="パスワードを入力" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubscribeButton label="ログイン" className="w-full" />
      </form.AppForm>
    </form>
  );
}
