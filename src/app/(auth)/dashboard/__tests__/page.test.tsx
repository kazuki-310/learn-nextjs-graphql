import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '../page';

jest.mock('../_components/dashboard-content', () => ({
  DashboardContent: () => <div data-testid="dashboard-content">Mock Dashboard Content</div>,
}));

describe('ダッシュボードページ', () => {
  it('正しいタイトルと説明文でダッシュボードページをレンダリングすること', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('heading', { name: 'ダッシュボード' })).toBeInTheDocument();
    expect(screen.getByText('プロジェクトとユーザーの概要')).toBeInTheDocument();
  });

  it('ダッシュボードコンテンツをレンダリングすること', () => {
    render(<DashboardPage />);

    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
  });
});
