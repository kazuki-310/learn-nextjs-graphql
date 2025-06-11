import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SignupForm } from './_components/signup-form';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">アカウント作成</CardTitle>
          <CardDescription>新しいアカウントを作成してください</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">既にアカウントをお持ちの方は </span>
            <Link prefetch href="/signin" className="text-primary hover:underline">
              こちらからログイン
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
