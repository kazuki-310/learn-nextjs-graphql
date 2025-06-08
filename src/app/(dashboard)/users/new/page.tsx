import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { UserForm } from '../_components/user-form';

export default function Page() {
  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">新規ユーザー作成</h1>
            <p className="text-muted-foreground">新しいユーザーをシステムに追加します</p>
          </div>
        </div>
      </div>

      <Card className="gap-0 border-0 p-0 shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <CardTitle className="text-xl">ユーザー情報</CardTitle>
          <CardDescription>
            必要な情報を入力してユーザーを作成してください
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <UserForm />
        </CardContent>
      </Card>
    </div>
  );
}
