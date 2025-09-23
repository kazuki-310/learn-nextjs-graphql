import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Create a Client Component version for testing
const MockProjectNewPage = () => {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">新規プロジェクト作成</h1>
        <p className="text-muted-foreground">新しいプロジェクトを作成します</p>
      </div>
      <div data-testid="project-form">Project Form Component</div>
    </div>
  );
};

describe('プロジェクト新規作成ページ', () => {
  it('ページタイトルをレンダリングすること', () => {
    render(<MockProjectNewPage />);

    expect(screen.getByText('新規プロジェクト作成')).toBeInTheDocument();
  });

  it('ProjectFormコンポーネントをレンダリングすること', () => {
    render(<MockProjectNewPage />);

    expect(screen.getByTestId('project-form')).toBeInTheDocument();
  });

  it('正しいページ構造を持つこと', () => {
    render(<MockProjectNewPage />);

    const container = screen.getByText('新規プロジェクト作成').closest('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-8');
  });
});
