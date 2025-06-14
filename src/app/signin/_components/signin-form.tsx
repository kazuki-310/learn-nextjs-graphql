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
import { signinSchema, SigninFormData } from '@/schemas/auth';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export function SigninForm() {
  const router = useRouter();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: SigninFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
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
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <Input type="password" placeholder="パスワードを入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          ログイン
        </Button>
      </form>
    </Form>
  );
}
