'use client';

import { useRouter } from 'next/navigation';
import { useAppForm } from '@/hooks/use-app-form';
import { signupSchema } from '@/schemas/auth';
import { signupAction } from '../_server-actions/actions';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export function SignupForm() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await signupAction({
          name: value.name,
          email: value.email,
          password: value.password,
          confirmPassword: value.confirmPassword,
        });

        const result = await signIn('credentials', {
          email: value.email,
          password: value.password,
          redirect: false,
        });

        if (result?.error) {
          toast.success('アカウントが作成されました。ログインページに移動します');
          setTimeout(() => {
            router.push('/signin');
          }, 1500);
        } else {
          toast.success('アカウントが作成され、ログインしました');
          router.push('/');
        }
      } catch (error) {
        console.error('登録エラー:', error);
      }
    },
    validators: {
      onChange: signupSchema,
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
      <form.AppField name="name">
        {(field) => <field.TextField label="お名前" placeholder="山田太郎" />}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.TextField label="メールアドレス" type="email" placeholder="example@email.com" />
        )}
      </form.AppField>

      <form.AppField name="password">
        {(field) => (
          <field.TextField
            label="パスワード"
            type="password"
            placeholder="8文字以上（大文字、小文字、数字を含む）"
          />
        )}
      </form.AppField>

      <form.AppField name="confirmPassword">
        {(field) => (
          <field.TextField
            label="パスワード（確認）"
            type="password"
            placeholder="パスワードを再入力"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubscribeButton label="アカウント作成" className="w-full" />
      </form.AppForm>
    </form>
  );
}
