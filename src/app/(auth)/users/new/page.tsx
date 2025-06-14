import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserForm } from '../_components/user-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftFromLine } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

export default async function Page() {
  await getCurrentUser();

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Card className="gap-0 border-0 p-0 shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">新規ユーザー作成</CardTitle>
              <CardDescription>必要な情報を入力してユーザーを作成してください</CardDescription>
            </div>
            <Link href="/users">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeftFromLine className="h-4 w-4" />
                戻る
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <UserForm />
        </CardContent>
      </Card>
    </div>
  );
}
