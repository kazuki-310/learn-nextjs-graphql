import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SigninForm } from './_components/signin-form';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <CardDescription>メールアドレスとパスワードでログインしてください</CardDescription>
        </CardHeader>

        <CardContent>
          <SigninForm />

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">アカウントをお持ちでない方は </span>
            <Link href="/signup" className="text-primary hover:underline">
              こちらから登録
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
