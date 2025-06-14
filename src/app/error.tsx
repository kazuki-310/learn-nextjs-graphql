'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">💥</div>
        <h1 className="text-3xl font-bold text-destructive">
          エラーが発生しました
        </h1>
        <p className="text-muted-foreground max-w-md">
          申し訳ございません。予期しないエラーが発生しました。<br />
          下のボタンからもう一度お試しください。
        </p>
        <button 
          type="button" 
          onClick={() => reset()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </div>
  );
}
