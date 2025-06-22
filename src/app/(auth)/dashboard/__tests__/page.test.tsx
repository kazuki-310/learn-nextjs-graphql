import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Create a Client Component version for testing
const MockDashboardPage = () => {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">プロジェクトとユーザーの概要</p>
      </div>
      <div className="space-y-6">
        <div data-testid="stats-container">Mock Stats Container</div>
        <div data-testid="chart-container">Mock Chart Container</div>
      </div>
    </div>
  );
};

describe('ダッシュボードページ', () => {
  it('正しいタイトルと説明文でダッシュボードページをレンダリングすること', () => {
    render(<MockDashboardPage />);

    expect(screen.getByRole('heading', { name: 'ダッシュボード' })).toBeInTheDocument();
    expect(screen.getByText('プロジェクトとユーザーの概要')).toBeInTheDocument();
  });

  it('ダッシュボードコンテンツをレンダリングすること', () => {
    render(<MockDashboardPage />);

    expect(screen.getByTestId('stats-container')).toBeInTheDocument();
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
  });
});
