import { Spinner } from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function ProjectEditSkeleton() {
  return (
    <Card className="gap-0 border-0 p-0 shadow-md">
      <CardHeader className="bg-muted/50 border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">プロジェクト編集</CardTitle>
            <CardDescription>読み込み中...</CardDescription>
          </div>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      </CardContent>
    </Card>
  );
}
