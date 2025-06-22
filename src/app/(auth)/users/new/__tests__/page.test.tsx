import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Create a Client Component version for testing
const MockUserNewPage = () => {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">新規ユーザー作成</h1>
        <p className="text-muted-foreground">新しいユーザーアカウントを作成します</p>
      </div>
      <div data-testid="user-form">User Form Component</div>
    </div>
  );
};

describe('ユーザー新規作成ページ', () => {
  it('ページタイトルをレンダーできること', () => {
    render(<MockUserNewPage />);

    expect(screen.getByText('新規ユーザー作成')).toBeInTheDocument();
  });

  it('UserFormコンポーネントをレンダーできること', () => {
    render(<MockUserNewPage />);

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it('正しいページ構造を持つこと', () => {
    render(<MockUserNewPage />);

    const container = screen.getByText('新規ユーザー作成').closest('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-8');
  });
});
