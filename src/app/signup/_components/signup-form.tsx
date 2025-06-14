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
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signupSchema, SignupFormData } from '@/schemas/auth';
import { signupAction } from '../_lib/actions';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export function SignupForm() {
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signupAction({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      toast.success('アカウントが作成され、ログインしました');
      router.push('/dashboard');
    } catch (error) {
      console.error('登録エラー:', error);
      toast.error(error instanceof Error ? error.message : '登録に失敗しました');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田太郎" {...field} />
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
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="8文字以上（大文字、小文字、数字を含む）"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード（確認）</FormLabel>
              <FormControl>
                <Input type="password" placeholder="パスワードを再入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          アカウント作成
        </Button>
      </form>
    </Form>
  );
}
